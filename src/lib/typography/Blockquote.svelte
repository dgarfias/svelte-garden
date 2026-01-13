<!--
  Svelte Garden - Blockquote Component
  
  Styled blockquote for quotations.
  
  @example
  <Blockquote>To be or not to be...</Blockquote>
-->
<script lang="ts">
  import type { BlockquoteProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends BlockquoteProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    ...restProps
  }: Props = $props();

  const blockquoteClasses = $derived([
    'garden-blockquote',
    `garden-blockquote--${size}`,
    className
  ].filter(Boolean).join(' '));
</script>

<blockquote class={blockquoteClasses} data-garden-id="typography.blockquote" {...restProps}>
  {#if children}{@render children()}{/if}
</blockquote>

<style>
  .garden-blockquote {
    margin: 0;
    padding: 0 0 0 16px;
    border-left: 4px solid var(--garden-color-border-default, #c2c8cc);
    color: var(--garden-color-foreground-subtle, #5c6970);
    font-style: italic;
  }

  .garden-blockquote--small {
    font-size: 12px;
    line-height: 16px;
    padding-left: 12px;
    border-left-width: 3px;
  }

  .garden-blockquote--medium {
    font-size: 14px;
    line-height: 20px;
  }

  .garden-blockquote--large {
    font-size: 16px;
    line-height: 24px;
    padding-left: 20px;
  }
</style>
