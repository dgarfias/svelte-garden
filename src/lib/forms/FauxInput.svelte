<!--
  Svelte Garden - FauxInput Component
  
  A div styled to look like an input, useful for custom input-like components.
  Can also be used as a wrapper with start/end icons.
  
  @example
  <FauxInput>
    <span>Custom content here</span>
  </FauxInput>
  
  @example
  <FauxInput isFocused>
    {#snippet start()}
      <SearchIcon />
    {/snippet}
    <span>Selected value</span>
  </FauxInput>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ValidationState } from './types';
  import { useRtl } from '../theming';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    /** Content to render before the main content */
    start?: Snippet;
    /** Content to render after the main content */
    end?: Snippet;
    /** Validation state */
    validation?: ValidationState;
    /** Makes the input smaller */
    isCompact?: boolean;
    /** Removes the border and background */
    isBare?: boolean;
    /** Applies focus styling inset */
    focusInset?: boolean;
    /** Whether to show focus styling */
    isFocused?: boolean;
    /** Whether to show hover styling */
    isHovered?: boolean;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Whether the input is read-only */
    readonly?: boolean;
    /** Use media layout (for inputs with icons) */
    mediaLayout?: boolean;
  }

  let {
    children,
    start,
    end,
    validation,
    isCompact = false,
    isBare = false,
    focusInset = false,
    isFocused = false,
    isHovered = false,
    disabled = false,
    readonly = false,
    mediaLayout = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  const fauxInputClasses = $derived([
    'garden-faux-input',
    isCompact && 'garden-faux-input--compact',
    isBare && 'garden-faux-input--bare',
    focusInset && 'garden-faux-input--focus-inset',
    validation && `garden-faux-input--${validation}`,
    disabled && 'garden-faux-input--disabled',
    readonly && 'garden-faux-input--readonly',
    isFocused && 'garden-faux-input--focused',
    isHovered && !isFocused && 'garden-faux-input--hovered',
    mediaLayout && 'garden-faux-input--media',
    isRtl && 'garden-faux-input--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class={fauxInputClasses}
  data-garden-id="forms.faux_input"
  tabindex={disabled ? undefined : 0}
  aria-disabled={disabled || undefined}
  {...restProps}
>
  {#if start}
    <span class="garden-faux-input__start" class:garden-faux-input__icon--disabled={disabled}>
      {@render start()}
    </span>
  {/if}
  
  {#if children}
    <span class="garden-faux-input__content">
      {@render children()}
    </span>
  {/if}
  
  {#if end}
    <span class="garden-faux-input__end" class:garden-faux-input__icon--disabled={disabled}>
      {@render end()}
    </span>
  {/if}
</div>

<style>
  .garden-faux-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    padding: 9px 12px;
    gap: 8px;
    border: 1px solid var(--garden-color-border-default, #c2c8cc);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    font-family: inherit;
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
    cursor: default;
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out,
      background-color 0.25s ease-in-out;
  }

  .garden-faux-input__content {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .garden-faux-input__start,
  .garden-faux-input__end {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--garden-color-foreground-subtle, #68737d);
    transition: color 0.25s ease-in-out;
  }

  .garden-faux-input__start :global(svg),
  .garden-faux-input__end :global(svg) {
    width: 16px;
    height: 16px;
  }

  /* Media layout - optimized for inputs with icons */
  .garden-faux-input--media {
    padding: 0 12px;
    min-height: 40px;
  }

  /* ===========================================
   * COMPACT SIZE
   * =========================================== */

  .garden-faux-input--compact {
    min-height: 32px;
    padding: 5px 12px;
    gap: 6px;
  }

  .garden-faux-input--media.garden-faux-input--compact {
    padding: 0 8px;
    min-height: 32px;
  }

  /* ===========================================
   * BARE VARIANT
   * =========================================== */

  .garden-faux-input--bare {
    border-color: transparent;
    background-color: transparent;
    border-radius: 0;
  }

  /* ===========================================
   * STATES
   * =========================================== */

  /* Hover */
  .garden-faux-input--hovered:not(.garden-faux-input--disabled):not(.garden-faux-input--bare) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Focus */
  .garden-faux-input:focus {
    outline: none;
  }

  .garden-faux-input--focused:not(.garden-faux-input--bare),
  .garden-faux-input:focus-visible:not(.garden-faux-input--bare) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-faux-input--focus-inset.garden-faux-input--focused:not(.garden-faux-input--bare),
  .garden-faux-input--focus-inset:focus-visible:not(.garden-faux-input--bare) {
    box-shadow:
      inset 0 0 0 2px var(--garden-color-background-default, #fff),
      inset 0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Readonly */
  .garden-faux-input--readonly {
    background-color: var(--garden-color-background-subtle, rgba(0, 0, 0, 0.04));
  }

  /* Disabled */
  .garden-faux-input--disabled {
    border-color: var(--garden-color-border-disabled, #d8dcde);
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
    color: var(--garden-color-foreground-disabled, #68737d);
    cursor: not-allowed;
  }

  .garden-faux-input__icon--disabled {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  /* ===========================================
   * VALIDATION STATES
   * =========================================== */

  .garden-faux-input--success {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-faux-input--success.garden-faux-input--focused,
  .garden-faux-input--success:focus-visible {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-faux-input--warning {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-faux-input--warning.garden-faux-input--focused,
  .garden-faux-input--warning:focus-visible {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-faux-input--error {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-faux-input--error.garden-faux-input--focused,
  .garden-faux-input--error:focus-visible {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-danger-emphasis, #cc3340);
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  .garden-faux-input--rtl {
    flex-direction: row-reverse;
  }
</style>
