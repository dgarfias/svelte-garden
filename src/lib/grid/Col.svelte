<!--
  Svelte Garden - Col Component
  
  A responsive column component for the grid system.
  Uses mobile-first (min-width) breakpoints like React.
-->
<script lang="ts">
  import type { ColProps, AlignSelf, TextAlign, Breakpoint } from './types';
  import type { Snippet } from 'svelte';
  import { getGridContext } from './context';

  interface Props extends ColProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size,
    xs,
    sm,
    md,
    lg,
    xl,
    alignSelf,
    alignSelfXs,
    alignSelfSm,
    alignSelfMd,
    alignSelfLg,
    alignSelfXl,
    textAlign,
    textAlignXs,
    textAlignSm,
    textAlignMd,
    textAlignLg,
    textAlignXl,
    offset,
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    order,
    orderXs,
    orderSm,
    orderMd,
    orderLg,
    orderXl,
    ...restProps
  }: Props = $props();

  const gridContext = getGridContext();

  const colClasses = $derived([
    'garden-col',
    className
  ].filter(Boolean).join(' '));

  // Map align-self values to CSS
  function getAlignSelf(value: AlignSelf | undefined): string | undefined {
    if (!value) return undefined;
    if (value === 'auto') return 'auto';
    const map: Record<string, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch'
    };
    return map[value];
  }

  // Map text-align values to CSS
  function getTextAlign(value: TextAlign | undefined): string | undefined {
    if (!value) return undefined;
    const map: Record<string, string> = {
      start: 'left',
      end: 'right',
      center: 'center',
      justify: 'justify'
    };
    return map[value];
  }

  // Calculate column width based on size and total columns
  function getColWidth(colSize: Breakpoint | undefined, columns: number | string): string | undefined {
    if (colSize === undefined || colSize === null) return undefined;
    if (colSize === true) return '0'; // Auto-sizing
    if (colSize === false) return undefined;
    if (colSize === 'auto') return 'auto';
    
    const cols = typeof columns === 'string' ? parseInt(columns, 10) : columns;
    const sizeNum = typeof colSize === 'string' ? parseFloat(colSize) : colSize;
    
    return String((sizeNum / cols) * 100);
  }

  // Calculate offset percentage
  function getOffset(offsetValue: number | string | undefined, columns: number | string): string | undefined {
    if (offsetValue === undefined || offsetValue === null) return undefined;
    
    const cols = typeof columns === 'string' ? parseInt(columns, 10) : columns;
    const offsetNum = typeof offsetValue === 'string' ? parseFloat(offsetValue) : offsetValue;
    
    return String((offsetNum / cols) * 100);
  }

  // Handle special order values
  function getOrder(orderValue: number | string | undefined): string | undefined {
    if (orderValue === undefined || orderValue === null) return undefined;
    if (orderValue === 'first') return '-1';
    if (orderValue === 'last') return String(Number(gridContext.columns) + 1);
    return String(orderValue);
  }

  // Get size value (for flex-basis)
  const sizeWidth = $derived(getColWidth(size, gridContext.columns));
  const xsWidth = $derived(getColWidth(xs, gridContext.columns));
  const smWidth = $derived(getColWidth(sm, gridContext.columns));
  const mdWidth = $derived(getColWidth(md, gridContext.columns));
  const lgWidth = $derived(getColWidth(lg, gridContext.columns));
  const xlWidth = $derived(getColWidth(xl, gridContext.columns));

  // Get offset values
  const offsetPercent = $derived(getOffset(offset, gridContext.columns));
  const offsetXsPercent = $derived(getOffset(offsetXs, gridContext.columns));
  const offsetSmPercent = $derived(getOffset(offsetSm, gridContext.columns));
  const offsetMdPercent = $derived(getOffset(offsetMd, gridContext.columns));
  const offsetLgPercent = $derived(getOffset(offsetLg, gridContext.columns));
  const offsetXlPercent = $derived(getOffset(offsetXl, gridContext.columns));

  // Get order values
  const orderVal = $derived(getOrder(order));
  const orderXsVal = $derived(getOrder(orderXs));
  const orderSmVal = $derived(getOrder(orderSm));
  const orderMdVal = $derived(getOrder(orderMd));
  const orderLgVal = $derived(getOrder(orderLg));
  const orderXlVal = $derived(getOrder(orderXl));

  // Determine if column should auto-size
  const isAutoSize = $derived(size === undefined && !xs && !sm && !md && !lg && !xl);
</script>

