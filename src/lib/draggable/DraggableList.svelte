<!--
  Svelte Garden - DraggableList Component
  
  A list container for draggable items.
-->
<script lang="ts">
  import type { DraggableListProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends DraggableListProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isHorizontal = false,
    ...restProps
  }: Props = $props();

  const listClasses = $derived([
    'garden-draggable-list',
    isHorizontal && 'garden-draggable-list--horizontal',
    className
  ].filter(Boolean).join(' '));
</script>

<ul
  class={listClasses}
  data-garden-id="draggable.list"
  role="list"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</ul>

<style>
  .garden-draggable-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .garden-draggable-list--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
