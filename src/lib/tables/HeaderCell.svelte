<!--
  Svelte Garden - HeaderCell Component
-->
<script lang="ts">
  import type { HeaderCellProps } from './types';
  import type { Snippet } from 'svelte';
  import { SortStroke, ChevronUpFill, ChevronDownFill } from '../icons';

  interface Props extends HeaderCellProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    sortDirection = null,
    isSortable = false,
    width,
    minWidth,
    isTruncated = false,
    ...restProps
  }: Props = $props();

  const headerCellClasses = $derived([
    'garden-th',
    isSortable && 'garden-th--sortable',
    sortDirection && `garden-th--sort-${sortDirection}`,
    isTruncated && 'garden-th--truncated',
    className
  ].filter(Boolean).join(' '));

  const cellStyles = $derived([
    width && `width: ${typeof width === 'number' ? `${width}px` : width}`,
    minWidth && `min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth}`
  ].filter(Boolean).join('; '));
</script>

<th
  class={headerCellClasses}
  style={cellStyles}
  aria-sort={sortDirection ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
  data-garden-id="tables.header-cell"
  {...restProps}
>
  <span class="garden-th__content">
    {#if children}{@render children()}{/if}
    {#if isSortable}
      <span class="garden-th__sort-icon">
        {#if sortDirection === 'asc'}
          <ChevronUpFill size={12} />
        {:else if sortDirection === 'desc'}
          <ChevronDownFill size={12} />
        {:else}
          <SortStroke size={12} />
        {/if}
      </span>
    {/if}
  </span>
</th>

<style>
  .garden-th {
    padding: 12px 8px;
    text-align: left;
    font-weight: 600;
    color: var(--garden-color-foreground-subtle, #5c6970);
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    vertical-align: middle;
  }

  .garden-th__content {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .garden-th--sortable {
    cursor: pointer;
    user-select: none;
  }

  .garden-th--sortable:hover {
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-th__sort-icon {
    flex-shrink: 0;
  }

  .garden-th__sort-icon :global(svg) {
    width: 12px;
    height: 12px;
  }

  .garden-th--sort-asc .garden-th__sort-icon,
  .garden-th--sort-desc .garden-th__sort-icon {
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-th--truncated {
    max-width: 1px;
  }

  .garden-th--truncated .garden-th__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.garden-table--small) .garden-th {
    padding: 8px;
  }

  :global(.garden-table--large) .garden-th {
    padding: 16px 12px;
  }
</style>
