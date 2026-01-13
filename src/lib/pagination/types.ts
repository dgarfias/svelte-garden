/**
 * Svelte Garden - Pagination Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export const PAGE_TYPE = ['next', 'page', 'gap', 'previous'] as const;
export type PageType = (typeof PAGE_TYPE)[number];

export interface PaginationLabels {
  /** Label for the previous button */
  previous?: string;
  /** Label for the next button */
  next?: string;
  /** Label for the gap indicator */
  gap?: string;
  /** Function to render page labels */
  renderPage?: (page: number) => string;
}

export interface OffsetPaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Sets the current page. Pages start at 1 */
  currentPage: number;
  /** Defines the total number of pages */
  totalPages: number;
  /** Sets the number of pages that appear between the current page and a gap indicator */
  pagePadding?: number;
  /** Positions the leading and trailing gap indicator */
  pageGap?: number;
  /** Handles page change events */
  onChange?: (currentPage: number) => void;
  /** Provides localized labels to pagination elements */
  labels?: PaginationLabels;
}

export interface CursorPaginationProps extends HTMLAttributes<HTMLElement> {}

export interface CursorButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Handles click events */
  onClick?: () => void;
}
