/**
 * Svelte Garden - Theme Types
 * 
 * TypeScript definitions for the theming system
 */

import type { PaletteHue, PaletteShade } from './palette';

export type ColorScheme = 'light' | 'dark';
export type Size = 'small' | 'medium' | 'large';

export interface BorderRadii {
  sm: string;
  md: string;
  lg: string;
}

export interface BorderStyles {
  solid: string;
}

export interface BorderWidths {
  sm: string;
  md: string;
}

export interface Borders {
  sm: string;
  md: string;
}

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface SemanticHues {
  primaryHue: PaletteHue;
  dangerHue: PaletteHue;
  warningHue: PaletteHue;
  successHue: PaletteHue;
  neutralHue: PaletteHue;
  chromeHue: PaletteHue;
}

export interface ColorVariables {
  background: {
    default: string;
    raised: string;
    recessed: string;
    subtle: string;
    emphasis: string;
    success: string;
    warning: string;
    danger: string;
    primaryEmphasis: string;
    successEmphasis: string;
    warningEmphasis: string;
    dangerEmphasis: string;
    disabled: string;
  };
  border: {
    default: string;
    emphasis: string;
    subtle: string;
    success: string;
    warning: string;
    danger: string;
    primaryEmphasis: string;
    successEmphasis: string;
    warningEmphasis: string;
    dangerEmphasis: string;
    disabled: string;
  };
  foreground: {
    default: string;
    subtle: string;
    onEmphasis: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    successEmphasis: string;
    warningEmphasis: string;
    dangerEmphasis: string;
    disabled: string;
  };
  shadow: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface Colors extends SemanticHues {
  base: ColorScheme;
  variables: {
    dark: ColorVariables;
    light: ColorVariables;
  };
}

export interface Fonts {
  mono: string;
  system: string;
}

export interface FontSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface FontWeights {
  thin: number;
  extralight: number;
  light: number;
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface IconSizes {
  sm: string;
  md: string;
  lg: string;
}

export interface LineHeights {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface Opacity {
  100: number;
  200: number;
  300: number;
  400: number;
  500: number;
  600: number;
  700: number;
  800: number;
  900: number;
  1000: number;
  1100: number;
  1200: number;
}

export interface ShadowWidths {
  xs: string;
  sm: string;
  md: string;
}

export interface Shadows {
  xs: (color: string) => string;
  sm: (color: string) => string;
  md: (color: string) => string;
  lg: (offsetY: string, blurRadius: string, color: string) => string;
}

export interface Space {
  base: number;
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface GardenTheme {
  borders: Borders;
  borderRadii: BorderRadii;
  borderStyles: BorderStyles;
  borderWidths: BorderWidths;
  breakpoints: Breakpoints;
  colors: Colors;
  components: Record<string, Record<string, string>>;
  fonts: Fonts;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  iconSizes: IconSizes;
  lineHeights: LineHeights;
  opacity: Opacity;
  palette: typeof import('./palette').PALETTE;
  rtl: boolean;
  shadowWidths: ShadowWidths;
  shadows: Shadows;
  space: Space;
}

/**
 * Theme context type for Svelte context API
 */
export interface ThemeContext {
  theme: GardenTheme;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}
