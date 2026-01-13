/**
 * Svelte Garden - Field Context
 */

import { getContext, setContext } from 'svelte';
import type { FieldContextValue } from './types';

const FIELD_CONTEXT_KEY = Symbol('garden-field');

export function setFieldContext(context: FieldContextValue): void {
  setContext(FIELD_CONTEXT_KEY, context);
}

export function getFieldContext(): FieldContextValue | undefined {
  return getContext<FieldContextValue>(FIELD_CONTEXT_KEY);
}
