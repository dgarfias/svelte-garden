/**
 * Svelte Garden - Grid Types
 */

import type { HTMLAttributes } from 'svelte/elements';

// Type constants
export const GRID_ALIGN_ITEMS = ['start', 'end', 'center', 'baseline', 'stretch'] as const;
export const GRID_ALIGN_SELF = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'] as const;
export const GRID_JUSTIFY_CONTENT = ['start', 'end', 'center', 'between', 'around'] as const;
export const GRID_TEXT_ALIGN = ['start', 'end', 'center', 'justify'] as const;
export const GRID_SPACE = [false, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export const GRID_WRAP = ['nowrap', 'wrap', 'wrap-reverse'] as const;

export type GridAlignItems = (typeof GRID_ALIGN_ITEMS)[number];
export type GridAlignSelf = (typeof GRID_ALIGN_SELF)[number];
export type GridJustifyContent = (typeof GRID_JUSTIFY_CONTENT)[number];
export type GridTextAlign = (typeof GRID_TEXT_ALIGN)[number];
export type GridSpace = (typeof GRID_SPACE)[number];
export type GridWrap = (typeof GRID_WRAP)[number];
export type GridBreakpoint = number | string | boolean;

// Internal type aliases for convenience
export type AlignItems = GridAlignItems;
export type AlignSelf = GridAlignSelf;
export type JustifyContent = GridJustifyContent;
export type TextAlign = GridTextAlign;
export type Space = GridSpace;
export type Wrap = GridWrap;
export type Breakpoint = GridBreakpoint;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Defines the number of individual columns that the grid contains */
  columns?: number | string;
  /** Specifies the grid column gutter width. The value `false` collapses the gutters */
  gutters?: Space;
  /** Highlights the columns for layout debugging */
  debug?: boolean;
}

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /** Applies the `align-items` flex container property to the row on all screen sizes */
  alignItems?: AlignItems;
  /** Applies the `align-items` flex container property to the row on extra-small screens */
  alignItemsXs?: AlignItems;
  /** Applies the `align-items` flex container property to the row on small screens */
  alignItemsSm?: AlignItems;
  /** Applies the `align-items` flex container property to the row on medium screens */
  alignItemsMd?: AlignItems;
  /** Applies the `align-items` flex container property to the row on large screens */
  alignItemsLg?: AlignItems;
  /** Applies the `align-items` flex container property to the row on extra-large screens */
  alignItemsXl?: AlignItems;
  /** Applies the `justify-content` flex container property to the row on all screen sizes */
  justifyContent?: JustifyContent;
  /** Applies the `justify-content` flex container property to the row on extra-small screens */
  justifyContentXs?: JustifyContent;
  /** Applies the `justify-content` flex container property to the row on small screens */
  justifyContentSm?: JustifyContent;
  /** Applies the `justify-content` flex container property to the row on medium screens */
  justifyContentMd?: JustifyContent;
  /** Applies the `justify-content` flex container property to the row on large screens */
  justifyContentLg?: JustifyContent;
  /** Applies the `justify-content` flex container property to the row on extra-large screens */
  justifyContentXl?: JustifyContent;
  /** Applies the `flex-wrap` container property to the row on all screen sizes */
  wrap?: Wrap;
  /** Applies the `flex-wrap` container property to the row on extra-small screens */
  wrapXs?: Wrap;
  /** Applies the `flex-wrap` container property to the row on small screens */
  wrapSm?: Wrap;
  /** Applies the `flex-wrap` container property to the row on medium screens */
  wrapMd?: Wrap;
  /** Applies the `flex-wrap` container property to the row on large screens */
  wrapLg?: Wrap;
  /** Applies the `flex-wrap` container property to the row on extra-large screens */
  wrapXl?: Wrap;
}

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /** Sets the total number of grid `columns` that the column spans on all screen sizes */
  size?: number | string;
  /** Defines the column size on extra-small screens */
  xs?: Breakpoint;
  /** Defines the column size on small screens */
  sm?: Breakpoint;
  /** Defines the column size on medium screens */
  md?: Breakpoint;
  /** Defines the column size on large screens */
  lg?: Breakpoint;
  /** Defines the column size on extra-large screens */
  xl?: Breakpoint;
  /** Applies the `align-self` flex item property on all screen sizes */
  alignSelf?: AlignSelf;
  /** Applies the `align-self` flex item property on extra-small screens */
  alignSelfXs?: AlignSelf;
  /** Applies the `align-self` flex item property on small screens */
  alignSelfSm?: AlignSelf;
  /** Applies the `align-self` flex item property on medium screens */
  alignSelfMd?: AlignSelf;
  /** Applies the `align-self` flex item property on large screens */
  alignSelfLg?: AlignSelf;
  /** Applies the `align-self` flex item property on extra-large screens */
  alignSelfXl?: AlignSelf;
  /** Applies the RTL-aware `text-align` property on all screen sizes */
  textAlign?: TextAlign;
  /** Applies the `text-align` property on extra-small screens */
  textAlignXs?: TextAlign;
  /** Applies the `text-align` property on small screens */
  textAlignSm?: TextAlign;
  /** Applies the `text-align` property on medium screens */
  textAlignMd?: TextAlign;
  /** Applies the `text-align` property on large screens */
  textAlignLg?: TextAlign;
  /** Applies the `text-align` property on extra-large screens */
  textAlignXl?: TextAlign;
  /** Offsets the column relative to the total number of `columns` on all screen sizes */
  offset?: number | string;
  /** Applies offset on extra-small screens */
  offsetXs?: number | string;
  /** Applies offset on small screens */
  offsetSm?: number | string;
  /** Applies offset on medium screens */
  offsetMd?: number | string;
  /** Applies offset on large screens */
  offsetLg?: number | string;
  /** Applies offset on extra-large screens */
  offsetXl?: number | string;
  /** Applies the `order` flex item property on all screen sizes */
  order?: number | string;
  /** Sets the `order` flex item property on extra-small screens */
  orderXs?: number | string;
  /** Sets the `order` flex item property on small screens */
  orderSm?: number | string;
  /** Sets the `order` flex item property on medium screens */
  orderMd?: number | string;
  /** Sets the `order` flex item property on large screens */
  orderLg?: number | string;
  /** Sets the `order` flex item property on extra-large screens */
  orderXl?: number | string;
}

export interface GridContext {
  columns: number | string;
  gutters: Space;
  debug: boolean;
}
