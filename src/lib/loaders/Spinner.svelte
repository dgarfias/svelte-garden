<!--
  Svelte Garden - Spinner Component
  
  Circular loading spinner with customizable size and color.
  
  @example
  <Spinner />
  
  @example
  <Spinner size="large" color="#1f73b7" />
-->
<script lang="ts">
  import type { SpinnerProps } from './types';

  let {
    class: className = '',
    size = 'medium',
    color = 'currentColor',
    duration = 1250,
    'aria-label': ariaLabel = 'Loading',
    ...restProps
  }: SpinnerProps = $props();

  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32
  };

  const computedSize = $derived(typeof size === 'number' ? size : sizeMap[size]);
  const strokeWidth = $derived(computedSize / 8);

  const spinnerClasses = $derived([
    'garden-spinner',
    className
  ].filter(Boolean).join(' '));
</script>

<svg
  class={spinnerClasses}
  width={computedSize}
  height={computedSize}
  viewBox="0 0 80 80"
  aria-label={ariaLabel}
  role="img"
  data-garden-id="loaders.spinner"
  style="--spinner-duration: {duration}ms; --spinner-color: {color}"
  {...restProps}
>
  <circle
    class="garden-spinner__track"
    cx="40"
    cy="40"
    r="35"
    fill="none"
    stroke-width={strokeWidth * 2.5}
  />
  <circle
    class="garden-spinner__circle"
    cx="40"
    cy="40"
    r="35"
    fill="none"
    stroke-width={strokeWidth * 2.5}
    stroke-linecap="round"
  />
</svg>

<style>
  .garden-spinner {
    animation: garden-spinner-rotate var(--spinner-duration, 1250ms) linear infinite;
  }

  .garden-spinner__track {
    stroke: var(--spinner-color, currentColor);
    opacity: 0.2;
  }

  .garden-spinner__circle {
    stroke: var(--spinner-color, currentColor);
    stroke-dasharray: 220;
    stroke-dashoffset: 165;
    transform-origin: center;
  }

  @keyframes garden-spinner-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
