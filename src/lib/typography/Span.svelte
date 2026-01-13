<!--
  Svelte Garden - Span Component
  
  Inline text with formatting options.
  
  @example
  <Span isBold>Bold text</Span>
  <Span isMono>monospace</Span>
-->
<script lang="ts">
  import type { SpanProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends SpanProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isBold = false,
    isItalic = false,
    isMono = false,
    isStrike = false,
    ...restProps
  }: Props = $props();

  const spanClasses = $derived([
    'garden-span',
    isBold && 'garden-span--bold',
    isItalic && 'garden-span--italic',
    isMono && 'garden-span--mono',
    isStrike && 'garden-span--strike',
    className
  ].filter(Boolean).join(' '));
</script>

<span class={spanClasses} data-garden-id="typography.span" {...restProps}>
  {#if children}{@render children()}{/if}
</span>

<style>
  .garden-span {
    color: inherit;
  }

  .garden-span--bold {
    font-weight: 600;
  }

  .garden-span--italic {
    font-style: italic;
  }

  .garden-span--mono {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  }

  .garden-span--strike {
    text-decoration: line-through;
  }
</style>
