<!--
  Svelte Garden - OffsetPagination Component
  
  A page-based pagination component for navigating through pages of content.
-->
<script lang="ts">
  import type { OffsetPaginationProps, PaginationLabels } from './types';
  import { useRtl } from '../theming';
  import { ChevronLeftStroke, ChevronRightStroke } from '../icons';

  interface Props extends OffsetPaginationProps {}

  let {
    currentPage = 1,
    totalPages,
    pagePadding = 2,
    pageGap = 2,
    onChange,
    labels,
    class: className = '',
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  // Default labels
  const defaultLabels: PaginationLabels = {
    previous: 'Previous page',
    next: 'Next page',
    gap: 'Page gap',
    renderPage: (page: number) => `Page ${page}`
  };

  const effectiveLabels = $derived({ ...defaultLabels, ...labels });

  // Calculate which pages to show
  const pages = $derived.by(() => {
    const result: Array<{ type: 'page' | 'gap'; page?: number }> = [];
    const PADDING = pagePadding;
    const GAP = pageGap;

    for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
      // Always display current, first, and last pages
      if (pageIndex === currentPage || pageIndex < GAP || pageIndex > totalPages - GAP + 1) {
        result.push({ type: 'page', page: pageIndex });
        continue;
      }

      let minimum: number;
      let maximum: number;

      if (currentPage <= GAP + PADDING) {
        minimum = GAP + 1;
        maximum = minimum + PADDING * 2;
      } else if (currentPage >= totalPages - GAP - PADDING) {
        maximum = totalPages - GAP;
        minimum = maximum - PADDING * 2;
      } else {
        minimum = currentPage - PADDING;
        maximum = currentPage + PADDING;
      }

      // Display padded window of pages
      if (
        (pageIndex >= minimum && pageIndex <= currentPage) ||
        (pageIndex >= currentPage && pageIndex <= maximum)
      ) {
        result.push({ type: 'page', page: pageIndex });
        continue;
      }

      // Handle start gap
      if (pageIndex === GAP) {
        if (minimum > GAP + 1 && currentPage > GAP + PADDING + 1) {
          result.push({ type: 'gap' });
        } else {
          result.push({ type: 'page', page: pageIndex });
        }
        continue;
      }

      // Handle end gap
      if (pageIndex === totalPages - GAP + 1) {
        if (maximum < totalPages - GAP && currentPage < totalPages - GAP - PADDING) {
          result.push({ type: 'gap' });
        } else {
          result.push({ type: 'page', page: pageIndex });
        }
        continue;
      }
    }

    return result;
  });

  const isFirstPage = $derived(currentPage === 1);
  const isLastPage = $derived(currentPage === totalPages);

  function handlePrevious() {
    if (!isFirstPage && onChange) {
      onChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (!isLastPage && onChange) {
      onChange(currentPage + 1);
    }
  }

  function handlePageClick(page: number) {
    if (onChange && page !== currentPage) {
      onChange(page);
    }
  }
</script>

<nav
  class="garden-pagination {className}"
  class:garden-pagination--rtl={isRtl}
  data-garden-id="pagination.offset"
  aria-label="Pagination"
  {...restProps}
>
  <ul class="garden-pagination__list">
    <!-- Previous button -->
    <li class="garden-pagination__item">
      <button
        type="button"
        class="garden-pagination__nav garden-pagination__nav--previous"
        class:garden-pagination__nav--hidden={isFirstPage}
        aria-label={effectiveLabels.previous}
        disabled={isFirstPage}
        onclick={handlePrevious}
      >
        <ChevronLeftStroke />
      </button>
    </li>

    <!-- Pages -->
    {#each pages as item, index}
      {#if item.type === 'gap'}
        <li class="garden-pagination__item garden-pagination__item--gap" aria-hidden="true">
          <span class="garden-pagination__gap">...</span>
        </li>
      {:else if item.page !== undefined}
        <li class="garden-pagination__item">
          <button
            type="button"
            class="garden-pagination__page"
            class:garden-pagination__page--current={item.page === currentPage}
            aria-label={effectiveLabels.renderPage?.(item.page)}
            aria-current={item.page === currentPage ? 'page' : undefined}
            onclick={() => handlePageClick(item.page!)}
          >
            {item.page}
          </button>
        </li>
      {/if}
    {/each}

    <!-- Next button -->
    <li class="garden-pagination__item">
      <button
        type="button"
        class="garden-pagination__nav garden-pagination__nav--next"
        class:garden-pagination__nav--hidden={isLastPage}
        aria-label={effectiveLabels.next}
        disabled={isLastPage}
        onclick={handleNext}
      >
        <ChevronRightStroke />
      </button>
    </li>
  </ul>
</nav>

<style>
  .garden-pagination {
    display: inline-block;
  }

  .garden-pagination--rtl {
    direction: rtl;
  }

  /* RTL: rotate navigation icons */
  .garden-pagination--rtl .garden-pagination__nav svg {
    transform: rotate(180deg);
  }

  .garden-pagination__list {
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .garden-pagination__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .garden-pagination__nav,
  .garden-pagination__page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--garden-color-foreground-default, #2f3941);
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
  }

  .garden-pagination__nav:hover:not(:disabled),
  .garden-pagination__page:hover:not(:disabled):not(.garden-pagination__page--current) {
    background-color: var(--garden-color-background-subtle, #e9ebed);
  }

  .garden-pagination__nav:focus-visible,
  .garden-pagination__page:focus-visible {
    outline: 2px solid var(--garden-color-border-primary-emphasis, #1f73b7);
    outline-offset: 2px;
  }

  .garden-pagination__nav:disabled {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  .garden-pagination__nav--hidden {
    visibility: hidden;
  }

  .garden-pagination__page--current {
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
    color: var(--garden-color-foreground-on-emphasis, #fff);
  }

  .garden-pagination__page--current:hover {
    background-color: var(--garden-palette-blue-800, #144a75);
  }

  .garden-pagination__gap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    color: var(--garden-color-foreground-subtle, #68737d);
    font-size: 14px;
  }

  .garden-pagination__item--gap {
    cursor: default;
  }
</style>
