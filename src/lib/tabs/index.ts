/**
 * Svelte Garden - Tabs Module
 */

export { default as Tabs } from './Tabs.svelte';
export { default as TabList } from './TabList.svelte';
export { default as Tab } from './Tab.svelte';
export { default as TabPanel } from './TabPanel.svelte';

export { setTabsContext, getTabsContext } from './context';

export type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
  TabsContextValue
} from './types';
