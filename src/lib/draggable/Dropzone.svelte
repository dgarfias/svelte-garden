<!--
  Svelte Garden - Dropzone Component
  
  A drop target for draggable items.
-->
<script lang="ts">
  import type { DropzoneProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends DropzoneProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isActive = false,
    isVertical = false,
    isDanger = false,
    isDisabled = false,
    isHighlighted = false,
    ...restProps
  }: Props = $props();

  const dropzoneClasses = $derived([
    'garden-dropzone',
    isActive && 'garden-dropzone--active',
    isVertical && 'garden-dropzone--vertical',
    isDanger && 'garden-dropzone--danger',
    isDisabled && 'garden-dropzone--disabled',
    isHighlighted && 'garden-dropzone--highlighted',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={dropzoneClasses}
  data-garden-id="draggable.dropzone"
  role="group"
  aria-label="Drop zone"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 32px;
    min-height: 120px;
    border: 2px dashed var(--garden-color-border-emphasis, #68737d);
    border-radius: 8px;
    background-color: transparent;
    color: var(--garden-color-foreground-subtle, #68737d);
    text-align: center;
    font-size: 14px;
    transition: 
      border-color 0.15s ease,
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .garden-dropzone--vertical {
    flex-direction: column;
  }

  /* Active (drop is possible) */
  .garden-dropzone--active {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-background-primary-emphasis-subtle, rgba(31, 115, 183, 0.08));
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  /* Highlighted (draggable is over) */
  .garden-dropzone--highlighted {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    border-style: solid;
    padding: 31px; /* Compensate for border width change */
    background-color: var(--garden-color-background-primary-emphasis-subtle, rgba(31, 115, 183, 0.08));
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  /* Danger */
  .garden-dropzone--danger {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  .garden-dropzone--danger.garden-dropzone--active,
  .garden-dropzone--danger.garden-dropzone--highlighted {
    background-color: var(--garden-color-background-danger-emphasis-subtle, rgba(204, 51, 64, 0.08));
  }

  /* Disabled */
  .garden-dropzone--disabled {
    background-color: var(--garden-color-background-disabled, rgba(104, 115, 125, 0.08));
    border-color: var(--garden-color-border-disabled, #d8dcde);
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }
</style>
