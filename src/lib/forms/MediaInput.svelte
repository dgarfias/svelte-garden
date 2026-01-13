<!--
  Svelte Garden - MediaInput Component
  
  An input field with optional start and end icons/elements.
  
  @example
  <MediaInput placeholder="Search...">
    {#snippet start()}
      <SearchIcon />
    {/snippet}
  </MediaInput>
  
  @example
  <MediaInput>
    {#snippet end()}
      <Button>Submit</Button>
    {/snippet}
  </MediaInput>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { InputProps } from './types';
  import { getFieldContext } from './context';
  import { useRtl } from '../theming';

  interface Props extends InputProps {
    /** Content to render before the input */
    start?: Snippet;
    /** Content to render after the input */
    end?: Snippet;
  }

  let {
    start,
    end,
    validation,
    isCompact = false,
    isBare = false,
    focusInset = false,
    disabled = false,
    readonly = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  let inputElement: HTMLInputElement | undefined = $state();
  let isFocused = $state(false);
  let isHovered = $state(false);

  const fieldContext = getFieldContext();
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;
  const isRtl = useRtl();

  // Build aria-describedby from context
  const ariaDescribedBy = $derived(() => {
    if (!fieldContext) return undefined;
    const ids: string[] = [];
    if (fieldContext.hasHint) ids.push(fieldContext.hintId);
    if (fieldContext.hasMessage) ids.push(fieldContext.messageId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  });

  const wrapperClasses = $derived([
    'garden-media-input',
    isCompact && 'garden-media-input--compact',
    isBare && 'garden-media-input--bare',
    focusInset && 'garden-media-input--focus-inset',
    validation && `garden-media-input--${validation}`,
    disabled && 'garden-media-input--disabled',
    readonly && 'garden-media-input--readonly',
    isFocused && 'garden-media-input--focused',
    isHovered && !isFocused && 'garden-media-input--hovered',
    isRtl && 'garden-media-input--rtl',
    className
  ].filter(Boolean).join(' '));

  function handleWrapperClick() {
    inputElement?.focus();
  }

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = false;
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div
  class={wrapperClasses}
  data-garden-id="forms.media_input"
  role="presentation"
  onclick={handleWrapperClick}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  {#if start}
    <span class="garden-media-input__start" class:garden-media-input__icon--disabled={disabled}>
      {@render start()}
    </span>
  {/if}
  
  <input
    bind:this={inputElement}
    id={inputId}
    class="garden-media-input__input"
    {disabled}
    {readonly}
    aria-describedby={ariaDescribedBy()}
    aria-invalid={validation === 'error' || validation === 'warning' ? true : undefined}
    onfocus={handleFocus}
    onblur={handleBlur}
    {...restProps}
  />
  
  {#if end}
    <span class="garden-media-input__end" class:garden-media-input__icon--disabled={disabled}>
      {@render end()}
    </span>
  {/if}
</div>

<style>
  .garden-media-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 0 12px;
    gap: 8px;
    border: 1px solid var(--garden-color-border-default, #c2c8cc);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    cursor: text;
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out,
      background-color 0.25s ease-in-out;
  }

  .garden-media-input__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
    outline: none;
  }

  .garden-media-input__input::placeholder {
    color: var(--garden-color-foreground-subtle, #68737d);
    opacity: 1;
  }

  .garden-media-input__start,
  .garden-media-input__end {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--garden-color-foreground-subtle, #68737d);
    transition: color 0.25s ease-in-out;
  }

  .garden-media-input__start :global(svg),
  .garden-media-input__end :global(svg) {
    width: 16px;
    height: 16px;
  }

  /* ===========================================
   * COMPACT SIZE
   * =========================================== */

  .garden-media-input--compact {
    height: 32px;
    padding: 0 8px;
    gap: 6px;
  }

  .garden-media-input--compact .garden-media-input__input {
    font-size: 13px;
  }

  /* ===========================================
   * BARE VARIANT
   * =========================================== */

  .garden-media-input--bare {
    border-color: transparent;
    background-color: transparent;
    border-radius: 0;
  }

  /* ===========================================
   * STATES
   * =========================================== */

  /* Hover */
  .garden-media-input--hovered:not(.garden-media-input--disabled):not(.garden-media-input--bare) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Focus */
  .garden-media-input--focused:not(.garden-media-input--bare) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-media-input--focus-inset.garden-media-input--focused:not(.garden-media-input--bare) {
    box-shadow:
      inset 0 0 0 2px var(--garden-color-background-default, #fff),
      inset 0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Readonly */
  .garden-media-input--readonly {
    background-color: var(--garden-color-background-subtle, rgba(0, 0, 0, 0.04));
  }

  /* Disabled */
  .garden-media-input--disabled {
    border-color: var(--garden-color-border-disabled, #d8dcde);
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
    cursor: default;
  }

  .garden-media-input--disabled .garden-media-input__input {
    color: var(--garden-color-foreground-disabled, #68737d);
    cursor: default;
  }

  .garden-media-input__icon--disabled {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }

  /* ===========================================
   * VALIDATION STATES
   * =========================================== */

  .garden-media-input--success {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-media-input--success.garden-media-input--focused {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-media-input--warning {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-media-input--warning.garden-media-input--focused {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-media-input--error {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-media-input--error.garden-media-input--focused {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-danger-emphasis, #cc3340);
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  .garden-media-input--rtl {
    flex-direction: row-reverse;
  }
</style>
