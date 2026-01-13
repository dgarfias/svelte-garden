<!--
  Svelte Garden - Heading Component
  
  Semantic heading component with flexible sizing.
  
  @example
  <Heading>Page Title</Heading>
  
  @example
  <Heading level={2} size="lg">Section Title</Heading>
-->
<script lang="ts">
  import type { HeadingProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends HeadingProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    level = 1,
    size,
    isTruncated = false,
    isBold = true,
    ...restProps
  }: Props = $props();

  // Map level to default size if not specified
  const defaultSizes: Record<number, string> = {
    1: 'xxxl',
    2: 'xxl',
    3: 'xl',
    4: 'lg',
    5: 'md',
    6: 'sm'
  };

  const computedSize = $derived(size || defaultSizes[level] || 'md');

  const headingClasses = $derived([
    'garden-heading',
    `garden-heading--${computedSize}`,
    isTruncated && 'garden-heading--truncated',
    isBold && 'garden-heading--bold',
    className
  ].filter(Boolean).join(' '));
</script>

{#if level === 1}
  <h1 class={headingClasses} data-garden-id="typography.heading" {...restProps}>
    {#if children}{@render children()}{/if}
  </h1>
{:else if level === 2}
  <h2 class={headingClasses} data-garden-id="typography.heading" {...restProps}>
    {#if children}{@render children()}{/if}
  </h2>
{:else if level === 3}
  <h3 class={headingClasses} data-garden-id="typography.heading" {...restProps}>
    {#if children}{@render children()}{/if}
  </h3>
{:else if level === 4}
  <h4 class={headingClasses} data-garden-id="typography.heading" {...restProps}>
    {#if children}{@render children()}{/if}
  </h4>
{:else if level === 5}
  <h5 class={headingClasses} data-garden-id="typography.heading" {...restProps}>
    {#if children}{@render children()}{/if}
  </h5>
{:else}
  <h6 class={headingClasses} data-garden-id="typography.heading" {...restProps}>
    {#if children}{@render children()}{/if}
  </h6>
{/if}

<style>
  .garden-heading {
    margin: 0;
    font-family: inherit;
    color: var(--garden-color-foreground-default, #2f3941);
    line-height: 1.2;
  }

  .garden-heading--bold {
    font-weight: 700;
  }

  /* Sizes - based on Garden type scale (theme.fontSizes/lineHeights) */
  .garden-heading--xxxl {
    font-size: 36px;
    line-height: 44px;
  }

  .garden-heading--xxl {
    font-size: 26px;
    line-height: 32px;
  }

  .garden-heading--xl {
    font-size: 22px;
    line-height: 28px;
  }

  .garden-heading--lg {
    font-size: 18px;
    line-height: 24px;
  }

  .garden-heading--md {
    font-size: 14px;
    line-height: 20px;
  }

  .garden-heading--sm {
    font-size: 12px;
    line-height: 16px;
  }

  .garden-heading--xs {
    font-size: 10px;
    line-height: 14px;
  }

  .garden-heading--truncated {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
