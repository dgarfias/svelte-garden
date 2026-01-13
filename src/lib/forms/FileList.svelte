<!--
  Svelte Garden - FileList Component
  
  A list container for uploaded files.
  
  @example
  <FileList>
    <FileListItem>
      <File type="document">report.pdf</File>
    </FileListItem>
  </FileList>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLUListElement> {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const listClasses = $derived([
    'garden-file-list',
    className
  ].filter(Boolean).join(' '));
</script>

<ul
  class={listClasses}
  data-garden-id="forms.file_list"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</ul>

<style>
  .garden-file-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
