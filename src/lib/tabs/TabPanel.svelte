<!--
  Svelte Garden - TabPanel Component
  
  Content panel for tabs with proper ARIA relationships.
-->
<script lang="ts">
  import type { TabPanelProps } from './types';
  import type { Snippet } from 'svelte';
  import { getTabsContext } from './context';

  interface Props extends TabPanelProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    index = 0,
    ...restProps
  }: Props = $props();

  const context = getTabsContext();
  
  const isSelected = $derived(context?.selectedIndex === index);
  const panelId = $derived(context ? `${context.tabsId}-panel-${index}` : undefined);
  const tabId = $derived(context ? `${context.tabsId}-tab-${index}` : undefined);

  const panelClasses = $derived([
    'garden-tabpanel',
    className
  ].filter(Boolean).join(' '));
</script>

{#if isSelected}
  <div
    role="tabpanel"
    id={panelId}
    class={panelClasses}
    aria-labelledby={tabId}
    tabindex={0}
    data-garden-id="tabs.tabpanel"
    {...restProps}
  >
    {#if children}{@render children()}{/if}
  </div>
{/if}

<style>
  .garden-tabpanel {
    display: block;
  }

  .garden-tabpanel:focus {
    outline: none;
  }

  .garden-tabpanel:focus-visible {
    outline: 2px solid var(--garden-color-border-primary-emphasis, #1f73b7);
    outline-offset: 2px;
  }

  /* Vertical layout: margin for spacing from tablist */
  :global(.garden-tabs--vertical) .garden-tabpanel {
    margin-left: 32px;
    flex: 1;
  }

  :global(.garden-tabs--rtl.garden-tabs--vertical) .garden-tabpanel {
    margin-left: 0;
    margin-right: 32px;
  }
</style>
