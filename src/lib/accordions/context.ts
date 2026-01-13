import { getContext, setContext } from 'svelte';
import type { AccordionContextValue } from './types';

const ACCORDION_CONTEXT_KEY = Symbol('garden-accordion');

export function setAccordionContext(value: AccordionContextValue) {
  setContext(ACCORDION_CONTEXT_KEY, value);
}

export function getAccordionContext(): AccordionContextValue | undefined {
  return getContext<AccordionContextValue>(ACCORDION_CONTEXT_KEY);
}
