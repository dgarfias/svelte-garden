<!--
  Svelte Garden - AccordionPanel Component
  
  Collapsible content panel with proper ARIA relationships.
-->
<script lang="ts">
  import type { AccordionPanelProps } from './types';
  import type { Snippet } from 'svelte';
  import { getAccordionContext } from './context';

  interface Props extends AccordionPanelProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isAnimated = true,
    ...restProps
  }: Props = $props();

  const context = getAccordionContext();
  
  const isExpanded = $derived(context?.isExpanded ?? false);
  const panelId = $derived(context ? `${context.sectionId}-panel` : undefined);
  const headerId = $derived(context ? `${context.sectionId}-header` : undefined);

  const panelClasses = $derived([
    'garden-accordion-panel',
    isAnimated && 'garden-accordion-panel--animated',
    className
  ].filter(Boolean).join(' '));
</script>

{#if isExpanded}
  <div
    id={panelId}
    class={panelClasses}
    role="region"
    aria-labelledby={headerId}
    data-garden-id="accordions.panel"
    {...restProps}
  >
    <div class="garden-accordion-panel__content">
      {#if children}{@render children()}{/if}
    </div>
  </div>
{/if}

<style>
  .garden-accordion-panel {
    overflow: hidden;
  }

  .garden-accordion-panel__content {
    padding: 0 16px 16px;
    color: var(--garden-color-foreground-default, #2f3941);
    font-size: 14px;
    line-height: 20px;
  }

  .garden-accordion-panel--animated {
    animation: garden-accordion-expand 0.2s ease-out;
  }

  @keyframes garden-accordion-expand {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.garden-accordion--compact) .garden-accordion-panel__content {
    padding: 0 12px 12px;
  }
</style>
