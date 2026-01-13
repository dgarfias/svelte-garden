<!--
  Svelte Garden - Row Component
-->
<script lang="ts">
  import type { RowProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends RowProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isSelected = false,
    isFocused = false,
    ...restProps
  }: Props = $props();

  const rowClasses = $derived([
    'garden-row',
    isSelected && 'garden-row--selected',
    isFocused && 'garden-row--focused',
    className
  ].filter(Boolean).join(' '));
</script>

<tr class={rowClasses} data-garden-id="tables.row" {...restProps}>
  {#if children}{@render children()}{/if}
</tr>

<style>
  .garden-row {
    border-bottom: 1px solid var(--garden-color-border-subtle, #e8eaec);
    transition: background-color 0.15s ease-in-out;
  }

  .garden-row--selected {
    background-color: var(--garden-color-background-primary, #edf7ff);
  }

  .garden-row--focused {
    box-shadow: inset 0 0 0 2px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  :global(.garden-thead) .garden-row {
    border-bottom: none;
  }
</style>
