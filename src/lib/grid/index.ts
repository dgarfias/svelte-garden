/**
 * Svelte Garden - Grid Package
 * 
 * A responsive flexbox grid system.
 */

export { default as Grid } from './Grid.svelte';
export { default as Row } from './Row.svelte';
export { default as Col } from './Col.svelte';

// Export types with Grid prefix to avoid conflicts
export type {
  GridProps,
  RowProps as GridRowProps,
  ColProps as GridColProps,
  GridContext,
  GridAlignItems,
  GridAlignSelf,
  GridJustifyContent,
  GridTextAlign,
  GridSpace,
  GridWrap,
  GridBreakpoint
} from './types';

// Export constants
export {
  GRID_ALIGN_ITEMS,
  GRID_ALIGN_SELF,
  GRID_JUSTIFY_CONTENT,
  GRID_TEXT_ALIGN,
  GRID_SPACE,
  GRID_WRAP
} from './types';

export { setGridContext, getGridContext, getGutterSize } from './context';
