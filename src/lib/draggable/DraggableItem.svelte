<!--
  Svelte Garden - DraggableItem Component
  
  An individual item in a DraggableList.
  
  @example
  <DraggableList>
    <DraggableItem>
      <Draggable>Item 1</Draggable>
    </DraggableItem>
  </DraggableList>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLLiAttributes } from 'svelte/elements';

  interface Props extends HTMLLiAttributes {
    children?: Snippet;
    /** Applies horizontal styling (set by parent DraggableList) */
    isHorizontal?: boolean;
  }

  let {
    children,
    class: className = '',
    isHorizontal = false,
    ...restProps
  }: Props = $props();

  const itemClasses = $derived([
    'garden-draggable-item',
    isHorizontal && 'garden-draggable-item--horizontal',
    className
  ].filter(Boolean).join(' '));
</script>

<li
  class={itemClasses}
  data-garden-id="draggable.list.item"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</li>

<style>
  .garden-draggable-item {
    display: block;
  }

  .garden-draggable-item--horizontal {
    display: inline-block;
  }
</style>
