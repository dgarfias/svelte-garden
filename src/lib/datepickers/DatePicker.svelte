<!--
  Svelte Garden - DatePicker Component
  
  A date picker with input field and dropdown calendar.
  Uses CSS variables for dark mode support.
-->
<script lang="ts">
  import type { DatePickerProps, WeekStartsOn } from './types';
  import type { Snippet } from 'svelte';
  import { formatDate as defaultFormatDate, parseDate as defaultParseDate, getLocaleWeekStartsOn } from './utils';
  import Calendar from './Calendar.svelte';
  import { CalendarStroke } from '../icons';

  interface Props extends DatePickerProps {
    children?: Snippet;
    onChange?: (date: Date) => void;
  }

  let {
    children,
    class: className = '',
    value,
    placeholder = 'Select date',
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
  let isOpen = $state(false);
  let inputValue = $state('');
  let inputRef: HTMLInputElement;
  let containerRef: HTMLDivElement;

  // Format function - use derived to track prop changes
  const format = $derived(formatDate ?? ((d: Date) => defaultFormatDate(d, locale)));
  const parse = $derived(parseDate ?? ((v: string) => defaultParseDate(v, locale)));

  // Effective week starts on
  const effectiveWeekStartsOn = $derived<WeekStartsOn>(weekStartsOn ?? getLocaleWeekStartsOn(locale));

  // Update input value when value changes
  $effect(() => {
    if (value) {
      inputValue = format(value);
    } else {
      inputValue = '';
    }
  });

  function handleInputFocus() {
    if (!disabled) {
      isOpen = true;
    }
  }

  function handleInputBlur(e: FocusEvent) {
    // Don't close if clicking within the calendar
    const relatedTarget = e.relatedTarget as Node | null;
    if (relatedTarget && containerRef?.contains(relatedTarget)) {
      return;
    }
    
    // Try to parse the input value
    if (inputValue) {
      const parsed = parse(inputValue);
      if (parsed) {
        onChange?.(parsed);
      } else {
        // Reset to previous value
        inputValue = value ? format(value) : '';
      }
    }
    
    // Delay close to allow calendar clicks to process
    setTimeout(() => {
      isOpen = false;
    }, 150);
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    inputValue = target.value;
  }

  function handleInputKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      isOpen = false;
      inputRef?.blur();
    } else if (e.key === 'Enter') {
      const parsed = parse(inputValue);
      if (parsed) {
        onChange?.(parsed);
        isOpen = false;
      }
    } else if (e.key === 'ArrowDown' && !isOpen) {
      isOpen = true;
    }
  }

  function handleCalendarChange(date: Date) {
    onChange?.(date);
    inputValue = format(date);
    isOpen = false;
    inputRef?.focus();
  }

  function handleCalendarMouseDown(e: MouseEvent) {
    // Prevent input blur when clicking calendar
    e.preventDefault();
  }

  const pickerClasses = $derived([
    'garden-date-picker',
    isCompact && 'garden-date-picker--compact',
    isOpen && 'garden-date-picker--open',
    disabled && 'garden-date-picker--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  bind:this={containerRef}
  class={pickerClasses}
  data-garden-id="datepickers.date_picker"
  {...restProps}
>
  <div class="garden-date-picker__input-wrapper">
    <input
      bind:this={inputRef}
      type="text"
      class="garden-date-picker__input"
      role="combobox"
      {placeholder}
      {disabled}
      value={inputValue}
      oninput={handleInputChange}
      onfocus={handleInputFocus}
      onblur={handleInputBlur}
      onkeydown={handleInputKeydown}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={isOpen ? 'date-picker-calendar' : undefined}
      autocomplete="off"
    />
    <button
      type="button"
      class="garden-date-picker__icon-button"
      tabindex="-1"
      aria-label="Open calendar"
      {disabled}
      onclick={() => { if (!disabled) { isOpen = !isOpen; inputRef?.focus(); } }}
    >
      <CalendarStroke />
    </button>
  </div>
  
  {#if isOpen}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <div 
      id="date-picker-calendar"
      class="garden-date-picker__dropdown"
      role="dialog"
      aria-label="Calendar"
      onmousedown={handleCalendarMouseDown}
    >
      <Calendar
        {value}
        {minValue}
        {maxValue}
        {isCompact}
        {locale}
        weekStartsOn={effectiveWeekStartsOn}
        onChange={handleCalendarChange}
      />
    </div>
  {/if}
</div>

<style>
  .garden-date-picker {
    position: relative;
    display: inline-block;
    width: 220px;
  }

  .garden-date-picker--compact {
    width: 180px;
  }

  /* Input wrapper */
  .garden-date-picker__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  /* Input - using CSS variables for dark mode */
  .garden-date-picker__input {
    width: 100%;
    height: 40px;
    padding: 0 40px 0 12px;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    color: var(--garden-color-foreground-default, #2f3941);
    background-color: var(--garden-color-background-default, #fff);
    outline: none;
    transition: border-color 0.1s ease, box-shadow 0.1s ease;
  }

  .garden-date-picker--compact .garden-date-picker__input {
    height: 32px;
    font-size: 13px;
    padding: 0 36px 0 8px;
  }

  .garden-date-picker__input:focus {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow: 0 0 0 3px var(--garden-color-primary-opacity-15, rgba(31, 115, 183, 0.15));
  }

  .garden-date-picker__input:disabled {
    background-color: var(--garden-color-background-disabled, #f8f9f9);
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  .garden-date-picker__input::placeholder {
    color: var(--garden-color-foreground-subtle, #87929d);
  }

  /* Icon button */
  .garden-date-picker__icon-button {
    position: absolute;
    right: 4px;
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
    transition: color 0.1s ease;
  }

  .garden-date-picker--compact .garden-date-picker__icon-button {
    width: 28px;
    height: 28px;
    right: 2px;
  }

  .garden-date-picker__icon-button:hover:not(:disabled) {
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-date-picker__icon-button:disabled {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  .garden-date-picker__icon-button :global(svg) {
    width: 16px;
    height: 16px;
  }

  /* Dropdown */
  .garden-date-picker__dropdown {
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

  /* Remove calendar border when inside picker */
  .garden-date-picker__dropdown :global(.garden-calendar) {
    box-shadow: 0 20px 28px 0 var(--garden-shadow-large, rgba(4, 68, 77, 0.15));
  }
</style>
