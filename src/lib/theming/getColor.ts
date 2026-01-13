/**
 * Svelte Garden - Color Utilities
 * 
 * Utility functions for working with colors in the theme
 */

import { PALETTE } from './palette';
import { DEFAULT_THEME } from './theme';
import type { GardenTheme, ColorScheme } from './types';

/**
 * Parse a color string to RGBA components
 */
export function parseToRgba(color: string): [number, number, number, number] {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const fullHex = hex.length === 3
      ? hex.split('').map(c => c + c).join('')
      : hex;
    
    const r = parseInt(fullHex.slice(0, 2), 16);
    const g = parseInt(fullHex.slice(2, 4), 16);
    const b = parseInt(fullHex.slice(4, 6), 16);
    const a = fullHex.length === 8 
      ? parseInt(fullHex.slice(6, 8), 16) / 255 
      : 1;
    
    return [r, g, b, a];
  }
  
  // Handle rgb/rgba
  const rgbaMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (rgbaMatch) {
    return [
      parseInt(rgbaMatch[1], 10),
      parseInt(rgbaMatch[2], 10),
      parseInt(rgbaMatch[3], 10),
      rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1
    ];
  }
  
  // Handle named colors
  if (color === 'transparent') return [0, 0, 0, 0];
  if (color === 'white') return [255, 255, 255, 1];
  if (color === 'black') return [0, 0, 0, 1];
  
  throw new Error(`Cannot parse color: ${color}`);
}

/**
 * Convert RGB values to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Apply alpha transparency to a color
 */
