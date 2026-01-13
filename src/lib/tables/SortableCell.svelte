<!--
  Svelte Garden - SortableCell Component
  
  A sortable table header cell with button interaction.
  Wraps content in a button for proper keyboard accessibility.
  
  @example
  <SortableCell 
    sort="asc" 
    onclick={() => toggleSort('name')}
  >
    Name
  </SortableCell>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export type SortDirection = 'asc' | 'desc' | undefined;

  interface SortableCellProps {
    /** Current sort direction */
    sort?: SortDirection;
    /** Props to pass to the wrapping th element */
    cellProps?: {
      isMinimum?: boolean;
      isTruncated?: boolean;
      hasOverflow?: boolean;
      class?: string;
    };
    /** Cell width */
    width?: string | number;
  }

  interface Props extends SortableCellProps, Omit<HTMLButtonAttributes, 'class'> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className = '',
    sort,
    cellProps = {},
    width,
    ...restProps
  }: Props = $props();

  const ariaSortValue = $derived(() => {
    if (sort === 'asc') return 'ascending';
    if (sort === 'desc') return 'descending';
    return 'none';
  });

  const cellClasses = $derived([
    'garden-sortable-cell',
    cellProps.isMinimum && 'garden-sortable-cell--minimum',
    cellProps.isTruncated && 'garden-sortable-cell--truncated',
    cellProps.hasOverflow && 'garden-sortable-cell--overflow',
    cellProps.class
  ].filter(Boolean).join(' '));

  const buttonClasses = $derived([
    'garden-sortable-btn',
    sort && 'garden-sortable-btn--active',
    sort === 'asc' && 'garden-sortable-btn--asc',
    sort === 'desc' && 'garden-sortable-btn--desc',
    className
  ].filter(Boolean).join(' '));

  const cellStyles = $derived(
    width ? `width: ${typeof width === 'number' ? `${width}px` : width}` : ''
  );
</script>

<th
  class={cellClasses}
  style={cellStyles || undefined}
  aria-sort={ariaSortValue()}
  data-garden-id="tables.sortable_cell"
>
  <button
    type="button"
    class={buttonClasses}
    {...restProps}
  >
    <span class="garden-sortable-btn__content">
      {#if children}{@render children()}{/if}
    </span>
    <span class="garden-sortable-btn__icons" aria-hidden="true">
      <!-- Stroke icon (shown when no sort) -->
      <svg class="garden-sortable-btn__stroke-icon" viewBox="0 0 12 12" width="12" height="12">
        <path fill="currentColor" d="M6 2.5l2.5 3h-5zm0 7l2.5-3h-5z" opacity="0.4"/>
      </svg>
      <!-- Fill icon (shown when sorted) -->
      <svg class="garden-sortable-btn__fill-icon" viewBox="0 0 12 12" width="12" height="12">
        {#if sort === 'asc'}
          <path fill="currentColor" d="M6 2.5l2.5 3h-5z"/>
        {:else if sort === 'desc'}
          <path fill="currentColor" d="M6 9.5l2.5-3h-5z"/>
        {:else}
          <path fill="currentColor" d="M6 2.5l2.5 3h-5zm0 7l2.5-3h-5z"/>
        {/if}
      </svg>
    </span>
  </button>
</th>

<style>
  .garden-sortable-cell {
    padding: 0;
    text-align: left;
    font-weight: 600;
    color: #5c6970;
    background-color: #f8f9f9;
    vertical-align: middle;
  }

  .garden-sortable-cell--minimum {
    width: 1px;
  }

  .garden-sortable-cell--truncated {
    max-width: 1px;
  }

  .garden-sortable-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 8px;
    margin: 0;
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    font-weight: 600;
    text-align: inherit;
    cursor: pointer;
    transition: color 0.1s ease-in-out;
  }

  .garden-sortable-btn:hover {
    color: #2f3941;
  }

  .garden-sortable-btn:focus {
    outline: none;
  }

  .garden-sortable-btn:focus-visible {
    outline: 2px solid #1f73b7;
    outline-offset: -2px;
  }

  .garden-sortable-btn__content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .garden-sortable-btn__icons {
    position: relative;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }

  .garden-sortable-btn__stroke-icon,
  .garden-sortable-btn__fill-icon {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.15s ease-in-out;
  }

  /* Default: show stroke icon, hide fill icon */
  .garden-sortable-btn__stroke-icon {
    opacity: 1;
  }

  .garden-sortable-btn__fill-icon {
    opacity: 0;
  }

  /* When sorted: hide stroke icon, show fill icon */
  .garden-sortable-btn--active .garden-sortable-btn__stroke-icon {
    opacity: 0;
  }

  .garden-sortable-btn--active .garden-sortable-btn__fill-icon {
    opacity: 1;
    color: #1f73b7;
  }

  /* Hover: show fill icon in muted color */
  .garden-sortable-btn:hover:not(.garden-sortable-btn--active) .garden-sortable-btn__stroke-icon {
    opacity: 0;
  }

  .garden-sortable-btn:hover:not(.garden-sortable-btn--active) .garden-sortable-btn__fill-icon {
    opacity: 0.5;
  }

  /* RTL support */
  :global([dir="rtl"]) .garden-sortable-cell {
    text-align: right;
  }

  :global([dir="rtl"]) .garden-sortable-btn__icons {
    margin-left: 0;
    margin-right: 4px;
  }

  /* Size variants (inherited from parent table) */
  :global(.garden-table--small) .garden-sortable-btn {
    padding: 8px;
  }

  :global(.garden-table--large) .garden-sortable-btn {
    padding: 16px 12px;
  }

  /* Dark mode */
  :global([data-garden-color-scheme="dark"]) .garden-sortable-cell {
    background-color: #1f252d;
    color: #c2c8cc;
  }

  :global([data-garden-color-scheme="dark"]) .garden-sortable-btn:hover {
    color: #fff;
  }

  :global([data-garden-color-scheme="dark"]) .garden-sortable-btn--active .garden-sortable-btn__fill-icon {
    color: #5eade0;
  }
</style>
