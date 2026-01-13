<!--
  Svelte Garden - Tile Component
  
  A single tile in a Tiles radio group.
  
  @example
  <Tile value="option1">
    <TileIcon><Icon /></TileIcon>
    <TileLabel>Option 1</TileLabel>
    <TileDescription>Description here</TileDescription>
  </Tile>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLLabelAttributes } from 'svelte/elements';
  import { getContext } from 'svelte';
  import type { TilesContextValue } from './Tiles.svelte';

  interface Props extends HTMLLabelAttributes {
    children?: Snippet;
    /** Value for this tile */
    value: string;
    /** Whether the tile is disabled */
    disabled?: boolean;
  }

  let {
    children,
    value,
    disabled = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  const tilesContext = getContext<TilesContextValue>('garden-tiles');

  const isSelected = $derived(tilesContext?.value === value);

  const tileClasses = $derived([
    'garden-tile',
    isSelected && 'garden-tile--selected',
    disabled && 'garden-tile--disabled',
    tilesContext?.isCentered && 'garden-tile--centered',
    className
  ].filter(Boolean).join(' '));

  function handleChange() {
    if (!disabled && tilesContext) {
      tilesContext.onChange(value);
    }
  }
</script>

<label
  class={tileClasses}
  aria-disabled={disabled || undefined}
  data-garden-id="forms.tile"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
  <input
    type="radio"
    class="garden-tile__input"
    name={tilesContext?.name}
    {value}
    checked={isSelected}
    {disabled}
    onchange={handleChange}
  />
</label>

<style>
  .garden-tile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 16px;
    min-width: 120px;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    cursor: pointer;
    transition:
      border-color 0.25s ease-in-out,
      background-color 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  .garden-tile--centered {
    align-items: center;
    text-align: center;
  }

  .garden-tile__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* Hover */
  .garden-tile:hover:not(.garden-tile--disabled) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Focus */
  .garden-tile:has(.garden-tile__input:focus-visible) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* Selected */
  .garden-tile--selected {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    background-color: var(--garden-color-primary-opacity-08, rgba(31, 115, 183, 0.08));
  }

  .garden-tile--selected:hover:not(.garden-tile--disabled) {
    background-color: var(--garden-color-primary-opacity-12, rgba(31, 115, 183, 0.12));
  }

  /* Disabled */
  .garden-tile--disabled {
    border-color: var(--garden-color-border-subtle, #e8eaec);
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.04));
    color: var(--garden-color-foreground-subtle, #87929d);
    cursor: not-allowed;
  }

  .garden-tile--disabled.garden-tile--selected {
    border-color: var(--garden-color-primary-opacity-30, rgba(31, 115, 183, 0.3));
    background-color: var(--garden-color-primary-opacity-04, rgba(31, 115, 183, 0.04));
  }
</style>