export function rgba(color: string, alpha: number): string {
  const [r, g, b] = parseToRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Darken a color by a percentage
 */
export function darken(amount: number, color: string): string {
  const [r, g, b, a] = parseToRgba(color);
  const factor = 1 - amount;
  return `rgba(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)}, ${a})`;
}

/**
 * Lighten a color by a percentage
 */
export function lighten(amount: number, color: string): string {
  const [r, g, b, a] = parseToRgba(color);
  return `rgba(${Math.round(r + (255 - r) * amount)}, ${Math.round(g + (255 - g) * amount)}, ${Math.round(b + (255 - b) * amount)}, ${a})`;
}

interface GetColorOptions {
  theme?: GardenTheme;
  /** A variable key like 'background.default' or 'foreground.primary' */
  variable?: string;
  /** A palette hue name or semantic hue key */
  hue?: string;
  /** A shade value (100-1200) */
  shade?: number;
  /** Offset to adjust the shade */
  offset?: number;
  /** Transparency value (0-1) or opacity key (100-1200) */
  transparency?: number;
  /** Dark mode overrides */
  dark?: { hue?: string; shade?: number; offset?: number; transparency?: number };
  /** Light mode overrides */
  light?: { hue?: string; shade?: number; offset?: number; transparency?: number };
}

/**
 * Resolve a hue string to an actual palette hue object
 */
function resolveHue(
  hue: string,
  colors: GardenTheme['colors'],
  palette: GardenTheme['palette']
): Record<number, string> | string | undefined {
  // Check if it's a semantic hue reference (e.g., 'primaryHue')
  const semanticHues: Record<string, keyof typeof palette> = {
    primaryHue: colors.primaryHue,
    dangerHue: colors.dangerHue,
    warningHue: colors.warningHue,
    successHue: colors.successHue,
    neutralHue: colors.neutralHue,
    chromeHue: colors.chromeHue
  };
  
  const resolvedHue = semanticHues[hue] || hue;
  
  // Check if it's a palette key
  if (resolvedHue in palette) {
    return palette[resolvedHue as keyof typeof palette] as Record<number, string>;
  }
  
  // Return as-is (might be a direct color value)
  return resolvedHue;
}

/**
 * Parse variable reference to get hue and shade
 */
function parseVariableRef(
  ref: string,
  colors: GardenTheme['colors'],
  palette: GardenTheme['palette']
): { hue?: string; shade?: number; transparency?: number } {
  // Handle palette.white, palette.black
  if (ref.startsWith('palette.')) {
    const key = ref.replace('palette.', '');
    return { hue: palette[key as keyof typeof palette] as string };
  }
  
  // Handle rgba(hue.shade, opacity)
  const rgbaMatch = ref.match(/rgba\s*\(\s*([^,]+)\s*,\s*(\d+)\s*\)/);
  if (rgbaMatch) {
    const innerRef = rgbaMatch[1];
    const opacityKey = parseInt(rgbaMatch[2], 10);
    const inner = parseVariableRef(innerRef, colors, palette);
    return { ...inner, transparency: opacityKey };
  }
  
  // Handle hue.shade (e.g., 'primaryHue.700', 'neutralHue.300')
  const [hueKey, shadeStr] = ref.split('.');
  const shade = shadeStr ? parseInt(shadeStr, 10) : undefined;
  
  // Resolve semantic hue
  const semanticHues: Record<string, string> = {
    primaryHue: colors.primaryHue,
    dangerHue: colors.dangerHue,
    warningHue: colors.warningHue,
    successHue: colors.successHue,
    neutralHue: colors.neutralHue,
    chromeHue: colors.chromeHue
  };
  
  const hue = semanticHues[hueKey] || hueKey;
  
  return { hue, shade };
}

/**
 * Get a color value from the theme
 * 
 * @example
 * // Using a variable
 * getColor({ theme, variable: 'background.default' })
 * 
 * @example
 * // Using hue and shade
 * getColor({ theme, hue: 'blue', shade: 700 })
 * 
 * @example
 * // With light/dark mode overrides
 * getColor({
 *   theme,
 *   hue: 'blue',
 *   shade: 700,
 *   dark: { shade: 600 },
 *   light: { shade: 700 }
 * })
 */
export function getColor(options: GetColorOptions): string {
  const {
    theme = DEFAULT_THEME,
    variable,
    hue: inputHue,
    shade: inputShade,
    offset: inputOffset,
    transparency: inputTransparency,
    dark,
    light
  } = options;

  const { palette, colors, opacity } = theme;
  const scheme: ColorScheme = colors.base;
  const modeOverrides = scheme === 'dark' ? dark : light;
  
  let hue = modeOverrides?.hue ?? inputHue;
  let shade = modeOverrides?.shade ?? inputShade;
  let offset = modeOverrides?.offset ?? inputOffset ?? 0;
  let transparency = modeOverrides?.transparency ?? inputTransparency;

  // If variable is provided, resolve it first
  if (variable) {
    const variables = colors.variables[scheme];
    const [category, key] = variable.split('.') as [keyof typeof variables, string];
    const ref = variables[category]?.[key as keyof typeof variables[typeof category]];
    
    if (!ref) {
      throw new Error(`Unknown color variable: ${variable}`);
    }
    
    const parsed = parseVariableRef(ref, colors, palette);
    hue = parsed.hue;
    shade = parsed.shade;
    if (parsed.transparency !== undefined && transparency === undefined) {
      transparency = parsed.transparency;
    }
  }

  if (!hue) {
    throw new Error('getColor requires either a variable or hue parameter');
  }

  // Resolve hue to actual color value
  const resolvedHue = resolveHue(hue, colors, palette);
  
  let color: string;
  
  if (typeof resolvedHue === 'string') {
    // Direct color value (e.g., '#fff' or 'white')
    color = resolvedHue === 'white' ? '#fff' : resolvedHue === 'black' ? '#000' : resolvedHue;
  } else if (typeof resolvedHue === 'object') {
    // Palette hue object
    const targetShade = (shade ?? (scheme === 'dark' ? 600 : 700)) + offset;
    
    // Find the closest available shade
    const availableShades = Object.keys(resolvedHue).map(Number).sort((a, b) => a - b);
    let closestShade = availableShades[0];
    
    for (const s of availableShades) {
      if (Math.abs(s - targetShade) < Math.abs(closestShade - targetShade)) {
        closestShade = s;
      }
    }
    
    color = resolvedHue[closestShade];
  } else {
    throw new Error(`Cannot resolve hue: ${hue}`);
  }

  // Apply transparency if specified
  if (transparency !== undefined) {
    const alpha = transparency > 1 ? opacity[transparency as keyof typeof opacity] : transparency;
    if (alpha === undefined) {
      throw new Error(`Invalid transparency value: ${transparency}`);
    }
    color = rgba(color, alpha);
  }

  return color;
}

/**
 * Generate CSS custom properties for a color scheme
 */
export function generateColorVariables(theme: GardenTheme, scheme: ColorScheme): Record<string, string> {
  const variables: Record<string, string> = {};
  const schemeVars = theme.colors.variables[scheme];
  
  // Create a temporary theme with the target scheme for resolution
  const tempTheme = {
    ...theme,
    colors: { ...theme.colors, base: scheme }
  };
  
  // Background variables
  for (const [key, _value] of Object.entries(schemeVars.background)) {
    const varName = `--garden-color-background-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    try {
      variables[varName] = getColor({ theme: tempTheme, variable: `background.${key}` });
    } catch {
      // Skip if variable can't be resolved
    }
  }
  
  // Border variables
  for (const [key, _value] of Object.entries(schemeVars.border)) {
    const varName = `--garden-color-border-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    try {
      variables[varName] = getColor({ theme: tempTheme, variable: `border.${key}` });
    } catch {
      // Skip if variable can't be resolved
    }
  }
  
  // Foreground variables
  for (const [key, _value] of Object.entries(schemeVars.foreground)) {
    const varName = `--garden-color-foreground-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    try {
      variables[varName] = getColor({ theme: tempTheme, variable: `foreground.${key}` });
    } catch {
      // Skip if variable can't be resolved
    }
  }
  
  return variables;
}

export default getColor;
