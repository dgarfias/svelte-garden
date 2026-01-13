/**
 * Svelte Garden - CSS Utilities
 * 
 * Utility functions for generating CSS styles
 */

import { getColor } from '../theming/getColor';
import { DEFAULT_THEME } from '../theming/theme';
import type { GardenTheme } from '../theming/types';

export const SELECTOR_FOCUS_VISIBLE = '&:focus-visible';

interface FocusBoxShadowOptions {
  theme?: GardenTheme;
  /** Whether the box-shadow is inset */
  inset?: boolean;
  /** getColor options for the focus ring color */
  color?: { variable?: string; hue?: string; shade?: number };
  /** Theme shadowWidth key for the cumulative width */
  shadowWidth?: 'xs' | 'sm' | 'md';
  /** getColor options for the spacer color */
  spacerColor?: { variable?: string; hue?: string; shade?: number };
  /** Theme shadowWidth key for the spacer, or null to remove */
  spacerWidth?: 'xs' | 'sm' | null;
  /** Existing box-shadow to retain */
  boxShadow?: string;
}

/**
 * Get a CSS box-shadow property value for focus state styling
 */
export function getFocusBoxShadow(options: FocusBoxShadowOptions = {}): string {
  const {
    theme = DEFAULT_THEME,
    inset = false,
    color = { variable: 'border.primaryEmphasis' },
    shadowWidth = 'md',
    spacerColor = { variable: 'background.default' },
    spacerWidth = 'xs',
    boxShadow
  } = options;

  const focusColor = getColor({ theme, ...color });
  const shadow = theme.shadows[shadowWidth](focusColor);
  const insetPrefix = inset ? 'inset ' : '';

  if (spacerWidth === null) {
    return `${insetPrefix}${shadow}`;
  }

  const spacerColorValue = getColor({ theme, ...spacerColor });
  const spacerShadow = theme.shadows[spacerWidth](spacerColorValue);

  const result = `${insetPrefix}${spacerShadow}, ${insetPrefix}${shadow}`;

  return boxShadow ? `${result}, ${boxShadow}` : result;
}

interface FocusStylesOptions extends FocusBoxShadowOptions {
  /** Whether to apply focus styles (default: true) */
  condition?: boolean;
  /** Additional styles to apply on focus */
  styles?: Record<string, string>;
}

/**
 * Generate focus style CSS properties
 * Returns an object with CSS properties to apply for focus states
 */
export function getFocusStyles(options: FocusStylesOptions = {}): {
  outline: string;
  outlineOffset: string;
  boxShadow: string;
  additionalStyles?: Record<string, string>;
} {
  const {
    theme = DEFAULT_THEME,
    condition = true,
    shadowWidth = 'md',
    spacerWidth = 'xs',
    styles,
    ...boxShadowOptions
  } = options;

  let outline: string;
  let outlineOffset: string;

  if (spacerWidth === null) {
    outline = theme.shadowWidths[shadowWidth];
    outlineOffset = '0';
  } else {
    const shadowWidthPx = parseInt(theme.shadowWidths[shadowWidth], 10);
    const spacerWidthPx = parseInt(theme.shadowWidths[spacerWidth], 10);
    outline = `${shadowWidthPx - spacerWidthPx}px solid transparent`;
    outlineOffset = theme.shadowWidths[spacerWidth];
  }

  const boxShadow = condition
    ? getFocusBoxShadow({ theme, shadowWidth, spacerWidth, ...boxShadowOptions })
    : '';

  return {
    outline,
    outlineOffset,
    boxShadow,
    additionalStyles: styles
  };
}

/**
 * CSS class names helper
 * Filters out falsy values and joins class names
 */
export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate inline styles object from CSS property object
 */
export function styleObject(
  styles: Record<string, string | number | undefined | null>
): string {
  return Object.entries(styles)
    .filter(([, value]) => value != null)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
}

/**
 * Math utility for pixel calculations
 */
export function pxMath(expression: string): string {
  // Simple parser for expressions like "40px - 2px"
  const match = expression.match(/(\d+(?:\.\d+)?)(px|rem|em)?\s*([+-])\s*(\d+(?:\.\d+)?)(px|rem|em)?/);
  
  if (!match) {
    return expression;
  }

  const [, num1, unit1 = 'px', operator, num2, unit2 = 'px'] = match;
  
  // Only handle same units for simplicity
  if (unit1 !== unit2) {
    return expression;
  }

  const result = operator === '+' 
    ? parseFloat(num1) + parseFloat(num2)
    : parseFloat(num1) - parseFloat(num2);

  return `${result}${unit1}`;
}

/**
 * Convert pixels to ems relative to a font size
 */
export function pxToEm(px: string, baseFontSize: string): string {
  const pxValue = parseFloat(px);
  const baseValue = parseFloat(baseFontSize);
  return `${pxValue / baseValue}em`;
}

/**
 * Strip unit from a CSS value
 */
export function stripUnit(value: string): number {
  return parseFloat(value);
}

export default {
  getFocusBoxShadow,
  getFocusStyles,
  classNames,
  styleObject,
  pxMath,
  pxToEm,
  stripUnit,
  SELECTOR_FOCUS_VISIBLE
};
