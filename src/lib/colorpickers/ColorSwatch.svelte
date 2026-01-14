<!--
  Svelte Garden - ColorSwatch Component
  
  A grid of color swatches for selecting from predefined colors.
-->
<script lang="ts">
  import type { ColorSwatchProps, ILabeledColor } from './types';
  import type { Snippet } from 'svelte';
  import { CheckSmFill } from '../icons';

  interface Props extends ColorSwatchProps {
    children?: Snippet;
    onSelect?: (rowIndex: number | null, colIndex: number | null) => void;
  }

  let {
    children,
    class: className = '',
    name,
    colors,
    isCheckboxGroup = false,
    selectedRowIndex,
    selectedColIndex,
    onSelect,
    ...restProps
  }: Props = $props();

  // Track internal selection for uncontrolled mode using derived for initial
  const initialRowIndex = $derived(selectedRowIndex ?? null);
  const initialColIndex = $derived(selectedColIndex ?? null);
  let internalRowIndex = $state<number | null>(null);
  let internalColIndex = $state<number | null>(null);
  
  // Sync internal state with props
  $effect(() => {
    internalRowIndex = initialRowIndex;
  });
  $effect(() => {
    internalColIndex = initialColIndex;
  });

  // Determine actual selection (controlled vs uncontrolled)
  const currentRowIndex = $derived(selectedRowIndex !== undefined ? selectedRowIndex : internalRowIndex);
  const currentColIndex = $derived(selectedColIndex !== undefined ? selectedColIndex : internalColIndex);

  function handleSelect(rowIndex: number, colIndex: number, checked: boolean) {
    if (checked) {
      internalRowIndex = rowIndex;
      internalColIndex = colIndex;
      onSelect?.(rowIndex, colIndex);
    } else if (isCheckboxGroup) {
      internalRowIndex = null;
      internalColIndex = null;
      onSelect?.(null, null);
    }
  }

  function isSelected(rowIndex: number, colIndex: number): boolean {
    return currentRowIndex === rowIndex && currentColIndex === colIndex;
  }

  const swatchClasses = $derived([
    'garden-color-swatch',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={swatchClasses}
  role="grid"
  data-garden-id="colorpickers.color_swatch"
  {...restProps}
>
  {#each colors as row, rowIndex}
    <div class="garden-color-swatch__row" role="row">
      {#each row as color, colIndex}
        {@const selected = isSelected(rowIndex, colIndex)}
        <div class="garden-color-swatch__cell" role="gridcell">
          <label 
            class="garden-color-swatch__label"
            style:--swatch-color={color.value}
            title={color.label}
          >
            <input
              type={isCheckboxGroup ? 'checkbox' : 'radio'}
              class="garden-color-swatch__input"
              {name}
              value={color.value}
              checked={selected}
              aria-label={color.label}
              onchange={(e) => handleSelect(rowIndex, colIndex, (e.target as HTMLInputElement).checked)}
            />
            <span class="garden-color-swatch__swatch">
              {#if selected}
                <CheckSmFill class="garden-color-swatch__check" size={12} />
              {/if}
            </span>
          </label>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .garden-color-swatch {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
  }

  .garden-color-swatch__row {
    display: flex;
    gap: 4px;
  }

  .garden-color-swatch__cell {
    display: contents;
  }

  .garden-color-swatch__label {
    display: block;
    cursor: pointer;
  }

  .garden-color-swatch__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .garden-color-swatch__swatch {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background-color: var(--swatch-color);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }

  .garden-color-swatch__input:focus-visible + .garden-color-swatch__swatch {
    outline: 2px solid #1f73b7;
    outline-offset: 2px;
  }

  .garden-color-swatch__label:hover .garden-color-swatch__swatch {
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  .garden-color-swatch__input:checked + .garden-color-swatch__swatch {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1f73b7;
  }

  :global(.garden-color-swatch__check) {
    /* Use contrasting color based on background */
    color: #fff;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
  }
</style>
