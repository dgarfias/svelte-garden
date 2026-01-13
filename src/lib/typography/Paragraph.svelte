<!--
  Svelte Garden - Paragraph Component
  
  Styled paragraph component.
  
  @example
  <Paragraph>Body text content goes here.</Paragraph>
-->
<script lang="ts">
  import type { ParagraphProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends ParagraphProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    isBold = false,
    isTruncated = false,
    ...restProps
  }: Props = $props();

  const paragraphClasses = $derived([
    'garden-paragraph',
    `garden-paragraph--${size}`,
    isBold && 'garden-paragraph--bold',
    isTruncated && 'garden-paragraph--truncated',
    className
  ].filter(Boolean).join(' '));
</script>

<p class={paragraphClasses} data-garden-id="typography.paragraph" {...restProps}>
  {#if children}{@render children()}{/if}
</p>

<style>
  .garden-paragraph {
    margin: 0;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* Font sizes match Garden theme.fontSizes/lineHeights */
  .garden-paragraph--small {
    font-size: 12px;
    line-height: 16px;
  }

  .garden-paragraph--medium {
    font-size: 14px;
    line-height: 20px;
  }

  .garden-paragraph--large {
    font-size: 18px;
    line-height: 24px;
  }

  .garden-paragraph--bold {
    font-weight: 600;
  }

  .garden-paragraph--truncated {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
