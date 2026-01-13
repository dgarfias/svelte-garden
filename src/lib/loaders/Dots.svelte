<!--
  Svelte Garden - Dots Component
  
  Animated loading dots indicator with Garden's signature "juggling" animation.
  
  @example
  <Dots />
  
  @example
  <Dots size="large" />
-->
<script lang="ts">
  import type { DotsProps } from './types';

  let {
    class: className = '',
    size = 'medium',
    color = 'currentColor',
    duration = 1250,
    delayMS = 750,
    ...restProps
  }: DotsProps = $props();

  const sizeMap = {
    small: 4,
    medium: 6,
    large: 8
  };

  const dotSize = $derived(typeof size === 'number' ? size : sizeMap[size]);
  
  // Calculate viewBox dimensions based on React's implementation
  // React uses viewBox="0 0 80 72" with circles at cx=9,40,71 cy=36 r=9
  const viewBoxWidth = 80;
  const viewBoxHeight = 72;

  const dotsClasses = $derived([
    'garden-dots',
    className
  ].filter(Boolean).join(' '));

  // Handle delay visibility
  const initialDelay = $derived(delayMS);
  let isVisible = $state(false);
  
  $effect(() => {
    if (initialDelay === 0) {
      isVisible = true;
    } else {
      const timer = setTimeout(() => {
        isVisible = true;
      }, initialDelay);
      return () => clearTimeout(timer);
    }
  });
</script>

{#if isVisible}
  <svg
    class={dotsClasses}
    viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
    role="img"
    aria-label="Loading"
    data-garden-id="loaders.dots"
    style="width: {dotSize * 10}px; height: {dotSize * 9}px; color: {color}; --duration: {duration}ms"
  >
    <circle class="garden-dots__dot garden-dots__dot--one" cx="9" cy="36" r="9" fill="currentColor" />
    <circle class="garden-dots__dot garden-dots__dot--two" cx="40" cy="36" r="9" fill="currentColor" />
    <circle class="garden-dots__dot garden-dots__dot--three" cx="71" cy="36" r="9" fill="currentColor" />
  </svg>
{/if}

<style>
  .garden-dots {
    display: inline-block;
    vertical-align: middle;
  }

  .garden-dots__dot {
    animation-duration: var(--duration, 1250ms);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  /* Juggling animation for dot 1 (left) */
  .garden-dots__dot--one {
    animation-name: garden-dots-one;
  }

  /* Juggling animation for dot 2 (center) */
  .garden-dots__dot--two {
    animation-name: garden-dots-two;
  }

  /* Juggling animation for dot 3 (right) */
  .garden-dots__dot--three {
    animation-name: garden-dots-three;
  }

  /* 
   * Garden's signature juggling animation
   * Dots move in arcs as if being juggled - thrown up from center, caught at sides
   */
  @keyframes garden-dots-one {
    0% { transform: translate(0, 0); opacity: 0.9; }
    8% { transform: translate(4px, -8px); }
    16% { transform: translate(11px, -15px); }
    24% { transform: translate(20px, -19px); }
    32% { transform: translate(29px, -15px); }
    40% { transform: translate(35px, -5px); opacity: 0.9; }
    41% { transform: translate(31px, 0); opacity: 0.2; }
    50% { transform: translate(31px, 0); opacity: 0.2; }
    58% { transform: translate(31px, 0); opacity: 0.2; }
    66% { transform: translate(31px, 0); opacity: 0.2; }
    74% { transform: translate(31px, 0); opacity: 0.2; }
    82% { transform: translate(31px, 0); opacity: 0.2; }
    90% { transform: translate(31px, 0); opacity: 0.2; }
    91% { transform: translate(31px, 0); opacity: 0.9; }
    100% { transform: translate(0, 0); opacity: 0.9; }
  }

  @keyframes garden-dots-two {
    0% { transform: translate(0, 0); opacity: 0.2; }
    8% { transform: translate(0, 0); opacity: 0.2; }
    16% { transform: translate(0, 0); opacity: 0.2; }
    24% { transform: translate(0, 0); opacity: 0.2; }
    32% { transform: translate(0, 0); opacity: 0.2; }
    40% { transform: translate(0, 0); opacity: 0.2; }
    41% { transform: translate(-4px, -8px); opacity: 0.9; }
    50% { transform: translate(-11px, -19px); }
    58% { transform: translate(-20px, -23px); }
    66% { transform: translate(-29px, -19px); }
    74% { transform: translate(-35px, -8px); opacity: 0.9; }
    75% { transform: translate(-31px, 0); opacity: 0.2; }
    82% { transform: translate(-31px, 0); opacity: 0.2; }
    90% { transform: translate(-31px, 0); opacity: 0.2; }
    91% { transform: translate(0, -8px); opacity: 0.9; }
    100% { transform: translate(0, 0); opacity: 0.9; }
  }

  @keyframes garden-dots-three {
    0% { transform: translate(0, 0); opacity: 0.2; }
    8% { transform: translate(-4px, -8px); opacity: 0.9; }
    16% { transform: translate(-11px, -15px); }
    24% { transform: translate(-20px, -19px); }
    32% { transform: translate(-29px, -15px); }
    40% { transform: translate(-35px, -5px); opacity: 0.9; }
    41% { transform: translate(-31px, 0); opacity: 0.2; }
    50% { transform: translate(-31px, 0); opacity: 0.2; }
    58% { transform: translate(-31px, 0); opacity: 0.2; }
    66% { transform: translate(-31px, 0); opacity: 0.2; }
    74% { transform: translate(-31px, 0); opacity: 0.2; }
    75% { transform: translate(-27px, -8px); opacity: 0.9; }
    82% { transform: translate(-20px, -19px); }
    90% { transform: translate(-8px, -8px); opacity: 0.9; }
    91% { transform: translate(0, 0); opacity: 0.2; }
    100% { transform: translate(0, 0); opacity: 0.2; }
  }
</style>
