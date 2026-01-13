<!--
  Svelte Garden - Row Component
  
  A flex row container for grid columns.
-->
<script lang="ts">
  import type { RowProps, AlignItems, JustifyContent, Wrap } from './types';
  import type { Snippet } from 'svelte';
  import { getGridContext } from './context';

  interface Props extends RowProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    alignItems,
    alignItemsXs,
    alignItemsSm,
    alignItemsMd,
    alignItemsLg,
    alignItemsXl,
    justifyContent,
    justifyContentXs,
    justifyContentSm,
    justifyContentMd,
    justifyContentLg,
    justifyContentXl,
    wrap = 'wrap',
    wrapXs,
    wrapSm,
    wrapMd,
    wrapLg,
    wrapXl,
    ...restProps
  }: Props = $props();

  const gridContext = getGridContext();

  const rowClasses = $derived([
    'garden-row',
    className
  ].filter(Boolean).join(' '));

  // Map align-items values to CSS
  function getAlignItems(value: AlignItems | undefined): string | undefined {
    if (!value) return undefined;
    const map: Record<string, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch'
    };
    return map[value];
  }

  // Map justify-content values to CSS
  function getJustifyContent(value: JustifyContent | undefined): string | undefined {
    if (!value) return undefined;
    const map: Record<string, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around'
    };
    return map[value];
  }

  // Map wrap values to CSS
  function getFlexWrap(value: Wrap | undefined): string | undefined {
    if (!value) return undefined;
    return value; // nowrap, wrap, wrap-reverse map directly
  }
</script>

<div
  class={rowClasses}
  data-garden-id="grid.row"
  style:--garden-row-align={getAlignItems(alignItems)}
  style:--garden-row-justify={getJustifyContent(justifyContent)}
  style:--garden-row-wrap={getFlexWrap(wrap)}
  style:--garden-row-align-xs={getAlignItems(alignItemsXs)}
  style:--garden-row-align-sm={getAlignItems(alignItemsSm)}
  style:--garden-row-align-md={getAlignItems(alignItemsMd)}
  style:--garden-row-align-lg={getAlignItems(alignItemsLg)}
  style:--garden-row-align-xl={getAlignItems(alignItemsXl)}
  style:--garden-row-justify-xs={getJustifyContent(justifyContentXs)}
  style:--garden-row-justify-sm={getJustifyContent(justifyContentSm)}
  style:--garden-row-justify-md={getJustifyContent(justifyContentMd)}
  style:--garden-row-justify-lg={getJustifyContent(justifyContentLg)}
  style:--garden-row-justify-xl={getJustifyContent(justifyContentXl)}
  style:--garden-row-wrap-xs={getFlexWrap(wrapXs)}
  style:--garden-row-wrap-sm={getFlexWrap(wrapSm)}
  style:--garden-row-wrap-md={getFlexWrap(wrapMd)}
  style:--garden-row-wrap-lg={getFlexWrap(wrapLg)}
  style:--garden-row-wrap-xl={getFlexWrap(wrapXl)}
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-row {
    display: flex;
    flex-wrap: var(--garden-row-wrap, wrap);
    align-items: var(--garden-row-align, stretch);
    justify-content: var(--garden-row-justify, flex-start);
    margin-left: calc(var(--garden-grid-gutter, 16px) / -2);
    margin-right: calc(var(--garden-grid-gutter, 16px) / -2);
    box-sizing: border-box;
  }

  /* Responsive styles using CSS variables */
  @media (max-width: 575px) {
    .garden-row {
      align-items: var(--garden-row-align-xs, var(--garden-row-align, stretch));
      justify-content: var(--garden-row-justify-xs, var(--garden-row-justify, flex-start));
      flex-wrap: var(--garden-row-wrap-xs, var(--garden-row-wrap, wrap));
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    .garden-row {
      align-items: var(--garden-row-align-sm, var(--garden-row-align, stretch));
      justify-content: var(--garden-row-justify-sm, var(--garden-row-justify, flex-start));
      flex-wrap: var(--garden-row-wrap-sm, var(--garden-row-wrap, wrap));
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .garden-row {
      align-items: var(--garden-row-align-md, var(--garden-row-align, stretch));
      justify-content: var(--garden-row-justify-md, var(--garden-row-justify, flex-start));
      flex-wrap: var(--garden-row-wrap-md, var(--garden-row-wrap, wrap));
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .garden-row {
      align-items: var(--garden-row-align-lg, var(--garden-row-align, stretch));
      justify-content: var(--garden-row-justify-lg, var(--garden-row-justify, flex-start));
      flex-wrap: var(--garden-row-wrap-lg, var(--garden-row-wrap, wrap));
    }
  }

  @media (min-width: 1200px) {
    .garden-row {
      align-items: var(--garden-row-align-xl, var(--garden-row-align, stretch));
      justify-content: var(--garden-row-justify-xl, var(--garden-row-justify, flex-start));
      flex-wrap: var(--garden-row-wrap-xl, var(--garden-row-wrap, wrap));
    }
  }
</style>
