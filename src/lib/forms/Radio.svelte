<!--
  Svelte Garden - Radio Component
  
  Matches React Garden radio button styling.
-->
<script lang="ts">
  import type { RadioProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';
  import { useRtl } from '../theming';

  interface Props extends RadioProps {
    children?: Snippet;
  }

  let {
    children,
    validation,
    isCompact = false,
    disabled = false,
    checked = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  const fieldContext = getFieldContext();
  const isRtl = useRtl();

  const wrapperClasses = $derived([
    'garden-radio',
    isCompact && 'garden-radio--compact',
    validation && `garden-radio--${validation}`,
    disabled && 'garden-radio--disabled',
    isRtl && 'garden-radio--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<label class={wrapperClasses} data-garden-id="forms.radio">
  <input
    type="radio"
    class="garden-radio__input"
    {disabled}
    {checked}
    {...restProps}
  />
  <span class="garden-radio__circle">
    <!-- Inner dot using SVG circle like React -->
    <svg class="garden-radio__icon" viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="3" fill="currentColor"/>
    </svg>
  </span>
  {#if children}
    <span class="garden-radio__label">
      {@render children()}
    </span>
  {/if}
</label>

<style>
  .garden-radio {
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    position: relative;
  }

  .garden-radio__input {
    position: absolute;
    opacity: 0;
    width: 16px;
    height: 16px;
    margin: 0;
  }

  .garden-radio__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px; /* Align with text baseline */
    border: 1px solid var(--garden-color-border-emphasis, #68737d);
    border-radius: 50%;
    background-color: var(--garden-color-background-default, #fff);
    box-sizing: border-box;
    transition:
      border-color 0.25s ease-in-out,
      background-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  .garden-radio__icon {
    width: 12px;
    height: 12px;
    color: var(--garden-color-foreground-on-emphasis, #fff);
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
  }

  .garden-radio__label {
    margin-left: 8px;
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* Hover (unchecked) */
  .garden-radio:hover:not(.garden-radio--disabled) .garden-radio__input:not(:checked) + .garden-radio__circle {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-primary-opacity-10, rgba(31, 115, 183, 0.1));
  }

  /* Active (unchecked) */
  .garden-radio:active:not(.garden-radio--disabled) .garden-radio__input:not(:checked) + .garden-radio__circle {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-primary-opacity-20, rgba(31, 115, 183, 0.2));
  }

  /* Checked */
  .garden-radio__input:checked + .garden-radio__circle {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
  }

  .garden-radio__input:checked + .garden-radio__circle .garden-radio__icon {
    opacity: 1;
  }

  /* Checked + Hover */
  .garden-radio:hover:not(.garden-radio--disabled) .garden-radio__input:checked + .garden-radio__circle {
    border-color: var(--garden-color-background-primary-emphasis-hover, #3091ec);
    background-color: var(--garden-color-background-primary-emphasis-hover, #3091ec);
  }

  /* Checked + Active */
  .garden-radio:active:not(.garden-radio--disabled) .garden-radio__input:checked + .garden-radio__circle {
    border-color: var(--garden-color-background-primary-emphasis-active, #144a75);
    background-color: var(--garden-color-background-primary-emphasis-active, #144a75);
  }

  /* Focus */
  .garden-radio__input:focus-visible + .garden-radio__circle {
    outline: 2px solid transparent;
    outline-offset: 1px;
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Disabled */
  .garden-radio--disabled {
    cursor: default;
  }

  .garden-radio--disabled .garden-radio__circle {
    border-color: transparent;
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
  }

  .garden-radio--disabled .garden-radio__input:checked + .garden-radio__circle {
    border-color: transparent;
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.24));
  }

  .garden-radio--disabled .garden-radio__icon {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  .garden-radio--disabled .garden-radio__label {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  /* Validation */
  .garden-radio--error .garden-radio__circle {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-radio--error .garden-radio__input:checked + .garden-radio__circle {
    border-color: var(--garden-color-background-danger-emphasis, #cc3340);
    background-color: var(--garden-color-background-danger-emphasis, #cc3340);
  }

  .garden-radio--warning .garden-radio__circle {
    border-color: var(--garden-color-border-warning-emphasis, #c25b0a);
  }

  .garden-radio--warning .garden-radio__input:checked + .garden-radio__circle {
    border-color: var(--garden-color-background-warning-emphasis, #c25b0a);
    background-color: var(--garden-color-background-warning-emphasis, #c25b0a);
  }

  .garden-radio--success .garden-radio__circle {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-radio--success .garden-radio__input:checked + .garden-radio__circle {
    border-color: var(--garden-color-background-success-emphasis, #038153);
    background-color: var(--garden-color-background-success-emphasis, #038153);
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  .garden-radio--rtl .garden-radio__label {
    margin-left: 0;
    margin-right: 8px;
  }
</style>
