<!--
  Svelte Garden - TileDescription Component
  
  Description text for a Tile.
  
  @example
  <Tile value="option">
    <TileLabel>Option Name</TileLabel>
    <TileDescription>Detailed description here</TileDescription>
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

  const descClasses = $derived([
    'garden-tile-description',
    tilesContext?.isCentered && 'garden-tile-description--centered',
    className
  ].filter(Boolean).join(' '));
</script>

<span
  class={descClasses}
  data-garden-id="forms.tile_description"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</span>

<style>
  .garden-tile-description {
    display: block;
    font-size: 12px;
    line-height: 16px;
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-tile-description--centered {
    text-align: center;
    width: 100%;
  }

  /* Disabled state */
  :global(.garden-tile--disabled) .garden-tile-description {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
  }
</style>
