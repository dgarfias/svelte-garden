<!--
  Svelte Garden - IconButton Component
  
  A button designed for containing only an icon.
  
  @example
  <IconButton aria-label="Settings">
    <SettingsIcon />
  </IconButton>
  
  @example
  <IconButton isPrimary aria-label="Add">
    <PlusIcon />
  </IconButton>
-->
<script lang="ts">
  import type { IconButtonProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends IconButtonProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isDanger = false,
    size = 'medium',
    isNeutral = false,
    isPrimary = false,
    isBasic = true,  // React default is true
    isPill = true,   // React default is true
    focusInset = false,
    isRotated = false,
    disabled = false,
    type = 'button',
    ...restProps
  }: Props = $props();

  const buttonClasses = $derived([
    'garden-icon-button',
    `garden-icon-button--${size}`,
    isDanger && 'garden-icon-button--danger',
    isPrimary && 'garden-icon-button--primary',
    isNeutral && 'garden-icon-button--neutral',
    isBasic && 'garden-icon-button--basic',
    isPill && 'garden-icon-button--pill',
    focusInset && 'garden-icon-button--focus-inset',
    isRotated && 'garden-icon-button--rotated',
    disabled && 'garden-icon-button--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<button
  class={buttonClasses}
  {disabled}
  {type}
  data-garden-id="buttons.icon_button"
  {...restProps}
>
  {#if children}
    <span class="garden-icon-button__icon">
      {@render children()}
    </span>
  {/if}
</button>

<style>
  .garden-icon-button {
    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    
    /* Sizing - medium (default) */
    width: calc(var(--garden-space-base, 4px) * 10);
    height: calc(var(--garden-space-base, 4px) * 10);
    padding: 0;
    
    /* Appearance */
    margin: 0;
    border: 1px solid transparent;
    border-radius: var(--garden-border-radius-md, 4px);
    background-color: transparent;
    color: var(--garden-color-foreground-primary, #1f73b7);
    cursor: pointer;
    
    /* Transitions */
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out,
      background-color 0.25s ease-in-out,
      color 0.25s ease-in-out,
      outline-color 0.1s ease-in-out,
      z-index 0.25s ease-in-out;
    
    outline-color: transparent;
  }

  .garden-icon-button__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--garden-icon-size-md, 16px);
    height: var(--garden-icon-size-md, 16px);
    transition: transform 0.25s ease-in-out;
  }

  .garden-icon-button__icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  /* Size variants */
  .garden-icon-button--small {
    width: calc(var(--garden-space-base, 4px) * 8);
    height: calc(var(--garden-space-base, 4px) * 8);
  }

  .garden-icon-button--small .garden-icon-button__icon {
    width: var(--garden-icon-size-sm, 12px);
    height: var(--garden-icon-size-sm, 12px);
  }

  .garden-icon-button--large {
    width: calc(var(--garden-space-base, 4px) * 12);
    height: calc(var(--garden-space-base, 4px) * 12);
  }

  /* Default (non-primary) has visible border */
  .garden-icon-button:not(.garden-icon-button--primary):not(.garden-icon-button--basic) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Primary variant */
  .garden-icon-button--primary {
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
    color: var(--garden-color-foreground-on-emphasis, #fff);
  }

  .garden-icon-button--primary:hover:not(:disabled) {
    background-color: var(--garden-color-background-primary-emphasis-hover, #3091ec);
  }

  /* Neutral variant */
  .garden-icon-button--neutral.garden-icon-button--primary {
    background-color: var(--garden-color-background-emphasis, #5c6970);
  }

  .garden-icon-button--neutral:not(.garden-icon-button--primary) {
    border-color: var(--garden-color-border-default, #d8dcde);
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* Danger variant */
  .garden-icon-button--danger.garden-icon-button--primary {
    background-color: var(--garden-color-background-danger-emphasis, #cc3340);
  }

  .garden-icon-button--danger:not(.garden-icon-button--primary) {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* Basic variant */
  .garden-icon-button--basic {
    border-color: transparent;
  }

  .garden-icon-button--basic:not(.garden-icon-button--primary):hover:not(:disabled) {
    background-color: var(--garden-color-primary-opacity-08, rgba(31, 115, 183, 0.08));
  }

  /* Pill variant */
  .garden-icon-button--pill {
    border-radius: 50%;
  }

  /* Rotated state */
  .garden-icon-button--rotated .garden-icon-button__icon {
    transform: rotate(180deg);
  }

  /* Hover state */
  .garden-icon-button:not(.garden-icon-button--primary):not(.garden-icon-button--basic):hover:not(:disabled) {
    border-color: var(--_garden-hover-border, #3091ec);
    background-color: var(--_garden-hover-bg, rgba(31, 115, 183, 0.08));
  }

  /* Focus state */
  .garden-icon-button:focus {
    outline: none;
  }

  .garden-icon-button:focus-visible {
    outline: 1px solid transparent;
    outline-offset: 1px;
    box-shadow: 
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-icon-button--focus-inset:focus-visible {
    box-shadow: 
      inset 0 0 0 2px var(--garden-color-background-default, #fff),
      inset 0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Disabled state */
  .garden-icon-button:disabled,
  .garden-icon-button--disabled {
    cursor: default;
    border-color: transparent;
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  /* Pressed/toggle state (for ToggleIconButton) */
  .garden-icon-button:active:not(:disabled),
  .garden-icon-button[aria-pressed='true'],
  .garden-icon-button[aria-pressed='mixed'] {
    background-color: var(--_garden-toggle-pressed-bg, rgba(31, 115, 183, 0.16));
  }

  .garden-icon-button--danger:not(.garden-icon-button--primary):active:not(:disabled),
  .garden-icon-button--danger:not(.garden-icon-button--primary)[aria-pressed='true'],
  .garden-icon-button--danger:not(.garden-icon-button--primary)[aria-pressed='mixed'] {
    background-color: var(--_garden-toggle-danger-pressed-bg, rgba(204, 51, 64, 0.16));
  }

  .garden-icon-button::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
</style>
