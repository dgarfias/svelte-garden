<!--
  Svelte Garden - DropzoneIcon Component
  
  Icon displayed inside a Dropzone.
  
  @example
  <Dropzone isVertical>
    <DropzoneIcon><UploadIcon /></DropzoneIcon>
    <DropzoneMessage>Drop files here</DropzoneMessage>
  </Dropzone>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    /** Whether the dropzone has a message (affects spacing) */
    hasMessage?: boolean;
    /** Whether the dropzone is vertical */
    isVertical?: boolean;
  }

  let {
    children,
    class: className = '',
    hasMessage = false,
    isVertical = false,
    ...restProps
  }: Props = $props();

  const iconClasses = $derived([
    'garden-dropzone-icon',
    hasMessage && 'garden-dropzone-icon--has-message',
    isVertical && 'garden-dropzone-icon--vertical',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={iconClasses}
  data-garden-id="draggable.dropzone.icon"
  aria-hidden="true"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-dropzone-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  .garden-dropzone-icon :global(svg) {
    width: 40px;
    height: 40px;
  }

  /* Adjust spacing when there's a message in horizontal layout */
  .garden-dropzone-icon--has-message:not(.garden-dropzone-icon--vertical) {
    margin-right: 12px;
  }

  /* Adjust spacing when there's a message in vertical layout */
  .garden-dropzone-icon--has-message.garden-dropzone-icon--vertical {
    margin-bottom: 8px;
  }

  /* RTL support */
  :global([dir="rtl"]) .garden-dropzone-icon--has-message:not(.garden-dropzone-icon--vertical) {
    margin-right: 0;
    margin-left: 12px;
  }
</style>
