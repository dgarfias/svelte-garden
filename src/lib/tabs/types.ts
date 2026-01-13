/**
 * Svelte Garden - Tabs Types
 */

import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export interface TabsProps extends HTMLAttributes<HTMLElement> {
  /** Currently selected tab index */
  selectedIndex?: number;
  /** Whether tabs are vertical */
  isVertical?: boolean;
  /** Callback when tab changes */
  onChange?: (selectedIndex: number) => void;
}

export interface TabListProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label */
  'aria-label'?: string;
}

export interface TabProps extends HTMLButtonAttributes {
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Tab index for selection */
  index?: number;
}

export interface TabPanelProps extends HTMLAttributes<HTMLElement> {
  /** Panel index */
  index?: number;
}

export interface TabsContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isVertical: boolean;
  tabsId: string;
  isRtl: boolean;
}
