<!--
  Svelte Garden - Accordion Component
  
  Container for accordion sections with controlled expansion behavior.
  
  @example
  <Accordion>
    <AccordionSection>
      <AccordionHeader>Section 1</AccordionHeader>
      <AccordionPanel>Content 1</AccordionPanel>
    </AccordionSection>
  </Accordion>
  
  @example
  Multiple sections can be open
  <Accordion isExpandable>
    ...
  </Accordion>
-->
<script lang="ts" module>
  // Accordion context key for parent-level state
  export const ACCORDION_ROOT_KEY = Symbol('garden-accordion-root');
</script>

<script lang="ts">
  import type { AccordionProps } from './types';
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';

  interface Props extends AccordionProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isExpandable = false,
    isBordered = false,
    isCompact = false,
    isCollapsible = true,
    level = 3,
    ...restProps
  }: Props = $props();

  // Track expanded sections (array of section indices)
  let expandedSections = $state<number[]>([]);

  function toggleSection(sectionIndex: number) {
    const isCurrentlyExpanded = expandedSections.includes(sectionIndex);
    
    if (isCurrentlyExpanded) {
      // Collapsing
      if (!isCollapsible && expandedSections.length === 1) {
        // Cannot collapse the last section if isCollapsible=false
        return;
      }
      expandedSections = expandedSections.filter(i => i !== sectionIndex);
    } else {
      // Expanding
      if (isExpandable) {
        // Multiple can be open - add to list
        expandedSections = [...expandedSections, sectionIndex];
      } else {
        // Only one can be open - replace
        expandedSections = [sectionIndex];
      }
    }
  }

  function isSectionExpanded(sectionIndex: number): boolean {
    return expandedSections.includes(sectionIndex);
  }

  // Provide root context for sections to register
  setContext(ACCORDION_ROOT_KEY, {
    get expandedSections() { return expandedSections; },
    toggleSection,
    isSectionExpanded,
    get isExpandable() { return isExpandable; },
    get isCollapsible() { return isCollapsible; },
    get isCompact() { return isCompact; },
    get level() { return level; }
  });

  const accordionClasses = $derived([
    'garden-accordion',
    isBordered && 'garden-accordion--bordered',
    isCompact && 'garden-accordion--compact',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={accordionClasses}
  data-garden-id="accordions.accordion"
  data-level={level}
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-accordion {
    display: flex;
    flex-direction: column;
  }

  .garden-accordion--bordered {
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    overflow: hidden;
  }

  .garden-accordion--bordered :global(.garden-accordion-section + .garden-accordion-section) {
    border-top: 1px solid var(--garden-color-border-default, #d8dcde);
  }
</style>
