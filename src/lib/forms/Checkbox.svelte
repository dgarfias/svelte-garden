<!--
  Svelte Garden - Checkbox Component
  
  Matches React Garden checkbox styling exactly.
  
  @example
  <Checkbox>Remember me</Checkbox>
  
  @example
  <Checkbox indeterminate>Select all</Checkbox>
-->
<script lang="ts">
  import type { CheckboxProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';
  import { useRtl } from '../theming';

  interface Props extends CheckboxProps {
    children?: Snippet;
  }

  let {
    children,
    indeterminate = false,
    validation,
    isCompact = false,
    disabled = false,
    checked = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  let inputElement: HTMLInputElement | undefined = $state();

  // Set indeterminate property (can't be done via attribute)
  $effect(() => {
    if (inputElement) {
      inputElement.indeterminate = indeterminate;
    }
  });

  const fieldContext = getFieldContext();
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;
  const isRtl = useRtl();

  const wrapperClasses = $derived([
    'garden-checkbox',
    isCompact && 'garden-checkbox--compact',
    validation && `garden-checkbox--${validation}`,
    disabled && 'garden-checkbox--disabled',
    isRtl && 'garden-checkbox--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<label class={wrapperClasses} data-garden-id="forms.checkbox">
  <input
    bind:this={inputElement}
    id={inputId}
    type="checkbox"
    class="garden-checkbox__input"
    {disabled}
    {checked}
    aria-invalid={validation === 'error' || validation === 'warning' ? true : undefined}
    {...restProps}
  />
  <span class="garden-checkbox__box">
    {#if indeterminate}
      <!-- Dash icon for indeterminate - matches @zendeskgarden/svg-icons 12/dash-fill -->
      <svg class="garden-checkbox__icon" viewBox="0 0 12 12" aria-hidden="true">
        <path fill="currentColor" d="M10 5H2a1 1 0 000 2h8a1 1 0 000-2z"/>
      </svg>
    {:else}
      <!-- Checkmark icon - matches @zendeskgarden/svg-icons 12/check-sm-fill -->
      <svg class="garden-checkbox__icon" viewBox="0 0 12 12" aria-hidden="true">
        <path fill="currentColor" d="M10.28 2.72a.75.75 0 01.04 1.02l-.04.04-5.25 5.25a.75.75 0 01-1.02.04l-.04-.04-2.25-2.25a.75.75 0 011.02-1.1l.04.04L4.5 7.44l4.72-4.72a.75.75 0 011.06 0z"/>
      </svg>
    {/if}
  </span>
  {#if children}
    <span class="garden-checkbox__label">
      {@render children()}
    </span>
  {/if}
</label>

<style>
  .garden-checkbox {
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    position: relative;
  }

  .garden-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 16px;
    height: 16px;
    margin: 0;
  }

  .garden-checkbox__box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px; /* Align with text baseline */
    border: 1px solid var(--garden-color-border-emphasis, #68737d);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    box-sizing: border-box;
    transition:
      border-color 0.25s ease-in-out,
      background-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  .garden-checkbox__icon {
    width: 12px;
    height: 12px;
    color: var(--garden-color-foreground-on-emphasis, #fff);
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
  }

  .garden-checkbox__label {
    margin-left: 8px;
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* ===========================================
   * STATES
   * =========================================== */

  /* Hover (unchecked) */
  .garden-checkbox:hover:not(.garden-checkbox--disabled) .garden-checkbox__input:not(:checked):not(:indeterminate) + .garden-checkbox__box {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-primary-opacity-10, rgba(31, 115, 183, 0.1));
  }

  /* Active (unchecked) */
  .garden-checkbox:active:not(.garden-checkbox--disabled) .garden-checkbox__input:not(:checked):not(:indeterminate) + .garden-checkbox__box {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-primary-opacity-20, rgba(31, 115, 183, 0.2));
  }

  /* Checked */
  .garden-checkbox__input:checked + .garden-checkbox__box,
  .garden-checkbox__input:indeterminate + .garden-checkbox__box {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
  }

  .garden-checkbox__input:checked + .garden-checkbox__box .garden-checkbox__icon,
  .garden-checkbox__input:indeterminate + .garden-checkbox__box .garden-checkbox__icon {
    opacity: 1;
  }

  /* Checked + Hover */
  .garden-checkbox:hover:not(.garden-checkbox--disabled) .garden-checkbox__input:checked + .garden-checkbox__box,
  .garden-checkbox:hover:not(.garden-checkbox--disabled) .garden-checkbox__input:indeterminate + .garden-checkbox__box {
    border-color: var(--garden-color-background-primary-emphasis-hover, #3091ec);
    background-color: var(--garden-color-background-primary-emphasis-hover, #3091ec);
  }

  /* Checked + Active */
  .garden-checkbox:active:not(.garden-checkbox--disabled) .garden-checkbox__input:checked + .garden-checkbox__box,
  .garden-checkbox:active:not(.garden-checkbox--disabled) .garden-checkbox__input:indeterminate + .garden-checkbox__box {
    border-color: var(--garden-color-background-primary-emphasis-active, #144a75);
    background-color: var(--garden-color-background-primary-emphasis-active, #144a75);
  }

  /* Focus */
  .garden-checkbox__input:focus-visible + .garden-checkbox__box {
    outline: 2px solid transparent;
    outline-offset: 1px;
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Disabled */
  .garden-checkbox--disabled {
    cursor: default;
  }

  .garden-checkbox--disabled .garden-checkbox__box {
    border-color: transparent;
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
  }

  .garden-checkbox--disabled .garden-checkbox__input:checked + .garden-checkbox__box,
  .garden-checkbox--disabled .garden-checkbox__input:indeterminate + .garden-checkbox__box {
    border-color: transparent;
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.24));
  }

  .garden-checkbox--disabled .garden-checkbox__icon {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  .garden-checkbox--disabled .garden-checkbox__label {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  /* ===========================================
   * VALIDATION STATES
   * =========================================== */

  .garden-checkbox--error .garden-checkbox__box {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-checkbox--error .garden-checkbox__input:checked + .garden-checkbox__box,
  .garden-checkbox--error .garden-checkbox__input:indeterminate + .garden-checkbox__box {
    border-color: var(--garden-color-background-danger-emphasis, #cc3340);
    background-color: var(--garden-color-background-danger-emphasis, #cc3340);
  }

  .garden-checkbox--warning .garden-checkbox__box {
    border-color: var(--garden-color-border-warning-emphasis, #c25b0a);
  }

  .garden-checkbox--warning .garden-checkbox__input:checked + .garden-checkbox__box,
  .garden-checkbox--warning .garden-checkbox__input:indeterminate + .garden-checkbox__box {
    border-color: var(--garden-color-background-warning-emphasis, #c25b0a);
    background-color: var(--garden-color-background-warning-emphasis, #c25b0a);
  }

  .garden-checkbox--success .garden-checkbox__box {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-checkbox--success .garden-checkbox__input:checked + .garden-checkbox__box,
  .garden-checkbox--success .garden-checkbox__input:indeterminate + .garden-checkbox__box {
    border-color: var(--garden-color-background-success-emphasis, #038153);
    background-color: var(--garden-color-background-success-emphasis, #038153);
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  .garden-checkbox--rtl .garden-checkbox__label {
    margin-left: 0;
    margin-right: 8px;
  }
</style>
