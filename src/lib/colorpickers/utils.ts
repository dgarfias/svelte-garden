/**
 * Svelte Garden - Color Utilities
 * 
 * Color conversion and manipulation functions
 */

import type { IColor, IHSVColor, IHSLColor, IRGBColor } from './types';

/**
 * Convert hex string to RGB
 */
export function hexToRgb(hex: string): IRGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    };
  }
  // Handle shorthand hex (#fff)
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
  if (shorthand) {
    return {
      red: parseInt(shorthand[1] + shorthand[1], 16),
      green: parseInt(shorthand[2] + shorthand[2], 16),
      blue: parseInt(shorthand[3] + shorthand[3], 16)
    };
  }
  return null;
}

/**
 * Convert RGB to hex string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): IHSLColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): IRGBColor {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    red: Math.round(r * 255),
    green: Math.round(g * 255),
    blue: Math.round(b * 255)
  };
}

/**
 * Convert HSV to HSL
 * Using React Garden's exact formula for consistency
 */
export function hsvToHsl(h: number, s: number, v: number): IHSLColor {
  let saturation = s;
  let value = v;

  saturation /= 100;
  value /= 100;

  let l = (2 - saturation) * value;
  let sl = saturation * value;

  sl /= l <= 1 ? l : 2 - l;
  sl = sl || 0;
  l /= 2;

  return {
    h,
    s: Math.round(sl * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Convert HSL to HSV
 * Using React Garden's exact formula for consistency
 */
export function hslToHsv(h: number, s: number, l: number): IHSVColor {
  let saturation = s;

  saturation *= (l < 50 ? l : 100 - l) / 100;
  const v = l + saturation;

  return {
    h,
    s: v === 0 ? 0 : Math.round(((2 * saturation) / v) * 100),
    v: Math.round(v)
  };
}

/**
 * Convert a color string to IColor object
 */
export function parseColor(color: string | IColor): IColor {
  if (typeof color !== 'string') {
    return color;
  }

  // Handle hex colors
  const rgb = hexToRgb(color);
  if (rgb) {
    const hsl = rgbToHsl(rgb.red, rgb.green, rgb.blue);
    return {
      hex: color.startsWith('#') ? color : `#${color}`,
      hue: hsl.h,
      saturation: hsl.s,
      lightness: hsl.l,
      red: rgb.red,
      green: rgb.green,
      blue: rgb.blue,
      alpha: 100
    };
  }

  // Handle rgba colors
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    const a = rgbaMatch[4] ? Math.round(parseFloat(rgbaMatch[4]) * 100) : 100;
    const hsl = rgbToHsl(r, g, b);
    return {
      hex: rgbToHex(r, g, b),
      hue: hsl.h,
      saturation: hsl.s,
      lightness: hsl.l,
      red: r,
      green: g,
      blue: b,
      alpha: a
    };
  }

  // Default to white
  return {
    hex: '#ffffff',
    hue: 0,
    saturation: 0,
    lightness: 100,
    red: 255,
    green: 255,
    blue: 255,
    alpha: 100
  };
}

/**
 * Create IColor from HSV values
 */
export function colorFromHsv(h: number, s: number, v: number, alpha: number = 100): IColor {
  const hsl = hsvToHsl(h, s, v);
  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return {
    hex: rgbToHex(rgb.red, rgb.green, rgb.blue),
    hue: h,
    saturation: hsl.s,
    lightness: hsl.l,
    red: rgb.red,
    green: rgb.green,
    blue: rgb.blue,
    alpha
  };
}

/**
 * Create IColor from RGB values
 */
export function colorFromRgb(r: number, g: number, b: number, alpha: number = 100): IColor {
  const hsl = rgbToHsl(r, g, b);
  return {
    hex: rgbToHex(r, g, b),
    hue: hsl.h,
    saturation: hsl.s,
    lightness: hsl.l,
    red: r,
    green: g,
    blue: b,
    alpha
  };
}

/**
 * Create IColor from hex string
 */
export function colorFromHex(hex: string, alpha: number = 100): IColor {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return parseColor('#ffffff');
  }
  const hsl = rgbToHsl(rgb.red, rgb.green, rgb.blue);
  return {
    hex: hex.startsWith('#') ? hex : `#${hex}`,
    hue: hsl.h,
    saturation: hsl.s,
    lightness: hsl.l,
    red: rgb.red,
    green: rgb.green,
    blue: rgb.blue,
    alpha
  };
}

/**
 * Check if two colors are equal
 */
export function areColorsEqual(a: IColor | string | undefined, b: IColor | string | undefined): boolean {
  if (!a || !b) return false;
  
  const colorA = typeof a === 'string' ? parseColor(a) : a;
  const colorB = typeof b === 'string' ? parseColor(b) : b;
  
  return (
    colorA.hex.toLowerCase() === colorB.hex.toLowerCase() &&
    colorA.alpha === colorB.alpha
  );
}

/**
 * Get color with alpha as CSS string
 */
export function colorToCss(color: IColor): string {
  if (color.alpha === 100) {
    return color.hex;
  }
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha / 100})`;
}
