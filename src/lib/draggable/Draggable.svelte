<!--
  Svelte Garden - Draggable Component
  
  A draggable item that can be reordered.
-->
<script lang="ts">
  import type { DraggableProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends DraggableProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    focusInset = false,
    isBare = false,
    isCompact = false,
    isDisabled = false,
    isGrabbed = false,
    isPlaceholder = false,
    ...restProps
  }: Props = $props();

  const draggableClasses = $derived([
    'garden-draggable',
    focusInset && 'garden-draggable--focus-inset',
    isBare && 'garden-draggable--bare',
    isCompact && 'garden-draggable--compact',
    isDisabled && 'garden-draggable--disabled',
    isGrabbed && 'garden-draggable--grabbed',
    isPlaceholder && 'garden-draggable--placeholder',
    className
  ].filter(Boolean).join(' '));
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class={draggableClasses}
  data-garden-id="draggable.draggable"
  role="option"
  tabindex={isDisabled ? -1 : 0}
  aria-selected={isGrabbed}
  aria-disabled={isDisabled || undefined}
  draggable={!isDisabled && !isPlaceholder}
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-draggable {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background-color: var(--garden-color-background-default, #fff);
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    color: var(--garden-color-foreground-default, #2f3941);
    cursor: grab;
    transition: 
      background-color 0.1s ease,
      border-color 0.1s ease,
      box-shadow 0.1s ease;
    user-select: none;
  }

  .garden-draggable:hover:not(.garden-draggable--disabled):not(.garden-draggable--grabbed) {
    border-color: var(--garden-color-border-emphasis, #c2c8cc);
    background-color: var(--garden-color-background-subtle, #f8f9f9);
  }

  .garden-draggable:focus-visible {
    outline: none;
    box-shadow: 
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-draggable--focus-inset:focus-visible {
    box-shadow: inset 0 0 0 3px rgba(31, 115, 183, 0.35);
  }

  /* Compact */
  .garden-draggable--compact {
    padding: 8px 12px;
    gap: 8px;
  }

  /* Bare */
  .garden-draggable--bare {
    border-color: transparent;
    background-color: transparent;
  }

  .garden-draggable--bare:hover:not(.garden-draggable--disabled) {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    border-color: transparent;
  }

  /* Disabled */
  .garden-draggable--disabled {
    background-color: var(--garden-color-background-disabled, rgba(104, 115, 125, 0.08));
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  /* Grabbed (being dragged) */
  .garden-draggable--grabbed {
    cursor: grabbing;
    box-shadow: 0 20px 28px 0 var(--garden-color-shadow-large, rgba(0, 0, 0, 0.15));
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-background-raised, #fff);
    z-index: 1000;
  }

  /* Placeholder */
  .garden-draggable--placeholder {
    background-color: var(--garden-color-background-disabled, rgba(104, 115, 125, 0.08));
    border-color: var(--garden-color-border-default, #d8dcde);
    border-style: dashed;
    cursor: default;
  }

  .garden-draggable--placeholder > :global(*) {
    visibility: hidden;
  }
</style>
