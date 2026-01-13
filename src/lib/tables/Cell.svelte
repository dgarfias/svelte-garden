<!--
  Svelte Garden - Cell Component
-->
<script lang="ts">
  import type { CellProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends CellProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    hasOverflow = false,
    isTruncated = false,
    ...restProps
  }: Props = $props();

  const cellClasses = $derived([
    'garden-td',
    hasOverflow && 'garden-td--has-overflow',
    isTruncated && 'garden-td--truncated',
    className
  ].filter(Boolean).join(' '));
</script>

<td class={cellClasses} data-garden-id="tables.cell" {...restProps}>
  {#if children}{@render children()}{/if}
</td>

<style>
  .garden-td {
    padding: 12px 8px;
    vertical-align: middle;
  }

  .garden-td--has-overflow {
    position: relative;
  }

  .garden-td--truncated {
    max-width: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.garden-table--small) .garden-td {
    padding: 8px;
  }

  :global(.garden-table--large) .garden-td {
    padding: 16px 12px;
  }
</style>
