/**
 * Svelte Garden - ColorPickers Types
 */

import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

export interface IColor {
  hex: string;
  hue: number;
  saturation: number;
  lightness: number;
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface IHSVColor {
  h: number;
  s: number;
  v: number;
}

export interface IHSLColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface IRGBColor {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

export interface ILabeledColor {
  value: string;
  label: string;
}

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Sets the color for an uncontrolled color picker */
  defaultColor?: string | IColor;
  /** Sets the color for a controlled color picker */
  color?: string | IColor;
  /** Hides alpha transparency fields */
  isOpaque?: boolean;
  /** Replaces label text within the color picker */
  labels?: {
    hueSlider?: string;
    alphaSlider?: string;
    hex?: string;
    red?: string;
    green?: string;
    blue?: string;
    alpha?: string;
  };
}

export interface ColorSwatchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
  /** Sets the name used to reference the value of the control */
  name: string;
  /** Sets the two-dimension array of labeled HEX and RGB/A string colors */
  colors: ILabeledColor[][];
  /** Determines if the color swatch is backed by radio (default) or checkbox inputs */
  isCheckboxGroup?: boolean;
  /** Sets the selected row index in a controlled color swatch */
  selectedRowIndex?: number | null;
  /** Sets the selected column index in a controlled color swatch */
  selectedColIndex?: number | null;
}

export interface ColorWellProps extends HTMLAttributes<HTMLDivElement> {
  /** The current hue (0-360) */
  hue: number;
  /** The current saturation (0-100) */
  saturation: number;
  /** The current lightness/value (0-100) */
  lightness: number;
}
