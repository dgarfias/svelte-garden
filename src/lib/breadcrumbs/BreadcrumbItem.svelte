<!--
  Svelte Garden - BreadcrumbItem Component
  
  Individual breadcrumb item.
  
  @example
  <BreadcrumbItem href="/home">Home</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
-->
<script lang="ts">
  import type { BreadcrumbItemProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends BreadcrumbItemProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    href,
    isCurrent = false,
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  const itemClasses = $derived([
    'garden-breadcrumb__item',
    isCurrent && 'garden-breadcrumb__item--current',
    isRtl && 'garden-breadcrumb__item--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<li class={itemClasses}>
  {#if isCurrent}
    <span 
      class="garden-breadcrumb__text" 
      aria-current="page"
      data-garden-id="breadcrumbs.item"
    >
      {#if children}{@render children()}{/if}
    </span>
  {:else}
    <a 
      class="garden-breadcrumb__link" 
      {href}
      data-garden-id="breadcrumbs.item"
      {...restProps}
    >
      {#if children}{@render children()}{/if}
    </a>
    <svg class="garden-breadcrumb__separator" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5.5 3L10 8l-4.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  {/if}
</li>

<style>
  .garden-breadcrumb__item {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }

  .garden-breadcrumb__link {
    color: var(--garden-color-foreground-primary, #1f73b7);
    text-decoration: none;
    transition: color 0.15s ease-in-out;
  }

  .garden-breadcrumb__link:hover {
    color: var(--garden-palette-blue-600, #3091ec);
    text-decoration: underline;
  }

  .garden-breadcrumb__link:focus {
    outline: none;
  }

  .garden-breadcrumb__link:focus-visible {
    outline: 2px solid var(--garden-color-border-primary-emphasis, #1f73b7);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .garden-breadcrumb__text {
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-breadcrumb__separator {
    width: 12px;
    height: 12px;
    margin: 0 4px;
    color: var(--garden-color-foreground-subtle, #68737d);
    flex-shrink: 0;
  }

  /* RTL: rotate chevron 180 degrees */
  .garden-breadcrumb__item--rtl .garden-breadcrumb__separator {
    transform: rotate(180deg);
  }

  .garden-breadcrumb__item--current .garden-breadcrumb__separator {
    display: none;
  }
</style>
