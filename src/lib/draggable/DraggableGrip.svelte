<!--
  Svelte Garden - DraggableGrip Component
  
  A grip handle for draggable items.
-->
<script lang="ts">
  import type { DraggableGripProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends DraggableGripProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const gripClasses = $derived([
    'garden-draggable-grip',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={gripClasses}
  data-garden-id="draggable.grip"
  aria-hidden="true"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <svg viewBox="0 0 16 16" fill="currentColor">
      <circle cx="5" cy="3" r="1.5"/>
      <circle cx="11" cy="3" r="1.5"/>
      <circle cx="5" cy="8" r="1.5"/>
      <circle cx="11" cy="8" r="1.5"/>
      <circle cx="5" cy="13" r="1.5"/>
      <circle cx="11" cy="13" r="1.5"/>
    </svg>
  {/if}
</div>

<style>
  .garden-draggable-grip {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--garden-color-foreground-subtle, #87929d);
    cursor: grab;
  }

  .garden-draggable-grip svg {
    width: 100%;
    height: 100%;
  }

  :global(.garden-draggable--grabbed) .garden-draggable-grip {
    cursor: grabbing;
  }

  :global(.garden-draggable--disabled) .garden-draggable-grip {
    cursor: not-allowed;
  }
</style>
