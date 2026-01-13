<!--
  Svelte Garden - Button Component
  
  A versatile button component with multiple style variants.
  Pixel-perfect implementation matching Zendesk Garden.
  
  @example
  <Button>Default Button</Button>
  
  @example
  <Button isPrimary>Primary Button</Button>
  
  @example
  <Button isDanger isPrimary>Danger Button</Button>
-->
<script lang="ts">
  import type { ButtonProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends ButtonProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isDanger = false,
    size = 'medium',
    isStretched = false,
    isNeutral = false,
    isPrimary = false,
    isBasic = false,
    isLink = false,
    isPill = false,
    focusInset = false,
    disabled = false,
    type = 'button',
    ...restProps
  }: Props = $props();

  const buttonClasses = $derived([
    'garden-btn',
    `garden-btn--${size}`,
    isDanger && 'garden-btn--danger',
    isPrimary && 'garden-btn--primary',
    isNeutral && 'garden-btn--neutral',
    isBasic && 'garden-btn--basic',
    isLink && 'garden-btn--link',
    isPill && 'garden-btn--pill',
    isStretched && 'garden-btn--stretched',
    focusInset && 'garden-btn--focus-inset',
    disabled && 'garden-btn--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<button
  class={buttonClasses}
  {disabled}
  {type}
  data-garden-id="buttons.button"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</button>

<style>
  /* ===========================================
   * GARDEN BUTTON - PIXEL PERFECT
   * Base unit: 4px
   * Uses CSS variables for dark mode support
   * =========================================== */
  
  .garden-btn {
    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    
    /* Reset */
    margin: 0;
    font-family: inherit;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-touch-callout: none;
    
    /* Medium size (default): height = 40px (10 * 4px) */
    height: 40px;
    padding: 0 calc(1em - 1px); /* padding adjusted for border */
    
    /* Typography */
    font-size: 14px;
    font-weight: 400;
    line-height: 38px; /* height - 2px border */
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    /* Appearance */
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    outline-color: transparent;
    
    /* Default (non-primary) button colors - using CSS vars with fallbacks */
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    color: var(--garden-color-foreground-primary, #1f73b7);
    
    /* Transitions */
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out,
      background-color 0.25s ease-in-out,
      color 0.25s ease-in-out,
      outline-color 0.1s ease-in-out,
      z-index 0.25s ease-in-out;
  }

  /* ===========================================
   * SIZE VARIANTS
   * =========================================== */
  
  .garden-btn--small {
    height: 32px; /* 8 * 4px */
    padding: 0 calc(0.857em - 1px); /* 12px at 14px = ~0.857em, minus border */
    font-size: 12px;
    line-height: 30px;
  }

  .garden-btn--large {
    height: 48px; /* 12 * 4px */
    padding: 0 calc(1.428em - 1px); /* 20px at 14px */
    line-height: 46px;
  }

  /* ===========================================
   * PRIMARY BUTTON
   * =========================================== */

  .garden-btn--primary {
    border-color: transparent;
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
    color: var(--garden-color-foreground-on-emphasis, #fff);
  }

  .garden-btn--primary:hover:not(:disabled) {
    background-color: var(--garden-color-background-primary-emphasis-hover, #3091ec);
  }

  .garden-btn--primary:active:not(:disabled),
  .garden-btn--primary[aria-pressed='true'],
  .garden-btn--primary[aria-pressed='mixed'] {
    background-color: var(--garden-color-background-primary-emphasis-active, #144a75);
  }

  /* Primary + Danger */
  .garden-btn--primary.garden-btn--danger {
    background-color: var(--garden-color-background-danger-emphasis, #cc3340);
  }

  .garden-btn--primary.garden-btn--danger:hover:not(:disabled) {
    background-color: var(--garden-color-background-danger-emphasis-hover, #e35b5d);
  }

  .garden-btn--primary.garden-btn--danger:active:not(:disabled) {
    background-color: var(--garden-color-background-danger-emphasis-active, #8c232c);
  }

  /* Primary + Neutral */
  .garden-btn--primary.garden-btn--neutral {
    background-color: var(--garden-color-background-emphasis, #68737d);
  }

  .garden-btn--primary.garden-btn--neutral:hover:not(:disabled) {
    background-color: var(--garden-color-background-emphasis-hover, #5c6970);
  }

  .garden-btn--primary.garden-btn--neutral:active:not(:disabled) {
    background-color: var(--garden-color-background-emphasis-active, #49545c);
  }

  /* ===========================================
   * DEFAULT BUTTON (with border)
   * =========================================== */

  .garden-btn:not(.garden-btn--primary):not(.garden-btn--link):not(.garden-btn--basic):hover:not(:disabled) {
    border-color: var(--garden-color-border-primary-hover, #1f73b7);
    background-color: var(--garden-color-primary-opacity-08, rgba(31, 115, 183, 0.08));
    color: var(--garden-color-foreground-primary-hover, #1f73b7);
  }

  .garden-btn:not(.garden-btn--primary):not(.garden-btn--link):not(.garden-btn--basic):active:not(:disabled),
  .garden-btn:not(.garden-btn--primary):not(.garden-btn--link):not(.garden-btn--basic)[aria-pressed='true'],
  .garden-btn:not(.garden-btn--primary):not(.garden-btn--link):not(.garden-btn--basic)[aria-pressed='mixed'] {
    border-color: var(--garden-color-border-primary-active, #144a75);
    background-color: var(--garden-color-primary-opacity-16, rgba(31, 115, 183, 0.16));
    color: var(--garden-color-foreground-primary-active, #144a75);
  }

  /* ===========================================
   * NEUTRAL BUTTON (grey border)
   * =========================================== */

  .garden-btn--neutral:not(.garden-btn--primary):not(.garden-btn--basic) {
    border-color: var(--garden-color-border-default, #c2c8cc);
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-btn--neutral:not(.garden-btn--primary):not(.garden-btn--basic):hover:not(:disabled) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-primary-opacity-08, rgba(31, 115, 183, 0.08));
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-btn--neutral:not(.garden-btn--primary):not(.garden-btn--basic):active:not(:disabled),
  .garden-btn--neutral:not(.garden-btn--primary):not(.garden-btn--basic)[aria-pressed='true'],
  .garden-btn--neutral:not(.garden-btn--primary):not(.garden-btn--basic)[aria-pressed='mixed'] {
    border-color: var(--garden-color-border-primary-hover, #1f73b7);
    background-color: var(--garden-color-primary-opacity-16, rgba(31, 115, 183, 0.16));
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* ===========================================
   * DANGER BUTTON (red border)
   * =========================================== */

  .garden-btn--danger:not(.garden-btn--primary):not(.garden-btn--basic) {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  .garden-btn--danger:not(.garden-btn--primary):not(.garden-btn--basic):hover:not(:disabled) {
    border-color: var(--garden-color-border-danger-hover, #cc3340);
    background-color: var(--garden-color-danger-opacity-08, rgba(204, 51, 64, 0.08));
    color: var(--garden-color-foreground-danger-hover, #cc3340);
  }

  .garden-btn--danger:not(.garden-btn--primary):not(.garden-btn--basic):active:not(:disabled),
  .garden-btn--danger:not(.garden-btn--primary):not(.garden-btn--basic)[aria-pressed='true'],
  .garden-btn--danger:not(.garden-btn--primary):not(.garden-btn--basic)[aria-pressed='mixed'] {
    border-color: var(--garden-color-border-danger-active, #8c232c);
    background-color: var(--garden-color-danger-opacity-16, rgba(204, 51, 64, 0.16));
    color: var(--garden-color-foreground-danger-active, #8c232c);
  }

  /* ===========================================
   * BASIC BUTTON (no border)
   * =========================================== */

  .garden-btn--basic {
    border-color: transparent;
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-btn--basic:hover:not(:disabled) {
    background-color: var(--garden-color-primary-opacity-08, rgba(31, 115, 183, 0.08));
  }

  .garden-btn--basic:active:not(:disabled),
  .garden-btn--basic[aria-pressed='true'],
  .garden-btn--basic[aria-pressed='mixed'] {
    background-color: var(--garden-color-primary-opacity-16, rgba(31, 115, 183, 0.16));
  }

  .garden-btn--basic.garden-btn--danger {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  .garden-btn--basic.garden-btn--danger:hover:not(:disabled) {
    background-color: var(--garden-color-danger-opacity-08, rgba(204, 51, 64, 0.08));
  }

  .garden-btn--basic.garden-btn--danger:active:not(:disabled),
  .garden-btn--basic.garden-btn--danger[aria-pressed='true'],
  .garden-btn--basic.garden-btn--danger[aria-pressed='mixed'] {
    background-color: var(--garden-color-danger-opacity-16, rgba(204, 51, 64, 0.16));
  }

  /* ===========================================
   * LINK BUTTON
   * =========================================== */

  .garden-btn--link {
    display: inline;
    height: auto;
    padding: 0;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: underline;
    white-space: normal;
    user-select: auto;
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-btn--link.garden-btn--danger {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  .garden-btn--link:hover:not(:disabled) {
    color: var(--garden-color-foreground-primary-hover, #1f73b7);
    text-decoration: underline;
  }

  .garden-btn--link.garden-btn--danger:hover:not(:disabled) {
    color: var(--garden-color-foreground-danger-hover, #cc3340);
  }

  .garden-btn--link:active:not(:disabled) {
    color: var(--garden-color-foreground-primary-active, #144a75);
  }

  .garden-btn--link.garden-btn--danger:active:not(:disabled) {
    color: var(--garden-color-foreground-danger-active, #8c232c);
  }

  /* ===========================================
   * PILL BUTTON
   * =========================================== */

  .garden-btn--pill {
    border-radius: 100px;
  }

  /* ===========================================
   * STRETCHED BUTTON
   * =========================================== */

  .garden-btn--stretched {
    width: 100%;
  }

  /* ===========================================
   * FOCUS STATES
   * =========================================== */

  .garden-btn:focus {
    outline: none;
  }

  .garden-btn:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 1px;
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-btn--primary:focus-visible {
    box-shadow:
      0 0 0 2px var(--garden-color-background-default, #fff),
      0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-btn--focus-inset:focus-visible {
    box-shadow:
      inset 0 0 0 2px var(--garden-color-background-default, #fff),
      inset 0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-btn--link:focus-visible {
    outline: 2px solid var(--garden-color-border-primary-emphasis, #1f73b7);
    outline-offset: 1px;
    box-shadow: none;
  }

  /* ===========================================
   * DISABLED STATE
   * =========================================== */

  .garden-btn:disabled,
  .garden-btn--disabled {
    cursor: default;
    border-color: transparent;
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
    color: var(--garden-color-foreground-disabled, #87929d);
  }

  .garden-btn--link:disabled,
  .garden-btn--link.garden-btn--disabled {
    background-color: transparent;
    text-decoration: none;
  }

  /* ===========================================
   * ACTIVE/PRESSED TRANSITION
   * =========================================== */

  .garden-btn:active:not(:disabled),
  .garden-btn[aria-pressed='true'],
  .garden-btn[aria-pressed='mixed'] {
    transition:
      border-color 0.1s ease-in-out,
      background-color 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out,
      color 0.1s ease-in-out,
      outline-color 0.1s ease-in-out,
      z-index 0.25s ease-in-out;
  }

  /* ===========================================
   * FIREFOX FIXES
   * =========================================== */
  .garden-btn::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
</style>
