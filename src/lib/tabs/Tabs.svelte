<!--
  Svelte Garden - Tabs Component
  
  Container for tabbed interface.
  
  @example
  <Tabs selectedIndex={0} onChange={(i) => console.log(i)}>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
    </TabList>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </Tabs>
-->
<script lang="ts">
  import type { TabsProps } from './types';
  import type { Snippet } from 'svelte';
  import { setTabsContext } from './context';
  import { useRtl } from '../theming';

  interface Props extends TabsProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    selectedIndex = 0,
    isVertical = false,
    onChange,
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  // Generate unique ID for ARIA relationships
  const tabsId = $derived(`garden-tabs-${Math.random().toString(36).slice(2, 9)}`);

  // Track the selected index prop reactively  
  const trackedSelectedIndex = $derived(selectedIndex);
  let internalIndex = $state(0);

  // Sync internal index with prop
  $effect(() => {
    internalIndex = trackedSelectedIndex;
  });

  function handleSetSelectedIndex(index: number) {
    internalIndex = index;
    onChange?.(index);
  }

  setTabsContext({
    get selectedIndex() { return internalIndex; },
    setSelectedIndex: handleSetSelectedIndex,
    get isVertical() { return isVertical; },
    get tabsId() { return tabsId; },
    get isRtl() { return isRtl; }
  });

  const tabsClasses = $derived([
    'garden-tabs',
    isVertical && 'garden-tabs--vertical',
    isRtl && 'garden-tabs--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={tabsClasses}
  data-garden-id="tabs.tabs"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-tabs {
    display: flex;
    flex-direction: column;
  }

  .garden-tabs--vertical {
    flex-direction: row;
  }

  .garden-tabs--rtl {
    direction: rtl;
  }

  /* RTL vertical tabs: reverse row direction */
  .garden-tabs--rtl.garden-tabs--vertical {
    flex-direction: row-reverse;
  }
</style>
