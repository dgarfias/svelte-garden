<!--
  Svelte Garden - Toggle Component (Switch)
  
  A toggle switch that matches React Garden styling.
  Uses an SVG circle icon for the knob like React.
  
  @example
  <Toggle>Enable notifications</Toggle>
  
  @example
  <Toggle checked>Dark mode</Toggle>
-->
<script lang="ts">
  import type { ToggleProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';
  import { useRtl } from '../theming';

  interface Props extends ToggleProps {
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
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;
  const isRtl = useRtl();

  const wrapperClasses = $derived([
    'garden-toggle',
    isCompact && 'garden-toggle--compact',
    validation && `garden-toggle--${validation}`,
    disabled && 'garden-toggle--disabled',
    isRtl && 'garden-toggle--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<label class={wrapperClasses} data-garden-id="forms.toggle">
  <input
    id={inputId}
    type="checkbox"
    role="switch"
    class="garden-toggle__input"
    {disabled}
    {checked}
    aria-invalid={validation === 'error' || validation === 'warning' ? true : undefined}
    {...restProps}
  />
  <span class="garden-toggle__track">
    <svg class="garden-toggle__icon" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="currentColor"/>
    </svg>
  </span>
  {#if children}
    <span class="garden-toggle__label">
      {@render children()}
    </span>
  {/if}
</label>

<style>
  .garden-toggle {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .garden-toggle__input {
    position: absolute;
    opacity: 0;
    width: 40px;
    height: 20px;
    margin: 0;
  }

  .garden-toggle__track {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 40px;
    height: 20px;
    border-radius: 100px;
    background-color: var(--garden-color-background-emphasis, #68737d);
    transition:
      background-color 0.15s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  .garden-toggle__icon {
    width: 16px;
    height: 16px;
    color: var(--garden-color-foreground-on-emphasis, #fff);
    transform: translateX(2px);
    transition: transform 0.15s ease-in-out;
  }

  .garden-toggle__label {
    margin-left: 8px;
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* RTL: flip label margin and icon direction */
  .garden-toggle--rtl .garden-toggle__label {
    margin-left: 0;
    margin-right: 8px;
  }

  .garden-toggle--rtl .garden-toggle__icon {
    transform: translateX(22px);
  }

  .garden-toggle--rtl .garden-toggle__input:checked + .garden-toggle__track .garden-toggle__icon {
    transform: translateX(2px);
  }

  /* ===========================================
   * STATES
   * =========================================== */

  /* Hover (unchecked) */
  .garden-toggle:hover:not(.garden-toggle--disabled) .garden-toggle__input:not(:checked) + .garden-toggle__track {
    background-color: var(--garden-color-background-emphasis-hover, #5c6970);
  }

  /* Active (unchecked) */
  .garden-toggle:active:not(.garden-toggle--disabled) .garden-toggle__input:not(:checked) + .garden-toggle__track {
    background-color: var(--garden-color-background-emphasis-active, #49545c);
  }

  /* Checked */
  .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
  }

  .garden-toggle__input:checked + .garden-toggle__track .garden-toggle__icon {
    transform: translateX(22px);
  }

  /* Checked + Hover */
  .garden-toggle:hover:not(.garden-toggle--disabled) .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-color-background-primary-emphasis-hover, #3091ec);
  }

  /* Checked + Active */
  .garden-toggle:active:not(.garden-toggle--disabled) .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-color-background-primary-emphasis-active, #144a75);
  }

  /* Focus */
  .garden-toggle__input:focus-visible + .garden-toggle__track {
    outline: 2px solid transparent;
    outline-offset: 1px;
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Disabled */
  .garden-toggle--disabled {
    cursor: default;
  }

  .garden-toggle--disabled .garden-toggle__track {
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
  }

  .garden-toggle--disabled .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.16));
  }

  .garden-toggle--disabled .garden-toggle__icon {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  .garden-toggle--disabled .garden-toggle__label {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  /* ===========================================
   * VALIDATION STATES
   * =========================================== */

  .garden-toggle--error .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-color-background-danger-emphasis, #cc3340);
  }

  .garden-toggle--error:hover:not(.garden-toggle--disabled) .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-palette-red-600, #e34f32);
  }

  .garden-toggle--warning .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-color-background-warning-emphasis, #c25b0a);
  }

  .garden-toggle--warning:hover:not(.garden-toggle--disabled) .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-palette-yellow-600, #d97b06);
  }

  .garden-toggle--success .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-color-background-success-emphasis, #038153);
  }

  .garden-toggle--success:hover:not(.garden-toggle--disabled) .garden-toggle__input:checked + .garden-toggle__track {
    background-color: var(--garden-palette-green-600, #0b9f6b);
  }
</style>
