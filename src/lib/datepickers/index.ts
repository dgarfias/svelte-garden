/**
 * Svelte Garden - DatePickers Package
 * 
 * Components for date selection.
 */

export { default as Calendar } from './Calendar.svelte';
export { default as DatePicker } from './DatePicker.svelte';
export { default as DatePickerRange } from './DatePickerRange.svelte';

export type {
  CalendarProps,
  DatePickerProps,
  DatePickerRangeProps,
  WeekStartsOn
} from './types';

// Re-export with prefixed names to avoid conflicts
export { WEEK_STARTS_ON as DATE_PICKER_WEEK_STARTS_ON } from './types';

export {
  formatDate as formatDatePickerDate,
  formatMonthYear,
  parseDate as parseDatePickerDate,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isToday,
  isSameDay,
  isSameMonth,
  isBefore,
  isAfter,
  eachDayOfInterval,
  getWeekdayNames,
  getLocaleWeekStartsOn
} from './utils';
