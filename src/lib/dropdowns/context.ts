/**
 * Svelte Garden - Menu Context
 */

import { getContext, setContext } from 'svelte';
import type { MenuContextValue } from './types';

const MENU_CONTEXT_KEY = Symbol('garden-menu');

export function setMenuContext(context: MenuContextValue): void {
  setContext(MENU_CONTEXT_KEY, context);
}

export function getMenuContext(): MenuContextValue | undefined {
  return getContext<MenuContextValue>(MENU_CONTEXT_KEY);
}
