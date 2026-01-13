<!--
  Svelte Garden - DatePickerRange Component
  
  A date range picker with two input fields and shared calendar.
  Uses CSS variables for dark mode support.
  
  @example
  <DatePickerRange
    startValue={startDate}
    endValue={endDate}
    onChange={({ startValue, endValue }) => {
      startDate = startValue;
      endDate = endValue;
    }}
  />
-->
<script lang="ts">
  import type { DatePickerRangeProps, WeekStartsOn } from './types';
  import type { Snippet } from 'svelte';
  import { formatDate as defaultFormatDate, parseDate as defaultParseDate, getLocaleWeekStartsOn, isSameDay, isBefore, isAfter, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, eachDayOfInterval, isToday, isSameMonth, getWeekdayNames, formatMonthYear } from './utils';

  interface Props extends DatePickerRangeProps {
    children?: Snippet;
    onChange?: (value: { startValue?: Date; endValue?: Date }) => void;
  }

  let {
    children,
    class: className = '',
    startValue,
    endValue,
    startPlaceholder = 'Start date',
    endPlaceholder = 'End date',
    minValue,
    maxValue,
    isCompact = false,
    locale = 'en-US',
    weekStartsOn,
    formatDate,
    parseDate,
    disabled = false,
    onChange,
    ...restProps
  }: Props = $props();

  // Internal state
  let activeInput: 'start' | 'end' | null = $state(null);
  let isOpen = $state(false);
  let startInputValue = $state('');
  let endInputValue = $state('');
  let startInputRef: HTMLInputElement;
  let endInputRef: HTMLInputElement;
  let containerRef: HTMLDivElement;
  
  // Display month for calendar - use derived for initial value to avoid state_referenced_locally warning
  const initialDisplayMonth = $derived(startValue ?? endValue ?? new Date());
  let displayMonth = $state(new Date());
  
  // Sync display month with initial value
  $effect(() => {
    displayMonth = initialDisplayMonth;
  });

  // Format function - use derived to track prop changes
  const format = $derived(formatDate ?? ((d: Date) => defaultFormatDate(d, locale)));
  const parse = $derived(parseDate ?? ((v: string) => defaultParseDate(v, locale)));

  // Effective week starts on
  const effectiveWeekStartsOn = $derived<WeekStartsOn>(weekStartsOn ?? getLocaleWeekStartsOn(locale));

  // Get weekday names
  const weekdays = $derived(getWeekdayNames(locale, effectiveWeekStartsOn));

  // Get the month title
  const monthTitle = $derived(formatMonthYear(displayMonth, locale));

  // Calculate calendar days
  const calendarDays = $derived(() => {
    const monthStart = startOfMonth(displayMonth);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, effectiveWeekStartsOn);
    const calendarEnd = endOfWeek(monthEnd, effectiveWeekStartsOn);
    return eachDayOfInterval(calendarStart, calendarEnd);
  });

  // Update input values when props change
  $effect(() => {
    if (startValue) {
      startInputValue = format(startValue);
    }
  });

  $effect(() => {
    if (endValue) {
      endInputValue = format(endValue);
    }
  });

  function handleStartFocus() {
    if (!disabled) {
      activeInput = 'start';
      isOpen = true;
      if (startValue) {
        displayMonth = startValue;
      }
    }
  }

  function handleEndFocus() {
    if (!disabled) {
      activeInput = 'end';
      isOpen = true;
      if (endValue) {
        displayMonth = endValue;
      } else if (startValue) {
        displayMonth = startValue;
      }
    }
  }

  function handleBlur(e: FocusEvent) {
    const relatedTarget = e.relatedTarget as Node | null;
    if (relatedTarget && containerRef?.contains(relatedTarget)) {
      return;
    }
    
    // Try to parse and validate start input
    if (activeInput === 'start' && startInputValue) {
      const parsed = parse(startInputValue);
      if (parsed && (!endValue || !isAfter(parsed, endValue))) {
        if (!startValue || !isSameDay(parsed, startValue)) {
          onChange?.({ startValue: parsed, endValue });
        }
      } else {
        startInputValue = startValue ? format(startValue) : '';
      }
    }
    
    // Try to parse and validate end input
    if (activeInput === 'end' && endInputValue) {
      const parsed = parse(endInputValue);
      if (parsed && (!startValue || !isBefore(parsed, startValue))) {
        if (!endValue || !isSameDay(parsed, endValue)) {
          onChange?.({ startValue, endValue: parsed });
        }
      } else {
        endInputValue = endValue ? format(endValue) : '';
      }
    }
    
    setTimeout(() => {
      isOpen = false;
      activeInput = null;
    }, 150);
  }

  function handleStartInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    startInputValue = target.value;
  }

  function handleEndInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    endInputValue = target.value;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      isOpen = false;
      activeInput = null;
    } else if (e.key === 'Tab' && activeInput === 'start') {
      // Let default tab behavior work
    }
  }

  function goToPreviousMonth() {
    displayMonth = addMonths(displayMonth, -1);
  }

  function goToNextMonth() {
    displayMonth = addMonths(displayMonth, 1);
  }

  function selectDate(date: Date) {
    if (isDateDisabled(date)) return;
    
    if (activeInput === 'start') {
      // Selecting start date
      if (endValue && isAfter(date, endValue)) {
        // If start is after end, clear end
        onChange?.({ startValue: date, endValue: undefined });
        endInputValue = '';
      } else {
        onChange?.({ startValue: date, endValue });
      }
      startInputValue = format(date);
      // Move focus to end input
      activeInput = 'end';
      endInputRef?.focus();
    } else if (activeInput === 'end') {
      // Selecting end date
      if (startValue && isBefore(date, startValue)) {
        // If end is before start, set as start and clear end
        onChange?.({ startValue: date, endValue: undefined });
        startInputValue = format(date);
        activeInput = 'start';
        startInputRef?.focus();
      } else {
        onChange?.({ startValue, endValue: date });
        endInputValue = format(date);
        // Close calendar after selecting end
        isOpen = false;
        activeInput = null;
      }
    }
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

  function isDateInRange(date: Date): boolean {
    if (!startValue || !endValue) return false;
    return isAfter(date, startValue) && isBefore(date, endValue);
  }

  function isRangeStart(date: Date): boolean {
    return startValue ? isSameDay(date, startValue) : false;
  }

  function isRangeEnd(date: Date): boolean {
    return endValue ? isSameDay(date, endValue) : false;
  }

  function isDateInCurrentMonth(date: Date): boolean {
    return isSameMonth(date, displayMonth);
  }

  function handleCalendarMouseDown(e: MouseEvent) {
    e.preventDefault();
  }

  const pickerClasses = $derived([
    'garden-date-picker-range',
    isCompact && 'garden-date-picker-range--compact',
    isOpen && 'garden-date-picker-range--open',
    disabled && 'garden-date-picker-range--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  bind:this={containerRef}
  class={pickerClasses}
  data-garden-id="datepickers.date_picker_range"
  {...restProps}
>
  <div class="garden-date-picker-range__inputs">
    <!-- Start input -->
    <div class="garden-date-picker-range__input-wrapper">
      <input
        bind:this={startInputRef}
        type="text"
        class="garden-date-picker-range__input"
        class:garden-date-picker-range__input--active={activeInput === 'start'}
        placeholder={startPlaceholder}
        {disabled}
        value={startInputValue}
        oninput={handleStartInputChange}
        onfocus={handleStartFocus}
        onblur={handleBlur}
        onkeydown={handleKeydown}
        aria-haspopup="dialog"
        autocomplete="off"
      />
    </div>
    
    <span class="garden-date-picker-range__separator" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path d="M10.5 8L6 4v8l4.5-4z"/>
      </svg>
    </span>
    
    <!-- End input -->
    <div class="garden-date-picker-range__input-wrapper">
      <input
        bind:this={endInputRef}
        type="text"
        class="garden-date-picker-range__input"
        class:garden-date-picker-range__input--active={activeInput === 'end'}
        placeholder={endPlaceholder}
        {disabled}
        value={endInputValue}
        oninput={handleEndInputChange}
        onfocus={handleEndFocus}
        onblur={handleBlur}
        onkeydown={handleKeydown}
        aria-haspopup="dialog"
        autocomplete="off"
      />
    </div>
  </div>
  
  {#if isOpen}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <div 
      class="garden-date-picker-range__dropdown"
      role="dialog"
      aria-label="Calendar"
      onmousedown={handleCalendarMouseDown}
    >
      <div class="garden-date-picker-range__calendar">
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
            {@const disabledDate = isDateDisabled(date)}
            {@const rangeStart = isRangeStart(date)}
            {@const rangeEnd = isRangeEnd(date)}
            {@const inRange = isDateInRange(date)}
            {@const today = isToday(date)}
            {@const inMonth = isDateInCurrentMonth(date)}
            
            <button
              type="button"
              class="garden-calendar__day"
              class:garden-calendar__day--today={today}
              class:garden-calendar__day--range-start={rangeStart}
              class:garden-calendar__day--range-end={rangeEnd}
              class:garden-calendar__day--in-range={inRange}
              class:garden-calendar__day--outside={!inMonth}
              class:garden-calendar__day--disabled={disabledDate}
              role="gridcell"
              aria-selected={rangeStart || rangeEnd}
              aria-disabled={disabledDate}
              tabindex={rangeStart || rangeEnd ? 0 : -1}
              onclick={() => selectDate(date)}
            >
              {date.getDate()}
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .garden-date-picker-range {
    position: relative;
    display: inline-flex;
    flex-direction: column;
  }

  /* Inputs container */
  .garden-date-picker-range__inputs {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .garden-date-picker-range__input-wrapper {
    position: relative;
    flex: 1;
  }

  /* Input - using CSS variables for dark mode */
  .garden-date-picker-range__input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    color: var(--garden-color-foreground-default, #2f3941);
    background-color: var(--garden-color-background-default, #fff);
    outline: none;
    transition: border-color 0.1s ease, box-shadow 0.1s ease;
  }

  .garden-date-picker-range--compact .garden-date-picker-range__input {
    height: 32px;
    font-size: 13px;
    padding: 0 8px;
  }

  .garden-date-picker-range__input:focus,
  .garden-date-picker-range__input--active {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow: 0 0 0 3px var(--garden-color-primary-opacity-15, rgba(31, 115, 183, 0.15));
  }

  .garden-date-picker-range__input:disabled {
    background-color: var(--garden-color-background-disabled, #f8f9f9);
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  .garden-date-picker-range__input::placeholder {
    color: var(--garden-color-foreground-subtle, #87929d);
  }

  /* Separator */
  .garden-date-picker-range__separator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    flex-shrink: 0;
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-date-picker-range__separator svg {
    width: 16px;
    height: 16px;
  }

  /* Dropdown */
  .garden-date-picker-range__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    margin-top: 4px;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Calendar */
  .garden-date-picker-range__calendar {
    display: inline-flex;
    flex-direction: column;
    width: 280px;
    padding: 12px;
    background-color: var(--garden-color-background-raised, #fff);
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    box-shadow: 0 20px 28px 0 var(--garden-shadow-large, rgba(4, 68, 77, 0.15));
    font-family: inherit;
    user-select: none;
  }

  .garden-date-picker-range--compact .garden-date-picker-range__calendar {
    width: 240px;
    padding: 8px;
  }

  /* Calendar Header */
  .garden-calendar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .garden-date-picker-range--compact .garden-calendar__header {
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

  .garden-date-picker-range--compact .garden-calendar__nav-button {
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

  .garden-date-picker-range--compact .garden-calendar__weekday {
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
    position: relative;
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

  .garden-date-picker-range--compact .garden-calendar__day {
    height: 28px;
    font-size: 12px;
  }

  .garden-calendar__day:hover:not(.garden-calendar__day--disabled):not(.garden-calendar__day--range-start):not(.garden-calendar__day--range-end) {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
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

  /* Range start & end */
  .garden-calendar__day--range-start,
  .garden-calendar__day--range-end {
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
    color: var(--garden-color-foreground-on-emphasis, #fff);
    font-weight: 600;
  }

  .garden-calendar__day--range-start:hover,
  .garden-calendar__day--range-end:hover {
    background-color: var(--garden-color-background-primary-emphasis-hover, #144a75);
  }

  /* In range */
  .garden-calendar__day--in-range {
    background-color: var(--garden-color-primary-opacity-10, rgba(31, 115, 183, 0.1));
    border-radius: 0;
  }

  .garden-calendar__day--range-start {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .garden-calendar__day--range-end {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .garden-calendar__day--range-start.garden-calendar__day--range-end {
    border-radius: 4px;
  }

  /* Outside month */
  .garden-calendar__day--outside {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  /* Disabled */
  .garden-calendar__day--disabled {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  .garden-calendar__day--disabled:hover {
    background: transparent;
  }

  /* RTL support */
  :global([dir="rtl"]) .garden-date-picker-range__separator svg {
    transform: rotate(180deg);
  }

  :global([dir="rtl"]) .garden-calendar__day--range-start {
    border-radius: 0 4px 4px 0;
  }

  :global([dir="rtl"]) .garden-calendar__day--range-end {
    border-radius: 4px 0 0 4px;
  }
</style>
