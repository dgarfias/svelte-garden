<!--
  Svelte Garden - ThemeProvider Component
  
  Provides theme context and CSS custom properties for the component library.
  
  @example
  <ThemeProvider>
    <App />
  </ThemeProvider>
  
  @example
  <ThemeProvider colorScheme="dark">
    <App />
  </ThemeProvider>
-->
<script lang="ts">
  import { setThemeContext } from './context';
  import { DEFAULT_THEME } from './theme';
  import { getColor } from './getColor';
  import type { GardenTheme, ColorScheme } from './types';
  import type { Snippet } from 'svelte';

  interface Props {
    /** The theme configuration */
    theme?: GardenTheme;
    /** The color scheme ('light' or 'dark') */
    colorScheme?: ColorScheme;
    /** Whether to render in right-to-left mode */
    rtl?: boolean;
    /** Whether to apply CSS reset styles */
    includeReset?: boolean;
    /** Child content */
    children: Snippet;
  }

  let {
    theme: inputTheme,
    colorScheme: inputColorScheme = 'light',
    rtl: inputRtl = false,
    includeReset = true,
    children
  }: Props = $props();

  // Use derived to track color scheme reactively
  const currentColorScheme = $derived<ColorScheme>(inputColorScheme);

  // Track RTL mode
  const isRtl = $derived<boolean>(inputRtl);

  // Merge theme with color scheme and RTL
  const theme = $derived<GardenTheme>({
    ...(inputTheme ?? DEFAULT_THEME),
    colors: {
      ...(inputTheme ?? DEFAULT_THEME).colors,
      base: currentColorScheme
    },
    rtl: isRtl
  });

  // Set theme context - note: setColorScheme is a no-op when colorScheme is controlled via props
  // For dynamic color scheme switching, manage the colorScheme prop externally
  $effect(() => {
    setThemeContext({
      theme,
      colorScheme: currentColorScheme,
      setColorScheme: () => {
        // Color scheme is controlled via props - update the prop externally to change it
        console.warn('ThemeProvider: setColorScheme is a no-op when colorScheme is controlled via props');
      }
    });
  });

  // Generate CSS custom properties for inline style
  function generateCSSVariables(theme: GardenTheme): string {
    const vars: string[] = [];
    const scheme = theme.colors.base;
    const schemeVars = theme.colors.variables[scheme];

    // Helper to add a CSS variable
    const addVar = (name: string, value: string) => {
      vars.push(`${name}: ${value}`);
    };

    // Add palette colors
    for (const [hueName, hueValue] of Object.entries(theme.palette)) {
      if (typeof hueValue === 'string') {
        addVar(`--garden-palette-${hueName}`, hueValue);
      } else if (typeof hueValue === 'object' && hueValue !== null) {
        for (const [shade, color] of Object.entries(hueValue)) {
          addVar(`--garden-palette-${hueName}-${shade}`, color as string);
        }
      }
    }

    // Background variables
    for (const key of Object.keys(schemeVars.background)) {
      const varName = `--garden-color-background-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      try {
        addVar(varName, getColor({ theme, variable: `background.${key}` }));
      } catch {
        // Skip unresolvable
      }
    }

    // Add hover/active state variables for emphasis and primaryEmphasis
    // These use offset values that differ between light and dark modes
    const isDark = scheme === 'dark';
    
    // background.emphasis hover/active (for toggle unchecked state)
    try {
      const emphasisHue = theme.colors.neutralHue;
      const emphasisPalette = theme.palette[emphasisHue] as Record<string, string>;
      if (isDark) {
        // Dark mode: -100 for hover, -200 for active (lighter colors)
        addVar('--garden-color-background-emphasis-hover', emphasisPalette['500'] || '#87929d');
        addVar('--garden-color-background-emphasis-active', emphasisPalette['400'] || '#c2c8cc');
      } else {
        // Light mode: +100 for hover, +200 for active (darker colors)
        addVar('--garden-color-background-emphasis-hover', emphasisPalette['800'] || '#49545c');
        addVar('--garden-color-background-emphasis-active', emphasisPalette['900'] || '#2f3941');
      }
    } catch {
      // Fallback
      addVar('--garden-color-background-emphasis-hover', isDark ? '#87929d' : '#49545c');
      addVar('--garden-color-background-emphasis-active', isDark ? '#c2c8cc' : '#2f3941');
    }

    // background.primaryEmphasis hover/active (for toggle checked state, buttons, etc.)
    try {
      const primaryHue = theme.colors.primaryHue;
      const primaryPalette = theme.palette[primaryHue] as Record<string, string>;
      if (isDark) {
        // Dark mode: -100 for hover, -200 for active (lighter colors)
        addVar('--garden-color-background-primary-emphasis-hover', primaryPalette['500'] || '#5eade0');
        addVar('--garden-color-background-primary-emphasis-active', primaryPalette['400'] || '#83c5ea');
      } else {
        // Light mode: +100 for hover, +200 for active (darker colors)
        addVar('--garden-color-background-primary-emphasis-hover', primaryPalette['800'] || '#144a75');
        addVar('--garden-color-background-primary-emphasis-active', primaryPalette['900'] || '#0f3554');
      }
    } catch {
      // Fallback
      addVar('--garden-color-background-primary-emphasis-hover', isDark ? '#5eade0' : '#144a75');
      addVar('--garden-color-background-primary-emphasis-active', isDark ? '#83c5ea' : '#0f3554');
    }

    // background.dangerEmphasis hover/active (for danger buttons)
    try {
      const dangerHue = theme.colors.dangerHue;
      const dangerPalette = theme.palette[dangerHue] as Record<string, string>;
      if (isDark) {
        // Dark mode: -100 for hover, -200 for active (lighter colors)
        addVar('--garden-color-background-danger-emphasis-hover', dangerPalette['500'] || '#e35b5d');
        addVar('--garden-color-background-danger-emphasis-active', dangerPalette['400'] || '#f5b5ba');
      } else {
        // Light mode: +100 for hover, +200 for active (darker colors)
        addVar('--garden-color-background-danger-emphasis-hover', dangerPalette['800'] || '#8c232c');
        addVar('--garden-color-background-danger-emphasis-active', dangerPalette['900'] || '#681219');
      }
    } catch {
      // Fallback
      addVar('--garden-color-background-danger-emphasis-hover', isDark ? '#e35b5d' : '#8c232c');
      addVar('--garden-color-background-danger-emphasis-active', isDark ? '#f5b5ba' : '#681219');
    }

    // Foreground hover/active colors for default/non-primary buttons
    try {
      const primaryHue = theme.colors.primaryHue;
      const primaryPalette = theme.palette[primaryHue] as Record<string, string>;
      if (isDark) {
        // Dark mode: lighter colors for hover/active
        addVar('--garden-color-foreground-primary-hover', primaryPalette['500'] || '#5eade0');
        addVar('--garden-color-foreground-primary-active', primaryPalette['400'] || '#83c5ea');
      } else {
        // Light mode: darker colors for hover/active
        addVar('--garden-color-foreground-primary-hover', primaryPalette['700'] || '#1f73b7');
        addVar('--garden-color-foreground-primary-active', primaryPalette['800'] || '#144a75');
      }
    } catch {
      addVar('--garden-color-foreground-primary-hover', isDark ? '#5eade0' : '#1f73b7');
      addVar('--garden-color-foreground-primary-active', isDark ? '#83c5ea' : '#144a75');
    }

    // Danger foreground hover/active colors
    try {
      const dangerHue = theme.colors.dangerHue;
      const dangerPalette = theme.palette[dangerHue] as Record<string, string>;
      if (isDark) {
        // Dark mode: lighter colors for hover/active
        addVar('--garden-color-foreground-danger-hover', dangerPalette['500'] || '#e35b5d');
        addVar('--garden-color-foreground-danger-active', dangerPalette['400'] || '#f5b5ba');
      } else {
        // Light mode: darker colors for hover/active
        addVar('--garden-color-foreground-danger-hover', dangerPalette['700'] || '#cc3340');
        addVar('--garden-color-foreground-danger-active', dangerPalette['800'] || '#8c232c');
      }
    } catch {
      addVar('--garden-color-foreground-danger-hover', isDark ? '#e35b5d' : '#cc3340');
      addVar('--garden-color-foreground-danger-active', isDark ? '#f5b5ba' : '#8c232c');
    }

    // Border hover colors
    try {
      const primaryHue = theme.colors.primaryHue;
      const primaryPalette = theme.palette[primaryHue] as Record<string, string>;
      if (isDark) {
        addVar('--garden-color-border-primary-hover', primaryPalette['500'] || '#5eade0');
        addVar('--garden-color-border-primary-active', primaryPalette['400'] || '#83c5ea');
      } else {
        addVar('--garden-color-border-primary-hover', primaryPalette['700'] || '#1f73b7');
        addVar('--garden-color-border-primary-active', primaryPalette['800'] || '#144a75');
      }
    } catch {
      addVar('--garden-color-border-primary-hover', isDark ? '#5eade0' : '#1f73b7');
      addVar('--garden-color-border-primary-active', isDark ? '#83c5ea' : '#144a75');
    }

    // Danger border hover colors
    try {
      const dangerHue = theme.colors.dangerHue;
      const dangerPalette = theme.palette[dangerHue] as Record<string, string>;
      if (isDark) {
        addVar('--garden-color-border-danger-hover', dangerPalette['500'] || '#e35b5d');
        addVar('--garden-color-border-danger-active', dangerPalette['400'] || '#f5b5ba');
      } else {
        addVar('--garden-color-border-danger-hover', dangerPalette['700'] || '#cc3340');
        addVar('--garden-color-border-danger-active', dangerPalette['800'] || '#8c232c');
      }
    } catch {
      addVar('--garden-color-border-danger-hover', isDark ? '#e35b5d' : '#cc3340');
      addVar('--garden-color-border-danger-active', isDark ? '#f5b5ba' : '#8c232c');
    }

    // Border variables
    for (const key of Object.keys(schemeVars.border)) {
      const varName = `--garden-color-border-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      try {
        addVar(varName, getColor({ theme, variable: `border.${key}` }));
      } catch {
        // Skip unresolvable
      }
    }

    // Foreground variables
    for (const key of Object.keys(schemeVars.foreground)) {
      const varName = `--garden-color-foreground-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      try {
        addVar(varName, getColor({ theme, variable: `foreground.${key}` }));
      } catch {
        // Skip unresolvable
      }
    }

    // Avatar status indicator colors (light: shade 500, dark: shade 400 for most)
    try {
      const mintPalette = theme.palette['mint'] as Record<string, string>;
      const orangePalette = theme.palette['orange'] as Record<string, string>;
      const azurePalette = theme.palette['azure'] as Record<string, string>;
      const greyPalette = theme.palette['grey'] as Record<string, string>;
      const crimsonPalette = theme.palette['crimson'] as Record<string, string>;
      
      if (isDark) {
        addVar('--garden-color-status-available', mintPalette['400'] || '#4fd12b');
        addVar('--garden-color-status-away', orangePalette['400'] || '#eda875');
        addVar('--garden-color-status-transfers', azurePalette['400'] || '#82bcf4');
        addVar('--garden-color-status-offline', greyPalette['400'] || '#b0b8be');
        addVar('--garden-color-status-active', crimsonPalette['600'] || '#cf7464');
      } else {
        addVar('--garden-color-status-available', mintPalette['500'] || '#01b15c');
        addVar('--garden-color-status-away', orangePalette['500'] || '#e58035');
        addVar('--garden-color-status-transfers', azurePalette['500'] || '#4b9fee');
        addVar('--garden-color-status-offline', greyPalette['500'] || '#919ca5');
        addVar('--garden-color-status-active', crimsonPalette['700'] || '#be4938');
      }
    } catch {
      // Fallback values
      addVar('--garden-color-status-available', isDark ? '#4fd12b' : '#01b15c');
      addVar('--garden-color-status-away', isDark ? '#eda875' : '#e58035');
      addVar('--garden-color-status-transfers', isDark ? '#82bcf4' : '#4b9fee');
      addVar('--garden-color-status-offline', isDark ? '#b0b8be' : '#919ca5');
      addVar('--garden-color-status-active', isDark ? '#cf7464' : '#be4938');
    }

    // Tooltip background for dark type (light: grey 900, dark: grey 700)
    try {
      const greyPalette = theme.palette['grey'] as Record<string, string>;
      addVar('--garden-color-tooltip-background-dark', isDark ? greyPalette['700'] || '#5c6970' : greyPalette['900'] || '#293239');
    } catch {
      addVar('--garden-color-tooltip-background-dark', isDark ? '#5c6970' : '#293239');
    }

    // Modal backdrop color (grey.1100 with opacity in dark, grey.800 with opacity in light)
    try {
      const greyPalette = theme.palette['grey'] as Record<string, string>;
      const backdropColor = isDark ? greyPalette['1100'] || '#151a1e' : greyPalette['800'] || '#39434b';
      addVar('--garden-color-modal-backdrop', `rgba(${parseInt(backdropColor.slice(1, 3), 16)}, ${parseInt(backdropColor.slice(3, 5), 16)}, ${parseInt(backdropColor.slice(5, 7), 16)}, 0.8)`);
    } catch {
      addVar('--garden-color-modal-backdrop', isDark ? 'rgba(21, 26, 30, 0.8)' : 'rgba(47, 57, 65, 0.8)');
    }

    // Skeleton colors
    // Light mode: neutralHue-700 at 16% opacity (darker gray)
    // Dark mode: white at 16% opacity (brighter)
    try {
      const neutralHue = theme.colors.neutralHue;
      const neutralPalette = theme.palette[neutralHue] as Record<string, string>;
      if (isDark) {
        // Dark mode: white at 16% opacity for better contrast
        addVar('--garden-color-skeleton-background', 'rgba(255, 255, 255, 0.16)');
        addVar('--garden-color-skeleton-gradient', 'rgba(255, 255, 255, 0.16)');
      } else {
        // Light mode: neutralHue-700 at 16% opacity
        const neutralColor = neutralPalette['700'] || '#68737d';
        const r = parseInt(neutralColor.slice(1, 3), 16);
        const g = parseInt(neutralColor.slice(3, 5), 16);
        const b = parseInt(neutralColor.slice(5, 7), 16);
        addVar('--garden-color-skeleton-background', `rgba(${r}, ${g}, ${b}, 0.16)`);
        addVar('--garden-color-skeleton-gradient', `rgba(${r}, ${g}, ${b}, 0.16)`);
      }
    } catch {
      // Fallback
      if (isDark) {
        addVar('--garden-color-skeleton-background', 'rgba(255, 255, 255, 0.16)');
        addVar('--garden-color-skeleton-gradient', 'rgba(255, 255, 255, 0.16)');
      } else {
        addVar('--garden-color-skeleton-background', 'rgba(104, 115, 125, 0.16)');
        addVar('--garden-color-skeleton-gradient', 'rgba(104, 115, 125, 0.16)');
      }
    }

    // Spacing variables
    addVar('--garden-space-base', `${theme.space.base}px`);
    addVar('--garden-space-xxs', theme.space.xxs);
    addVar('--garden-space-xs', theme.space.xs);
    addVar('--garden-space-sm', theme.space.sm);
    addVar('--garden-space-md', theme.space.md);
    addVar('--garden-space-lg', theme.space.lg);
    addVar('--garden-space-xl', theme.space.xl);
    addVar('--garden-space-xxl', theme.space.xxl);

    // Border variables
    addVar('--garden-border-radius-sm', theme.borderRadii.sm);
    addVar('--garden-border-radius-md', theme.borderRadii.md);
    addVar('--garden-border-radius-lg', theme.borderRadii.lg);
    addVar('--garden-border-width-sm', theme.borderWidths.sm);
    addVar('--garden-border-width-md', theme.borderWidths.md);

    // Font variables
    addVar('--garden-font-system', theme.fonts.system);
    addVar('--garden-font-mono', theme.fonts.mono);
    addVar('--garden-font-size-xs', theme.fontSizes.xs);
    addVar('--garden-font-size-sm', theme.fontSizes.sm);
    addVar('--garden-font-size-md', theme.fontSizes.md);
    addVar('--garden-font-size-lg', theme.fontSizes.lg);
    addVar('--garden-font-size-xl', theme.fontSizes.xl);
    addVar('--garden-font-size-xxl', theme.fontSizes.xxl);
    addVar('--garden-font-size-xxxl', theme.fontSizes.xxxl);

    // Font weight variables
    addVar('--garden-font-weight-thin', String(theme.fontWeights.thin));
    addVar('--garden-font-weight-extralight', String(theme.fontWeights.extralight));
    addVar('--garden-font-weight-light', String(theme.fontWeights.light));
    addVar('--garden-font-weight-regular', String(theme.fontWeights.regular));
    addVar('--garden-font-weight-medium', String(theme.fontWeights.medium));
    addVar('--garden-font-weight-semibold', String(theme.fontWeights.semibold));
    addVar('--garden-font-weight-bold', String(theme.fontWeights.bold));
    addVar('--garden-font-weight-extrabold', String(theme.fontWeights.extrabold));
    addVar('--garden-font-weight-black', String(theme.fontWeights.black));

    // Line height variables
    addVar('--garden-line-height-sm', theme.lineHeights.sm);
    addVar('--garden-line-height-md', theme.lineHeights.md);
    addVar('--garden-line-height-lg', theme.lineHeights.lg);
    addVar('--garden-line-height-xl', theme.lineHeights.xl);
    addVar('--garden-line-height-xxl', theme.lineHeights.xxl);
    addVar('--garden-line-height-xxxl', theme.lineHeights.xxxl);

    // Icon sizes
    addVar('--garden-icon-size-sm', theme.iconSizes.sm);
    addVar('--garden-icon-size-md', theme.iconSizes.md);
    addVar('--garden-icon-size-lg', theme.iconSizes.lg);

    // Shadow widths
    addVar('--garden-shadow-width-xs', theme.shadowWidths.xs);
    addVar('--garden-shadow-width-sm', theme.shadowWidths.sm);
    addVar('--garden-shadow-width-md', theme.shadowWidths.md);

    // Breakpoints
    addVar('--garden-breakpoint-xs', theme.breakpoints.xs);
    addVar('--garden-breakpoint-sm', theme.breakpoints.sm);
    addVar('--garden-breakpoint-md', theme.breakpoints.md);
    addVar('--garden-breakpoint-lg', theme.breakpoints.lg);
    addVar('--garden-breakpoint-xl', theme.breakpoints.xl);

    return vars.join('; ');
  }

  const cssVariables = $derived(generateCSSVariables(theme));
</script>

<div
  class="garden-theme-root"
  class:garden-theme-dark={currentColorScheme === 'dark'}
  class:garden-theme-light={currentColorScheme === 'light'}
  class:garden-theme-rtl={isRtl}
  data-garden-color-scheme={currentColorScheme}
  dir={isRtl ? 'rtl' : 'ltr'}
  style={cssVariables}
>
  {@render children()}
</div>

<style>
  .garden-theme-root {
    min-height: 100%;
    font-family: var(--garden-font-system);
    font-size: var(--garden-font-size-md);
    line-height: var(--garden-line-height-md);
    color: var(--garden-color-foreground-default);
    background-color: var(--garden-color-background-default);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .garden-theme-root :global(*),
  .garden-theme-root :global(*::before),
  .garden-theme-root :global(*::after) {
    box-sizing: border-box;
  }

  .garden-theme-root :global(button),
  .garden-theme-root :global(input),
  .garden-theme-root :global(select),
  .garden-theme-root :global(textarea) {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
</style>
