<!--
  Svelte Garden - DropzoneMessage Component
  
  Message text displayed inside a Dropzone.
  
  @example
  <Dropzone isVertical>
    <DropzoneIcon><UploadIcon /></DropzoneIcon>
    <DropzoneMessage>Drop files here or click to upload</DropzoneMessage>
  </Dropzone>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<p
  class="garden-dropzone-message {className}"
  data-garden-id="draggable.dropzone.message"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</p>

<style>
  .garden-dropzone-message {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: inherit;
  }
</style>
