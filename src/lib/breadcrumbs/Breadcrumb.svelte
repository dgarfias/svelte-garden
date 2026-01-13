<!--
  Svelte Garden - Breadcrumb Component
  
  Container for breadcrumb navigation.
  
  @example
  <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/products">Products</BreadcrumbItem>
    <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
  </Breadcrumb>
-->
<script lang="ts">
  import type { BreadcrumbProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends BreadcrumbProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    'aria-label': ariaLabel = 'Breadcrumb',
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  const breadcrumbClasses = $derived([
    'garden-breadcrumb',
    isRtl && 'garden-breadcrumb--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<nav
  class={breadcrumbClasses}
  aria-label={ariaLabel}
  data-garden-id="breadcrumbs.breadcrumb"
  {...restProps}
>
  <ol class="garden-breadcrumb__list">
    {#if children}{@render children()}{/if}
  </ol>
</nav>

<style>
  .garden-breadcrumb {
    font-size: 14px;
    line-height: 20px;
  }

  .garden-breadcrumb--rtl {
    direction: rtl;
  }

  .garden-breadcrumb__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
