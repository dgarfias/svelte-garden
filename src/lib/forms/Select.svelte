<!--
  Svelte Garden - Select Component
-->
<script lang="ts">
  import type { SelectProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';
  import { useRtl } from '../theming';
  import { ChevronDownStroke } from '../icons';

  interface Props extends SelectProps {
    children?: Snippet;
  }

  let {
    children,
    validation,
    isCompact = false,
    isBare = false,
    focusInset = false,
    disabled = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  const fieldContext = getFieldContext();
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;
  const isRtl = useRtl();

  const selectClasses = $derived([
    'garden-select',
    isCompact && 'garden-select--compact',
    isBare && 'garden-select--bare',
    focusInset && 'garden-select--focus-inset',
    validation && `garden-select--${validation}`,
    disabled && 'garden-select--disabled',
    isRtl && 'garden-select--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<div class="garden-select-wrapper {selectClasses}">
  <select
    id={inputId}
    class="garden-select__input"
    {disabled}
    aria-invalid={validation === 'error' || validation === 'warning' ? true : undefined}
    data-garden-id="forms.select"
    {...restProps}
  >
    {#if children}
      {@render children()}
    {/if}
  </select>
  <ChevronDownStroke class="garden-select__icon" />
</div>

<style>
  .garden-select-wrapper {
    position: relative;
    display: block;
  }

  .garden-select__input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 9px 36px 9px 12px;
    font-family: inherit;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid var(--garden-color-border-default, #c2c8cc);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    color: var(--garden-color-foreground-default, #2f3941);
    outline-color: transparent;
    cursor: pointer;
    appearance: none;
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out,
      background-color 0.25s ease-in-out;
  }

  :global(.garden-select__icon) {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-select--compact .garden-select__input {
    height: 32px;
    padding: 5px 36px 5px 12px;
  }

  .garden-select--compact :global(.garden-select__icon) {
    right: 8px;
  }

  /* RTL: flip padding and icon position */
  .garden-select--rtl .garden-select__input {
    padding: 9px 12px 9px 36px;
  }

  .garden-select--rtl :global(.garden-select__icon) {
    right: auto;
    left: 12px;
  }

  .garden-select--rtl.garden-select--compact .garden-select__input {
    padding: 5px 12px 5px 36px;
  }

  .garden-select--rtl.garden-select--compact :global(.garden-select__icon) {
    left: 8px;
  }

  .garden-select--bare .garden-select__input {
    border-color: transparent;
    background-color: transparent;
    border-radius: 0;
  }

  .garden-select__input:hover:not(:disabled):not(:focus) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-select__input:focus {
    outline: none;
  }

  .garden-select__input:focus-visible {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-select--focus-inset .garden-select__input:focus-visible {
    box-shadow:
      inset 0 0 0 2px var(--garden-color-background-default, #fff),
      inset 0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-select__input:disabled {
    border-color: var(--garden-color-border-disabled, #d8dcde);
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: default;
  }

  .garden-select--success .garden-select__input {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-select--warning .garden-select__input {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-select--error .garden-select__input {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }
</style>
