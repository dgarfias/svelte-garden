/**
 * Svelte Garden - Accordions Module
 */

export { default as Accordion } from './Accordion.svelte';
export { default as AccordionSection } from './AccordionSection.svelte';
export { default as AccordionHeader } from './AccordionHeader.svelte';
export { default as AccordionPanel } from './AccordionPanel.svelte';

export { setAccordionContext, getAccordionContext } from './context';

export type {
  AccordionProps,
  AccordionSectionProps,
  AccordionHeaderProps,
  AccordionPanelProps,
  AccordionContextValue
} from './types';
