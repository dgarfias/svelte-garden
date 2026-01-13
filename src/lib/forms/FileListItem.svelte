<!--
  Svelte Garden - FileListItem Component
  
  An item in a file list.
  
  @example
  <FileList>
    <FileListItem>
      <File type="document">report.pdf</File>
    </FileListItem>
  </FileList>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLLiAttributes } from 'svelte/elements';

  interface Props extends HTMLLiAttributes {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const itemClasses = $derived([
    'garden-file-list-item',
    className
  ].filter(Boolean).join(' '));
</script>

<li
  class={itemClasses}
  data-garden-id="forms.file_list_item"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</li>

<style>
  .garden-file-list-item {
    margin-top: 8px;
  }

  .garden-file-list-item:first-child {
    margin-top: 0;
  }
</style>
