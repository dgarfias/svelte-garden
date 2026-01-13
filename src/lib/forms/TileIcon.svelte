<!--
  Svelte Garden - TileIcon Component
  
  Icon container for a Tile.
  
  @example
  <Tile value="option">
    <TileIcon>
      <svg>...</svg>
    </TileIcon>
  </Tile>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { getContext } from 'svelte';
  import type { TilesContextValue } from './Tiles.svelte';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const tilesContext = getContext<TilesContextValue>('garden-tiles');

  const iconClasses = $derived([
    'garden-tile-icon',
    tilesContext?.isCentered && 'garden-tile-icon--centered',
    className
  ].filter(Boolean).join(' '));
</script>

<span
  class={iconClasses}
  data-garden-id="forms.tile_icon"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</span>

<style>
  .garden-tile-icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #68737d;
    margin-bottom: 4px;
  }

  .garden-tile-icon--centered {
    justify-content: center;
    width: 100%;
  }

  .garden-tile-icon :global(svg) {
    width: 24px;
    height: 24px;
  }

  /* Selected state */
  :global(.garden-tile--selected) .garden-tile-icon {
    color: #1f73b7;
  }

  /* Disabled state */
  :global(.garden-tile--disabled) .garden-tile-icon {
    color: #c2c8cc;
  }
</style>
