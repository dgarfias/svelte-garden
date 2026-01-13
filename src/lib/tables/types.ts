/**
 * Svelte Garden - Tables Types
 */

import type { HTMLAttributes, HTMLTableAttributes } from 'svelte/elements';

export type TableSize = 'small' | 'medium' | 'large';

export interface TableProps extends HTMLTableAttributes {
  /** Table size */
  size?: TableSize;
  /** Whether rows are hoverable */
  isHoverable?: boolean;
  /** Whether table has striped rows */
  isStriped?: boolean;
  /** Whether table has borders */
  isBordered?: boolean;
}

export interface CaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  /** Whether caption is hidden visually but available to screen readers */
  isHidden?: boolean;
}

export interface HeadProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface BodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Whether row is selected */
  isSelected?: boolean;
  /** Whether row is focused */
  isFocused?: boolean;
}

export interface HeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  /** Sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** Whether cell is sortable */
  isSortable?: boolean;
  /** Cell width */
  width?: string | number;
  /** Minimum cell width */
  minWidth?: string | number;
  /** Whether to truncate content */
  isTruncated?: boolean;
}

export interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  /** Whether cell has overflow menu */
  hasOverflow?: boolean;
  /** Whether to truncate content */
  isTruncated?: boolean;
}
