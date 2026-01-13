<!--
  Svelte Garden - Inline Component
  
  Inline loading indicator that fits within text.
  
  @example
  <p>Loading<Inline /></p>
-->
<script lang="ts">
  import type { InlineProps } from './types';

  let {
    class: className = '',
    size = 'medium',
    color = 'currentColor',
    ...restProps
  }: InlineProps = $props();

  const sizeMap = {
    small: 12,
    medium: 16,
    large: 20
  };

  const computedSize = $derived(typeof size === 'number' ? size : sizeMap[size]);

  const inlineClasses = $derived([
    'garden-inline-loader',
    className
  ].filter(Boolean).join(' '));
</script>

<span
  class={inlineClasses}
  role="img"
  aria-label="Loading"
  data-garden-id="loaders.inline"
  style="width: {computedSize}px; height: {computedSize}px; --inline-color: {color}"
  {...restProps}
>
  <span class="garden-inline-loader__dot"></span>
  <span class="garden-inline-loader__dot"></span>
  <span class="garden-inline-loader__dot"></span>
</span>

<style>
  .garden-inline-loader {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    vertical-align: middle;
    margin: 0 4px;
  }

  .garden-inline-loader__dot {
    width: 25%;
    height: 25%;
    border-radius: 50%;
    background-color: var(--inline-color, currentColor);
    animation: garden-inline-pulse 1.4s ease-in-out infinite both;
  }

  .garden-inline-loader__dot:nth-child(1) {
    animation-delay: -0.32s;
  }

  .garden-inline-loader__dot:nth-child(2) {
    animation-delay: -0.16s;
  }

  .garden-inline-loader__dot:nth-child(3) {
    animation-delay: 0s;
  }

  @keyframes garden-inline-pulse {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
