<!--
  Svelte Garden - DropIndicator Component
  
  Visual indicator showing where a dragged item will be dropped.
  
  @example
  <DraggableList>
    <DraggableItem>Item 1</DraggableItem>
    <DropIndicator />
    <DraggableItem>Item 2</DraggableItem>
  </DraggableList>
-->
<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';

  interface Props extends HTMLLiAttributes {
    /** Applies horizontal styling (set by parent DraggableList) */
    isHorizontal?: boolean;
  }

  let {
    class: className = '',
    isHorizontal = false,
    ...restProps
  }: Props = $props();

  const indicatorClasses = $derived([
    'garden-drop-indicator',
    isHorizontal && 'garden-drop-indicator--horizontal',
    className
  ].filter(Boolean).join(' '));
</script>

<li
  class={indicatorClasses}
  data-garden-id="draggable.list.drop_indicator"
  aria-label="Drop indicator"
  role="listitem"
  {...restProps}
>
  <span class="garden-drop-indicator__line"></span>
</li>

<style>
  .garden-drop-indicator {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4px;
    list-style: none;
  }

  .garden-drop-indicator--horizontal {
    width: 4px;
    height: auto;
    min-height: 40px;
  }

  .garden-drop-indicator__line {
    position: absolute;
    background-color: #1f73b7;
    border-radius: 2px;
  }

  .garden-drop-indicator:not(.garden-drop-indicator--horizontal) .garden-drop-indicator__line {
    left: 0;
    right: 0;
    height: 4px;
  }

  .garden-drop-indicator--horizontal .garden-drop-indicator__line {
    top: 0;
    bottom: 0;
    width: 4px;
  }

  /* Dot indicators at ends */
  .garden-drop-indicator__line::before,
  .garden-drop-indicator__line::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #1f73b7;
    border-radius: 50%;
  }

  .garden-drop-indicator:not(.garden-drop-indicator--horizontal) .garden-drop-indicator__line::before {
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .garden-drop-indicator:not(.garden-drop-indicator--horizontal) .garden-drop-indicator__line::after {
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  }

  .garden-drop-indicator--horizontal .garden-drop-indicator__line::before {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .garden-drop-indicator--horizontal .garden-drop-indicator__line::after {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
  }
</style>
