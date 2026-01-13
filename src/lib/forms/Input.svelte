<!--
  Svelte Garden - Input Component
  
  A text input field with Garden styling.
  
  @example
  <Input placeholder="Enter text" />
  
  @example
  <Input validation="error" />
-->
<script lang="ts">
  import type { InputProps } from './types';
  import { getFieldContext } from './context';

  let {
    validation,
    isCompact = false,
    isBare = false,
    focusInset = false,
    disabled = false,
    readonly = false,
    class: className = '',
    ...restProps
  }: InputProps = $props();

  const fieldContext = getFieldContext();
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;
  
  // Build aria-describedby from context
  const ariaDescribedBy = $derived(() => {
    if (!fieldContext) return undefined;
    const ids: string[] = [];
    if (fieldContext.hasHint) ids.push(fieldContext.hintId);
    if (fieldContext.hasMessage) ids.push(fieldContext.messageId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  });

  const inputClasses = $derived([
    'garden-input',
    isCompact && 'garden-input--compact',
    isBare && 'garden-input--bare',
    focusInset && 'garden-input--focus-inset',
    validation && `garden-input--${validation}`,
    disabled && 'garden-input--disabled',
    readonly && 'garden-input--readonly',
    className
  ].filter(Boolean).join(' '));
</script>

<input
  id={inputId}
  class={inputClasses}
  {disabled}
  {readonly}
  aria-describedby={ariaDescribedBy()}
  aria-invalid={validation === 'error' || validation === 'warning' ? true : undefined}
  data-garden-id="forms.input"
  {...restProps}
/>

<style>
  .garden-input {
    /* Layout */
    display: block;
    box-sizing: border-box;
    width: 100%;
    
    /* Medium size (default): height = 40px */
    height: 40px;
    padding: 9px 12px; /* (40 - 20 - 2) / 2 = 9px vertical, 3 * 4px horizontal */
    
    /* Typography */
    font-family: inherit;
    font-size: 14px;
    line-height: 20px;
    
    /* Appearance */
    border: 1px solid var(--garden-color-border-default, #c2c8cc);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    color: var(--garden-color-foreground-default, #2f3941);
    outline-color: transparent;
    
    /* Transitions */
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out,
      background-color 0.25s ease-in-out,
      color 0.25s ease-in-out,
      z-index 0.25s ease-in-out;
  }

  .garden-input::placeholder {
    color: var(--garden-color-foreground-subtle, #68737d);
    opacity: 1;
  }

  /* ===========================================
   * COMPACT SIZE
   * =========================================== */
  
  .garden-input--compact {
    height: 32px;
    padding: 6px 12px; /* base * 1.5 = 6px vertical */
  }

  /* ===========================================
   * BARE VARIANT (no border/background)
   * =========================================== */
  
  .garden-input--bare {
    border-color: transparent;
    background-color: transparent;
    border-radius: 0;
  }

  /* ===========================================
   * STATES
   * =========================================== */

  /* Hover */
  .garden-input:hover:not(:disabled):not(:focus):not(.garden-input--bare) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Focus */
  .garden-input:focus {
    outline: none;
  }

  .garden-input:focus-visible:not(.garden-input--bare) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-input--focus-inset:focus-visible:not(.garden-input--bare) {
    box-shadow:
      inset 0 0 0 2px var(--garden-color-background-default, #fff),
      inset 0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Readonly */
  .garden-input--readonly,
  .garden-input:read-only:not(.garden-input--bare) {
    background-color: var(--garden-color-background-subtle, rgba(0, 0, 0, 0.04));
  }

  /* Disabled */
  .garden-input:disabled,
  .garden-input--disabled {
    border-color: var(--garden-color-border-disabled, #d8dcde);
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: default;
  }

  /* ===========================================
   * VALIDATION STATES
   * =========================================== */

  /* Success */
  .garden-input--success {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-input--success:hover:not(:disabled):not(:focus) {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-input--success:focus-visible {
    border-color: var(--garden-color-border-success-emphasis, #038153);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-success-emphasis, #038153);
  }

  /* Warning */
  .garden-input--warning {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-input--warning:hover:not(:disabled):not(:focus) {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-input--warning:focus-visible {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  /* Error */
  .garden-input--error {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-input--error:hover:not(:disabled):not(:focus) {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-input--error:focus-visible {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-danger-emphasis, #cc3340);
  }
</style>
