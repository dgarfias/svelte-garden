<!--
  Svelte Garden - Grid Component
  
  A responsive flexbox grid system based on a 12-column layout.
-->
<script lang="ts">
  import type { GridProps, Space } from './types';
  import type { Snippet } from 'svelte';
  import { setGridContext, getGutterSize } from './context';

  interface Props extends GridProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    columns = 12,
    gutters = 'md',
    debug = false,
    ...restProps
  }: Props = $props();

  // Set grid context for child components
  setGridContext({
    get columns() { return columns; },
    get gutters() { return gutters as Space; },
    get debug() { return debug; }
  });

  const gridClasses = $derived([
    'garden-grid',
    debug && 'garden-grid--debug',
    className
  ].filter(Boolean).join(' '));

  const gutterSize = $derived(getGutterSize(gutters as Space));
</script>

<div
  class={gridClasses}
  data-garden-id="grid.grid"
  style:--garden-grid-columns={columns}
  style:--garden-grid-gutter={`${gutterSize}px`}
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-grid {
    display: block;
    box-sizing: border-box;
    width: 100%;
  }

  .garden-grid--debug {
    background-color: rgba(255, 0, 0, 0.1);
  }

  .garden-grid--debug :global(.garden-row) {
    background-color: rgba(0, 0, 255, 0.1);
  }

  .garden-grid--debug :global(.garden-col) {
    background-color: rgba(0, 255, 0, 0.1);
    outline: 1px dashed rgba(0, 128, 0, 0.5);
  }
</style>