<div
  class={colClasses}
  data-garden-id="grid.col"
  class:garden-col--auto={isAutoSize}
  style:--garden-col-size={sizeWidth}
  style:--garden-col-xs={xsWidth}
  style:--garden-col-sm={smWidth}
  style:--garden-col-md={mdWidth}
  style:--garden-col-lg={lgWidth}
  style:--garden-col-xl={xlWidth}
  style:--garden-col-offset={offsetPercent}
  style:--garden-col-offset-xs={offsetXsPercent}
  style:--garden-col-offset-sm={offsetSmPercent}
  style:--garden-col-offset-md={offsetMdPercent}
  style:--garden-col-offset-lg={offsetLgPercent}
  style:--garden-col-offset-xl={offsetXlPercent}
  style:--garden-col-order={orderVal}
  style:--garden-col-order-xs={orderXsVal}
  style:--garden-col-order-sm={orderSmVal}
  style:--garden-col-order-md={orderMdVal}
  style:--garden-col-order-lg={orderLgVal}
  style:--garden-col-order-xl={orderXlVal}
  style:--garden-col-align={getAlignSelf(alignSelf)}
  style:--garden-col-align-xs={getAlignSelf(alignSelfXs)}
  style:--garden-col-align-sm={getAlignSelf(alignSelfSm)}
  style:--garden-col-align-md={getAlignSelf(alignSelfMd)}
  style:--garden-col-align-lg={getAlignSelf(alignSelfLg)}
  style:--garden-col-align-xl={getAlignSelf(alignSelfXl)}
  style:--garden-col-text-align={getTextAlign(textAlign)}
  style:--garden-col-text-align-xs={getTextAlign(textAlignXs)}
  style:--garden-col-text-align-sm={getTextAlign(textAlignSm)}
  style:--garden-col-text-align-md={getTextAlign(textAlignMd)}
  style:--garden-col-text-align-lg={getTextAlign(textAlignLg)}
  style:--garden-col-text-align-xl={getTextAlign(textAlignXl)}
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-col {
    position: relative;
    box-sizing: border-box;
    padding-left: calc(var(--garden-grid-gutter, 16px) / 2);
    padding-right: calc(var(--garden-grid-gutter, 16px) / 2);
    min-width: 0; /* Allow flex items to shrink below content size */
  }

  /* Default: use base size */
  .garden-col:not(.garden-col--auto) {
    flex-basis: calc(var(--garden-col-size, 100) * 1%);
    flex-grow: 0;
    flex-shrink: 0;
    max-width: calc(var(--garden-col-size, 100) * 1%);
    margin-left: calc(var(--garden-col-offset, 0) * 1%);
    order: var(--garden-col-order, 0);
    align-self: var(--garden-col-align, auto);
    text-align: var(--garden-col-text-align, inherit);
  }

  /* Auto-sizing columns - equal width distribution */
  .garden-col.garden-col--auto {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 100%;
  }

  /* 
   * Mobile-first breakpoints (min-width only)
   * Styles cascade up - smaller breakpoints apply to larger screens unless overridden
   * Only apply to non-auto columns
   */

  /* sm: 576px and up */
  @media (min-width: 576px) {
    .garden-col:not(.garden-col--auto) {
      flex-basis: calc(var(--garden-col-sm, var(--garden-col-size, 100)) * 1%);
      max-width: calc(var(--garden-col-sm, var(--garden-col-size, 100)) * 1%);
      margin-left: calc(var(--garden-col-offset-sm, var(--garden-col-offset, 0)) * 1%);
      order: var(--garden-col-order-sm, var(--garden-col-order, 0));
      align-self: var(--garden-col-align-sm, var(--garden-col-align, auto));
      text-align: var(--garden-col-text-align-sm, var(--garden-col-text-align, inherit));
    }
  }

  /* md: 768px and up */
  @media (min-width: 768px) {
    .garden-col:not(.garden-col--auto) {
      flex-basis: calc(var(--garden-col-md, var(--garden-col-sm, var(--garden-col-size, 100))) * 1%);
      max-width: calc(var(--garden-col-md, var(--garden-col-sm, var(--garden-col-size, 100))) * 1%);
      margin-left: calc(var(--garden-col-offset-md, var(--garden-col-offset-sm, var(--garden-col-offset, 0))) * 1%);
      order: var(--garden-col-order-md, var(--garden-col-order-sm, var(--garden-col-order, 0)));
      align-self: var(--garden-col-align-md, var(--garden-col-align-sm, var(--garden-col-align, auto)));
      text-align: var(--garden-col-text-align-md, var(--garden-col-text-align-sm, var(--garden-col-text-align, inherit)));
    }
  }

  /* lg: 992px and up */
  @media (min-width: 992px) {
    .garden-col:not(.garden-col--auto) {
      flex-basis: calc(var(--garden-col-lg, var(--garden-col-md, var(--garden-col-sm, var(--garden-col-size, 100)))) * 1%);
      max-width: calc(var(--garden-col-lg, var(--garden-col-md, var(--garden-col-sm, var(--garden-col-size, 100)))) * 1%);
      margin-left: calc(var(--garden-col-offset-lg, var(--garden-col-offset-md, var(--garden-col-offset-sm, var(--garden-col-offset, 0)))) * 1%);
      order: var(--garden-col-order-lg, var(--garden-col-order-md, var(--garden-col-order-sm, var(--garden-col-order, 0))));
      align-self: var(--garden-col-align-lg, var(--garden-col-align-md, var(--garden-col-align-sm, var(--garden-col-align, auto))));
      text-align: var(--garden-col-text-align-lg, var(--garden-col-text-align-md, var(--garden-col-text-align-sm, var(--garden-col-text-align, inherit))));
    }
  }

  /* xl: 1200px and up */
  @media (min-width: 1200px) {
    .garden-col:not(.garden-col--auto) {
      flex-basis: calc(var(--garden-col-xl, var(--garden-col-lg, var(--garden-col-md, var(--garden-col-sm, var(--garden-col-size, 100))))) * 1%);
      max-width: calc(var(--garden-col-xl, var(--garden-col-lg, var(--garden-col-md, var(--garden-col-sm, var(--garden-col-size, 100))))) * 1%);
      margin-left: calc(var(--garden-col-offset-xl, var(--garden-col-offset-lg, var(--garden-col-offset-md, var(--garden-col-offset-sm, var(--garden-col-offset, 0))))) * 1%);
      order: var(--garden-col-order-xl, var(--garden-col-order-lg, var(--garden-col-order-md, var(--garden-col-order-sm, var(--garden-col-order, 0)))));
      align-self: var(--garden-col-align-xl, var(--garden-col-align-lg, var(--garden-col-align-md, var(--garden-col-align-sm, var(--garden-col-align, auto)))));
      text-align: var(--garden-col-text-align-xl, var(--garden-col-text-align-lg, var(--garden-col-text-align-md, var(--garden-col-text-align-sm, var(--garden-col-text-align, inherit)))));
    }
  }
</style>
