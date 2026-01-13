/**
 * Svelte Garden - Modal Context
 */

import { getContext, setContext } from 'svelte';
import type { ModalContextValue } from './types';

const MODAL_CONTEXT_KEY = Symbol('garden-modal');

export function setModalContext(context: ModalContextValue): void {
  setContext(MODAL_CONTEXT_KEY, context);
}

export function getModalContext(): ModalContextValue | undefined {
  return getContext<ModalContextValue>(MODAL_CONTEXT_KEY);
}
