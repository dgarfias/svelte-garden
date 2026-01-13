<!--
  Svelte Garden - TileLabel Component
  
  Label text for a Tile.
  
  @example
  <Tile value="option">
    <TileLabel>Option Name</TileLabel>
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

  const labelClasses = $derived([
    'garden-tile-label',
    tilesContext?.isCentered && 'garden-tile-label--centered',
    className
  ].filter(Boolean).join(' '));
</script>

<span
  class={labelClasses}
  data-garden-id="forms.tile_label"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</span>

<style>
  .garden-tile-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .garden-tile-label--centered {
    text-align: center;
    width: 100%;
  }

  /* Disabled state */
  :global(.garden-tile--disabled) .garden-tile-label {
    color: var(--garden-color-foreground-disabled, #87929d);
  }
</style>
