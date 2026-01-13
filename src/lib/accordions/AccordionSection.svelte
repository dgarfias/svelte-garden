<!--
  Svelte Garden - AccordionSection Component
  
  Individual accordion section with proper ARIA relationships.
  Works with parent Accordion for coordinated expansion behavior.
-->
<script lang="ts">
  import type { AccordionSectionProps } from './types';
  import type { Snippet } from 'svelte';
  import { setAccordionContext } from './context';
  import { getContext, onMount } from 'svelte';
  import { ACCORDION_ROOT_KEY } from './Accordion.svelte';

  interface Props extends AccordionSectionProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isExpanded: controlledExpanded,
    onToggle,
    ...restProps
  }: Props = $props();

  // Generate unique ID for ARIA relationships
  const sectionId = `garden-accordion-${Math.random().toString(36).slice(2, 9)}`;
  
  // Get root accordion context if available
  const rootContext = getContext<{
    expandedSections: number[];
    toggleSection: (index: number) => void;
    isSectionExpanded: (index: number) => boolean;
    isExpandable: boolean;
    isCollapsible: boolean;
    isCompact: boolean;
    level: number;
  } | undefined>(ACCORDION_ROOT_KEY);

  // Section index for root accordion coordination
  let sectionIndex = $state(-1);

  // Track our index by counting previous siblings on mount
  onMount(() => {
    const section = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (section && section.parentElement) {
      const siblings = Array.from(section.parentElement.children).filter(
        el => el.classList.contains('garden-accordion-section')
      );
      sectionIndex = siblings.indexOf(section);
    }
  });
  
  // Internal expanded state (for standalone use without root Accordion)
  // Using $derived for initial value to avoid state_referenced_locally warning
  const initialExpanded = $derived(controlledExpanded ?? false);
  let internalExpanded = $state(false);
  
  // Sync internal state with controlled prop
  $effect(() => {
    internalExpanded = initialExpanded;
  });
  
  // Determine actual expanded state
  const isExpanded = $derived(() => {
    // Controlled mode takes priority
    if (controlledExpanded !== undefined) {
      return controlledExpanded;
    }
    // If we have root context and a valid index, use that
    if (rootContext && sectionIndex >= 0) {
      return rootContext.isSectionExpanded(sectionIndex);
    }
    // Fallback to internal state
    return internalExpanded;
  });

  function toggle() {
    if (controlledExpanded !== undefined) {
      // Controlled mode - call callback
      onToggle?.(!controlledExpanded);
    } else if (rootContext && sectionIndex >= 0) {
      // Coordinated mode via root Accordion
      rootContext.toggleSection(sectionIndex);
      onToggle?.(rootContext.isSectionExpanded(sectionIndex));
    } else {
      // Standalone uncontrolled mode
      internalExpanded = !internalExpanded;
      onToggle?.(internalExpanded);
    }
  }

  // Get level from root context or default
  const level = $derived(rootContext?.level ?? 3);

  setAccordionContext({
    get isExpanded() { return isExpanded(); },
    toggle,
    get level() { return level; },
    sectionId
  });

  const sectionClasses = $derived([
    'garden-accordion-section',
    isExpanded() && 'garden-accordion-section--expanded',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={sectionClasses}
  data-garden-id="accordions.section"
  data-section-id={sectionId}
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-accordion-section {
    /* Section container - display block for proper stacking */
    display: block;
  }
</style>
