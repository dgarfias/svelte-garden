<!--
  Svelte Garden - Code Component
  
  Inline code snippet styling.
  
  @example
  <Code>const x = 1</Code>
-->
<script lang="ts">
  import type { CodeProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends CodeProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    hue,
    ...restProps
  }: Props = $props();

  const codeClasses = $derived([
    'garden-code',
    `garden-code--${size}`,
    className
  ].filter(Boolean).join(' '));

  const codeStyles = $derived(hue ? `--code-hue: ${hue}` : '');
</script>

<code class={codeClasses} style={codeStyles} data-garden-id="typography.code" {...restProps}>
  {#if children}{@render children()}{/if}
</code>

<style>
  .garden-code {
    display: inline;
    padding: 0.1em 0.3em;
    border-radius: 4px;
    background-color: var(--code-hue, var(--garden-color-background-subtle, #f8f9f9));
    color: var(--garden-color-foreground-danger, #cc3340);
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 0.875em;
    white-space: nowrap;
  }

  /* Monospace font sizes are theme.fontSizes[size] - 1px */
  .garden-code--small {
    font-size: 11px; /* 12px - 1px */
    line-height: 15px; /* 16px - 1px */
  }

  .garden-code--medium {
    font-size: 13px; /* 14px - 1px */
    line-height: 19px; /* 20px - 1px */
  }

  .garden-code--large {
    font-size: 17px; /* 18px - 1px */
    line-height: 23px; /* 24px - 1px */
  }
</style>
