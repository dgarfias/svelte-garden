<!--
  Svelte Garden - Tag Component
  
  Displays a tag/chip with optional close button and avatar.
  
  @example
  <Tag>Default Tag</Tag>
  
  @example
  <Tag hue="blue" isPill>Blue Pill Tag</Tag>
-->
<script lang="ts">
  import type { TagProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends TagProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    hue,
    isPill = false,
    isRound = false,
    isRegular = false,
    ...restProps
  }: Props = $props();

  const tagClasses = $derived([
    'garden-tag',
    `garden-tag--${size}`,
    isPill && 'garden-tag--pill',
    isRound && 'garden-tag--round',
    isRegular && 'garden-tag--regular',
    className
  ].filter(Boolean).join(' '));

  const tagStyles = $derived(hue ? `--tag-hue: ${hue}` : '');
</script>

<span
  class={tagClasses}
  style={tagStyles}
  data-garden-id="tags.tag"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</span>

<style>
  .garden-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    border: none;
    border-radius: 2px; /* borderRadii.sm for small/medium */
    background-color: var(--tag-hue, var(--garden-color-background-subtle, #e8eaec));
    color: var(--garden-color-foreground-default, #2f3941);
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    max-width: 100%;
    overflow: hidden;
    transition: background-color 0.15s ease-in-out;
  }

  /* Sizes - React: small=16px, medium=20px, large=32px */
  .garden-tag--small {
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
  }

  .garden-tag--medium {
    height: 20px;
    padding: 0 8px;
    font-size: 12px;
  }

  .garden-tag--large {
    height: 32px;
    padding: 0 12px;
    font-size: 12px; /* React uses sm (12px) for large too */
    border-radius: 4px; /* borderRadii.md for large */
  }

  /* Pill shape */
  .garden-tag--pill {
    border-radius: 100px;
  }

  /* Round shape */
  .garden-tag--round {
    border-radius: 50%;
    padding: 0;
    justify-content: center;
  }

  .garden-tag--round.garden-tag--small {
    width: 20px;
  }

  .garden-tag--round.garden-tag--medium {
    width: 24px;
  }

  .garden-tag--round.garden-tag--large {
    width: 32px;
  }

  /* Regular weight */
  .garden-tag--regular {
    font-weight: 400;
  }

  /* Hover state for interactive tags */
  .garden-tag:hover {
    background-color: var(--garden-color-border-default, #d8dcde);
  }
</style>
