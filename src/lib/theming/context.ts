/**
 * Svelte Garden - Theme Context
 * 
 * Provides theme context for Svelte components
 */

import { getContext, setContext } from 'svelte';
import { DEFAULT_THEME } from './theme';
import type { GardenTheme, ColorScheme, ThemeContext } from './types';

const THEME_CONTEXT_KEY = Symbol('garden-theme');

/**
 * Set up the theme context (call this in ThemeProvider)
 */
export function setThemeContext(context: ThemeContext): void {
  setContext(THEME_CONTEXT_KEY, context);
}

/**
 * Get the current theme context
 */
export function getThemeContext(): ThemeContext | undefined {
  return getContext<ThemeContext>(THEME_CONTEXT_KEY);
}

/**
 * Get the current theme, falling back to default
 */
export function useTheme(): GardenTheme {
  const context = getThemeContext();
  return context?.theme ?? DEFAULT_THEME;
}

/**
 * Get the current color scheme
 */
export function useColorScheme(): ColorScheme {
  const context = getThemeContext();
  return context?.colorScheme ?? 'light';
}

/**
 * Get whether RTL mode is enabled
 */
export function useRtl(): boolean {
  const context = getThemeContext();
  return context?.theme?.rtl ?? false;
}
