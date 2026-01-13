/**
 * Svelte Garden - Grid Context
 */

import { getContext, setContext } from 'svelte';
import type { GridContext, Space } from './types';

const GRID_CONTEXT_KEY = Symbol('garden-grid-context');

export function setGridContext(context: GridContext): void {
  setContext(GRID_CONTEXT_KEY, context);
}

export function getGridContext(): GridContext {
  return getContext(GRID_CONTEXT_KEY) ?? {
    columns: 12,
    gutters: 'md',
    debug: false
  };
}

/**
 * Get gutter size in pixels based on space value
 */
export function getGutterSize(gutters: Space): number {
  if (gutters === false) return 0;
  
  const gutterMap: Record<string, number> = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28
  };
  
  return gutterMap[gutters] ?? 16;
}
