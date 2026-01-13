<!--
  Svelte Garden - Calendar Component
  
  A standalone calendar for date selection.
-->
<script lang="ts">
  import type { CalendarProps, WeekStartsOn } from './types';
  import type { Snippet } from 'svelte';
  import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addMonths,
    eachDayOfInterval,
    isToday,
    isSameDay,
    isSameMonth,
    isBefore,
    isAfter,
    getWeekdayNames,
    formatMonthYear,
    getLocaleWeekStartsOn
  } from './utils';

  interface Props extends CalendarProps {
    children?: Snippet;
    onChange?: (date: Date) => void;
  }

  let {
    children,
    class: className = '',
    value,
    displayMonth,
    minValue,
    maxValue,
    isCompact = false,
    locale = 'en-US',
    weekStartsOn,
    onChange,
    ...restProps
  }: Props = $props();

  // Internal state for the displayed month - use derived for initial value
  const initialDisplayMonth = $derived(displayMonth ?? value ?? new Date());
  let internalDisplayMonth = $state(new Date());
  
  // Sync internal state with props
  $effect(() => {
    internalDisplayMonth = initialDisplayMonth;
  });

  // Determine the effective week start
  const effectiveWeekStartsOn = $derived<WeekStartsOn>(weekStartsOn ?? getLocaleWeekStartsOn(locale));

  // Get weekday names
  const weekdays = $derived(getWeekdayNames(locale, effectiveWeekStartsOn));

  // Get the month title
  const monthTitle = $derived(formatMonthYear(internalDisplayMonth, locale));

  // Calculate calendar days
  const calendarDays = $derived(() => {
    const monthStart = startOfMonth(internalDisplayMonth);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, effectiveWeekStartsOn);
    const calendarEnd = endOfWeek(monthEnd, effectiveWeekStartsOn);
    
    return eachDayOfInterval(calendarStart, calendarEnd);
  });

  function goToPreviousMonth() {
    internalDisplayMonth = addMonths(internalDisplayMonth, -1);
  }

  function goToNextMonth() {
    internalDisplayMonth = addMonths(internalDisplayMonth, 1);
  }

  function selectDate(date: Date) {
    if (isDateDisabled(date)) return;
    onChange?.(date);
  }

  function isDateDisabled(date: Date): boolean {
    if (minValue && isBefore(date, minValue) && !isSameDay(date, minValue)) {
      return true;
    }
    if (maxValue && isAfter(date, maxValue) && !isSameDay(date, maxValue)) {
      return true;
    }
    return false;
  }

  function isDateSelected(date: Date): boolean {
    return value ? isSameDay(date, value) : false;
  }

  function isDateInCurrentMonth(date: Date): boolean {
    return isSameMonth(date, internalDisplayMonth);
  }

  const calendarClasses = $derived([
    'garden-calendar',
    isCompact && 'garden-calendar--compact',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={calendarClasses}
  data-garden-id="datepickers.calendar"
  role="application"
  aria-label="Calendar"
  {...restProps}
>
  <!-- Month navigation -->
  <div class="garden-calendar__header">
    <button
      type="button"
      class="garden-calendar__nav-button"
      aria-label="Previous month"
      onclick={goToPreviousMonth}
    >
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path d="M10.5 13.5L5 8l5.5-5.5L12 4l-4 4 4 4-1.5 1.5z"/>
      </svg>
    </button>
    
    <span class="garden-calendar__title">{monthTitle}</span>
    
    <button
      type="button"
      class="garden-calendar__nav-button"
      aria-label="Next month"
      onclick={goToNextMonth}
    >
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path d="M5.5 2.5L11 8l-5.5 5.5L4 12l4-4-4-4 1.5-1.5z"/>
      </svg>
    </button>
  </div>
  
  <!-- Weekday labels -->
  <div class="garden-calendar__weekdays" role="row">
    {#each weekdays as weekday}
      <div class="garden-calendar__weekday" role="columnheader">
        {weekday}
      </div>
    {/each}
  </div>
  
  <!-- Calendar grid -->
  <div class="garden-calendar__grid" role="grid">
    {#each calendarDays() as date}
      {@const disabled = isDateDisabled(date)}
      {@const selected = isDateSelected(date)}
      {@const today = isToday(date)}
      {@const inMonth = isDateInCurrentMonth(date)}
      
      <button
        type="button"
        class="garden-calendar__day"
        class:garden-calendar__day--today={today}
        class:garden-calendar__day--selected={selected}
        class:garden-calendar__day--outside={!inMonth}
        class:garden-calendar__day--disabled={disabled}
        role="gridcell"
        aria-selected={selected}
        aria-disabled={disabled}
        tabindex={selected ? 0 : -1}
        onclick={() => selectDate(date)}
      >
        {date.getDate()}
      </button>
    {/each}
  </div>
</div>

<style>
  .garden-calendar {
    display: inline-flex;
    flex-direction: column;
    width: 280px;
    padding: 12px;
    background-color: var(--garden-color-background-raised, #fff);
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    font-family: inherit;
    user-select: none;
  }

  .garden-calendar--compact {
    width: 240px;
    padding: 8px;
  }

  /* Header */
  .garden-calendar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .garden-calendar--compact .garden-calendar__header {
    margin-bottom: 8px;
  }

  .garden-calendar__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-calendar__nav-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: pointer;
    transition: background-color 0.1s ease, color 0.1s ease;
  }

  .garden-calendar--compact .garden-calendar__nav-button {
    width: 28px;
    height: 28px;
  }

  .garden-calendar__nav-button:hover {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-calendar__nav-button:focus-visible {
    outline: 2px solid var(--garden-color-border-primary-emphasis, #1f73b7);
    outline-offset: 2px;
  }

  .garden-calendar__nav-button svg {
    width: 16px;
    height: 16px;
  }

  /* Weekdays */
  .garden-calendar__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin-bottom: 4px;
  }

  .garden-calendar__weekday {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    font-size: 12px;
    font-weight: 600;
    color: var(--garden-color-foreground-subtle, #68737d);
    text-transform: uppercase;
  }

  .garden-calendar--compact .garden-calendar__weekday {
    height: 28px;
    font-size: 11px;
  }

  /* Grid */
  .garden-calendar__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  /* Days */
  .garden-calendar__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    font-size: 13px;
    font-family: inherit;
    color: var(--garden-color-foreground-default, #2f3941);
    cursor: pointer;
    transition: background-color 0.1s ease, color 0.1s ease;
  }

  .garden-calendar--compact .garden-calendar__day {
    height: 28px;
    font-size: 12px;
  }

  .garden-calendar__day:hover:not(.garden-calendar__day--disabled):not(.garden-calendar__day--selected) {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-calendar__day:focus-visible {
    outline: 2px solid var(--garden-color-border-primary-emphasis, #1f73b7);
    outline-offset: -2px;
  }

  /* Today */
  .garden-calendar__day--today {
    font-weight: 700;
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-calendar__day--today::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--garden-color-foreground-primary, #1f73b7);
    transform: translateX(-50%);
  }

  /* Selected */
  .garden-calendar__day--selected {
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
    color: var(--garden-color-foreground-on-emphasis, #fff);
    font-weight: 600;
  }

  .garden-calendar__day--selected:hover {
    background-color: var(--garden-palette-blue-800, #144a75);
  }

  .garden-calendar__day--selected.garden-calendar__day--today::after {
    background-color: var(--garden-color-foreground-on-emphasis, #fff);
  }

  /* Outside month */
  .garden-calendar__day--outside {
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  /* Disabled */
  .garden-calendar__day--disabled {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  .garden-calendar__day--disabled:hover {
    background: transparent;
  }
</style>
