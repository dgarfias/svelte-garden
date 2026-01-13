<!--
  Svelte Garden - Tiles Component
  
  A radio group displayed as tiles/cards.
  
  @example
  <Tiles name="plan" bind:value={selectedPlan}>
    <Tile value="basic">
      <TileIcon><BasicIcon /></TileIcon>
      <TileLabel>Basic</TileLabel>
      <TileDescription>For individuals</TileDescription>
    </Tile>
    <Tile value="pro">
      <TileIcon><ProIcon /></TileIcon>
      <TileLabel>Professional</TileLabel>
      <TileDescription>For teams</TileDescription>
    </Tile>
  </Tiles>
-->
<script lang="ts" module>
  export interface TilesContextValue {
    name: string;
    value: string | undefined;
    isCentered: boolean;
    onChange: (value: string) => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { setContext } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    /** Name for the radio group */
    name: string;
    /** Currently selected value */
    value?: string;
    /** Whether tiles should be centered */
    isCentered?: boolean;
    /** Callback when selection changes */
    onValueChange?: (value: string) => void;
  }

  let {
    children,
    name,
    value = $bindable(),
    isCentered = true,
    onValueChange,
    class: className = '',
    ...restProps
  }: Props = $props();

  function handleChange(newValue: string) {
    value = newValue;
    onValueChange?.(newValue);
  }

  // Provide context for child tiles
  setContext<TilesContextValue>('garden-tiles', {
    get name() { return name; },
    get value() { return value; },
    get isCentered() { return isCentered; },
    onChange: handleChange
  });

  const tilesClasses = $derived([
    'garden-tiles',
    isCentered && 'garden-tiles--centered',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  role="radiogroup"
  class={tilesClasses}
  data-garden-id="forms.tiles"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .garden-tiles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
