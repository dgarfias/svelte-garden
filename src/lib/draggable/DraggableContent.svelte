<!--
  Svelte Garden - DraggableContent Component
  
  Content wrapper for draggable items.
-->
<script lang="ts">
  import type { DraggableContentProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends DraggableContentProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const contentClasses = $derived([
    'garden-draggable-content',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={contentClasses}
  data-garden-id="draggable.content"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-draggable-content {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    color: var(--garden-color-foreground-default, #2f3941);
  }
</style>
