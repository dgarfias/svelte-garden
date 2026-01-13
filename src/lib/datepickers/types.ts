/**
 * Svelte Garden - DatePickers Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export const WEEK_STARTS_ON = [0, 1, 2, 3, 4, 5, 6] as const;
export type WeekStartsOn = (typeof WEEK_STARTS_ON)[number];

export const PLACEMENT = [
  'auto',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
] as const;
export type Placement = (typeof PLACEMENT)[number];

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  /** The currently selected date */
  value?: Date;
  /** The currently displayed month */
  displayMonth?: Date;
  /** Disables dates before this value */
  minValue?: Date;
  /** Disables dates after this value */
  maxValue?: Date;
  /** Applies compact styling */
  isCompact?: boolean;
  /** Locale for date formatting */
  locale?: string;
  /** Override the locale's default start of week (0 = Sunday, 1 = Monday, etc.) */
  weekStartsOn?: WeekStartsOn;
}

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
  /** The selected date */
  value?: Date;
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Disables dates before this value */
  minValue?: Date;
  /** Disables dates after this value */
  maxValue?: Date;
  /** Applies compact styling */
  isCompact?: boolean;
  /** Locale for date formatting */
  locale?: string;
  /** Override the locale's default start of week */
  weekStartsOn?: WeekStartsOn;
  /** Custom date formatter */
  formatDate?: (date: Date) => string;
  /** Custom date parser */
  parseDate?: (value: string) => Date | null;
  /** Disables the date picker */
  disabled?: boolean;
}

export interface DatePickerRangeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
  /** The start date */
  startValue?: Date;
  /** The end date */
  endValue?: Date;
  /** Placeholder text for start date */
  startPlaceholder?: string;
  /** Placeholder text for end date */
  endPlaceholder?: string;
  /** Disables dates before this value */
  minValue?: Date;
  /** Disables dates after this value */
  maxValue?: Date;
  /** Applies compact styling */
  isCompact?: boolean;
  /** Locale for date formatting */
  locale?: string;
  /** Override the locale's default start of week */
  weekStartsOn?: WeekStartsOn;
  /** Custom date formatter */
  formatDate?: (date: Date) => string;
  /** Custom date parser */
  parseDate?: (value: string) => Date | null;
  /** Disables the date picker */
  disabled?: boolean;
}
