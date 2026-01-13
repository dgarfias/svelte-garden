<!--
  Svelte Garden - CursorPagination Component
  
  A cursor-based pagination component for infinite scroll or cursor navigation.
-->
<script lang="ts">
  import type { CursorPaginationProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends CursorPaginationProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();
</script>

<nav
  class="garden-cursor-pagination {className}"
  class:garden-cursor-pagination--rtl={isRtl}
  data-garden-id="pagination.cursor"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</nav>

<style>
  .garden-cursor-pagination {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .garden-cursor-pagination--rtl {
    direction: rtl;
  }
</style>
