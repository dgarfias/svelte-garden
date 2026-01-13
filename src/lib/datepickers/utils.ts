/**
 * Svelte Garden - Date Utilities
 */

import type { WeekStartsOn } from './types';

/**
 * Get the first day of a month
 */
export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the last day of a month
 */
export function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  result.setDate(0);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get the start of the week containing a date
 */
export function startOfWeek(date: Date, weekStartsOn: WeekStartsOn = 0): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of the week containing a date
 */
export function endOfWeek(date: Date, weekStartsOn: WeekStartsOn = 0): Date {
  const result = startOfWeek(date, weekStartsOn);
  result.setDate(result.getDate() + 6);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return isSameDay(date, today);
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if two dates are in the same month
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

/**
 * Check if date1 is before date2
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

/**
 * Check if date1 is after date2
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/**
 * Get all days in an interval
 */
export function eachDayOfInterval(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  
  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

/**
 * Get default week start day for a locale
 */
export function getLocaleWeekStartsOn(locale: string): WeekStartsOn {
  // Most locales start week on Monday (1), but US and some others start on Sunday (0)
  const sundayStartLocales = ['en-US', 'en-CA', 'ja', 'ko', 'zh', 'he', 'ar'];
  const localeBase = locale.split('-')[0];
  
  if (sundayStartLocales.includes(locale) || sundayStartLocales.includes(localeBase)) {
    return 0;
  }
  return 1;
}

/**
 * Format a date using Intl.DateTimeFormat
 */
export function formatDate(date: Date, locale: string = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

/**
 * Format month and year
 */
export function formatMonthYear(date: Date, locale: string = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long'
  }).format(date);
}

/**
 * Get short weekday names
 */
export function getWeekdayNames(locale: string = 'en-US', weekStartsOn: WeekStartsOn = 0): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const days: string[] = [];
  
  // Start from a known Sunday (Jan 4, 1970)
  const sunday = new Date(1970, 0, 4);
  
  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStartsOn + i) % 7;
    const date = addDays(sunday, dayIndex);
    days.push(formatter.format(date));
  }
  
  return days;
}

/**
 * Parse a date string
 */
export function parseDate(value: string, locale: string = 'en-US'): Date | null {
  if (!value) return null;
  
  // Try native Date parsing first
  const parsed = new Date(value);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  
  return null;
}
