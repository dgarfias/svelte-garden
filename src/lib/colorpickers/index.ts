/**
 * Svelte Garden - ColorPickers Package
 * 
 * Components for color selection and manipulation.
 */

export { default as ColorPicker } from './ColorPicker.svelte';
export { default as ColorSwatch } from './ColorSwatch.svelte';
export { default as ColorWell } from './ColorWell.svelte';

export type {
  IColor,
  IHSVColor,
  IHSLColor,
  IRGBColor,
  ILabeledColor,
  ColorPickerProps,
  ColorSwatchProps,
  ColorWellProps
} from './types';

// Re-export color utilities with unique names to avoid conflicts
export {
  parseColor,
  colorFromHsv,
  colorFromRgb,
  colorFromHex,
  colorToCss,
  areColorsEqual
} from './utils';
