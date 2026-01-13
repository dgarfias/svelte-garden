/**
 * Svelte Garden - Theming Module
 * 
 * This module provides the theming system for Svelte Garden components.
 */

// Components
export { default as ThemeProvider } from './ThemeProvider.svelte';

// Theme configuration
export { DEFAULT_THEME } from './theme';
export { PALETTE } from './palette';

// Color utilities
export { getColor, rgba, darken, lighten, parseToRgba, rgbToHex, generateColorVariables } from './getColor';

// Context utilities
export { setThemeContext, getThemeContext, useTheme, useColorScheme, useRtl } from './context';

// Types
export type {
  GardenTheme,
  ThemeContext,
  ColorScheme,
  Size,
  ColorVariables,
  Colors,
  SemanticHues,
  BorderRadii,
  BorderStyles,
  BorderWidths,
  Borders,
  Breakpoints,
  Fonts,
  FontSizes,
  FontWeights,
  IconSizes,
  LineHeights,
  Opacity,
  ShadowWidths,
  Shadows,
  Space
} from './types';

export type { PaletteColor, PaletteHue, PaletteShade } from './palette';
