<!--
  Svelte Garden - TabList Component
  
  Container for tab buttons.
-->
<script lang="ts">
  import type { TabListProps } from './types';
  import type { Snippet } from 'svelte';
  import { getTabsContext } from './context';

  interface Props extends TabListProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    'aria-label': ariaLabel = 'Tabs',
    ...restProps
  }: Props = $props();

  const context = getTabsContext();

  const tabListClasses = $derived([
    'garden-tablist',
    context?.isVertical && 'garden-tablist--vertical',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  role="tablist"
  class={tabListClasses}
  aria-label={ariaLabel}
  aria-orientation={context?.isVertical ? 'vertical' : 'horizontal'}
  data-garden-id="tabs.tablist"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-tablist {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--garden-color-border-default, #d8dcde);
    padding: 0;
    white-space: nowrap;
    font-size: 14px;
    line-height: 1.43;
    color: var(--garden-color-foreground-default, #2f3941);
    transition: border-color 0.25s ease-in-out;
  }

  .garden-tablist--vertical {
    flex-direction: column;
    margin-bottom: 0;
    border-bottom: none;
    border-right: 1px solid var(--garden-color-border-default, #d8dcde);
  }
</style>
