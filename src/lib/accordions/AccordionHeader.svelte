<!--
  Svelte Garden - AccordionHeader Component
  
  Clickable header for accordion section with proper heading semantics.
-->
<script lang="ts">
  import type { AccordionHeaderProps } from './types';
  import type { Snippet } from 'svelte';
  import { getAccordionContext } from './context';
  import { useRtl } from '../theming';
  import { ChevronDownStroke } from '../icons';

  interface Props extends AccordionHeaderProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const context = getAccordionContext();
  const isRtl = useRtl();
  
  const isExpanded = $derived(context?.isExpanded ?? false);
  const level = $derived(context?.level ?? 3);
  const headerId = $derived(context ? `${context.sectionId}-header` : undefined);
  const panelId = $derived(context ? `${context.sectionId}-panel` : undefined);

  const headerClasses = $derived([
    'garden-accordion-header',
    isExpanded && 'garden-accordion-header--expanded',
    isRtl && 'garden-accordion-header--rtl',
    className
  ].filter(Boolean).join(' '));

  function handleClick() {
    context?.toggle();
  }
</script>

<div role="heading" aria-level={level} class="garden-accordion-header-wrapper">
  <button
    type="button"
    id={headerId}
    class={headerClasses}
    aria-expanded={isExpanded}
    aria-controls={panelId}
    onclick={handleClick}
    data-garden-id="accordions.header"
    {...restProps}
  >
    <span class="garden-accordion-header__content">
      {#if children}{@render children()}{/if}
    </span>
    <ChevronDownStroke class="garden-accordion-header__icon" />
  </button>
</div>

<style>
  .garden-accordion-header-wrapper {
    margin: 0;
  }

  .garden-accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    border: none;
    background: transparent;
    color: var(--garden-color-foreground-default, #2f3941);
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
  }

  .garden-accordion-header:hover {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-accordion-header:hover :global(.garden-accordion-header__icon) {
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-accordion-header:focus {
    outline: none;
  }

  .garden-accordion-header:focus-visible {
    box-shadow: inset 0 0 0 2px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-accordion-header__content {
    flex: 1;
    min-width: 0;
  }

  :global(.garden-accordion-header__icon) {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-left: 8px;
    color: var(--garden-color-foreground-subtle, #68737d);
    transition: transform 0.2s ease-in-out, color 0.15s ease-in-out;
  }

  .garden-accordion-header--expanded :global(.garden-accordion-header__icon) {
    transform: rotate(180deg);
  }

  :global(.garden-accordion--compact) .garden-accordion-header {
    padding: 12px;
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  .garden-accordion-header--rtl {
    text-align: right;
  }

  .garden-accordion-header--rtl :global(.garden-accordion-header__icon) {
    margin-left: 0;
    margin-right: 8px;
  }
</style>
