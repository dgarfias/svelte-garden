<!--
  Svelte Garden - Skeleton Component
  
  Placeholder loading skeleton for content.
  
  @example
  <Skeleton width="200px" height="20px" />
  
  @example
  <Skeleton width={40} height={40} isRound />
-->
<script lang="ts">
  import type { SkeletonProps } from './types';
  import { useRtl } from '../theming';

  let {
    class: className = '',
    width = '100%',
    height = '16px',
    isRound = false,
    duration = 1500,
    ...restProps
  }: SkeletonProps = $props();

  const isRtl = useRtl();
  const computedWidth = $derived(typeof width === 'number' ? `${width}px` : width);
  const computedHeight = $derived(typeof height === 'number' ? `${height}px` : height);

  const skeletonClasses = $derived([
    'garden-skeleton',
    isRound && 'garden-skeleton--round',
    isRtl && 'garden-skeleton--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<span
  class={skeletonClasses}
  data-garden-id="loaders.skeleton"
  style="width: {computedWidth}; height: {computedHeight}; --skeleton-duration: {duration}ms"
  aria-hidden="true"
  {...restProps}
></span>

<style>
  .garden-skeleton {
    display: inline-block;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    /* Light mode: neutralHue-700 at 16% opacity = darker gray */
    /* Dark mode: white at 16% opacity = lighter */
    background-color: var(--garden-color-skeleton-background, rgba(47, 57, 65, 0.16));
    animation: garden-skeleton-fade-in 750ms linear;
  }

  /* Shimmer overlay using ::before with translateX animation */
  .garden-skeleton::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1000px;
    height: 100%;
    background-image: linear-gradient(
      45deg,
      transparent,
      var(--garden-color-skeleton-gradient, rgba(47, 57, 65, 0.16)),
      transparent
    );
    animation: garden-skeleton-shimmer 1.5s ease-in-out 300ms infinite;
  }

  .garden-skeleton--round {
    border-radius: 50%;
  }

  .garden-skeleton--rtl::before {
    animation: garden-skeleton-shimmer-rtl 1.5s ease-in-out 300ms infinite;
  }

  @keyframes garden-skeleton-fade-in {
    0%, 60% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes garden-skeleton-shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes garden-skeleton-shimmer-rtl {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
