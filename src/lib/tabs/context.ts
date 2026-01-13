import { getContext, setContext } from 'svelte';
import type { TabsContextValue } from './types';

const TABS_CONTEXT_KEY = Symbol('garden-tabs');

export function setTabsContext(value: TabsContextValue) {
  setContext(TABS_CONTEXT_KEY, value);
}

export function getTabsContext(): TabsContextValue | undefined {
  return getContext<TabsContextValue>(TABS_CONTEXT_KEY);
}
