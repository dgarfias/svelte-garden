<!--
  Svelte Garden - Progress Component
  
  Linear progress bar with determinate progress.
  
  @example
  <Progress value={50} />
  
  @example
  <Progress value={75} color="#037f52" />
-->
<script lang="ts">
  import type { ProgressProps } from './types';
  import { useRtl } from '../theming';

  let {
    class: className = '',
    value = 0,
    size = 'medium',
    color = '#1f73b7',
    'aria-label': ariaLabel = 'Progress',
    ...restProps
  }: ProgressProps = $props();

  const clampedValue = $derived(Math.min(100, Math.max(0, value)));
  const isRtl = useRtl();

  const heightMap = {
    small: 4,
    medium: 6,
    large: 8
  };

  const progressClasses = $derived([
    'garden-progress',
    `garden-progress--${size}`,
    isRtl && 'garden-progress--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={progressClasses}
  role="progressbar"
  aria-valuenow={clampedValue}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={ariaLabel}
  data-garden-id="loaders.progress"
  style="--progress-height: {heightMap[size]}px; --progress-color: {color}"
  {...restProps}
>
  <div 
    class="garden-progress__track"
  >
    <div 
      class="garden-progress__indicator"
      style="width: {clampedValue}%"
    ></div>
  </div>
  <span class="garden-progress__value">{clampedValue}%</span>
</div>

<style>
  .garden-progress {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .garden-progress__track {
    flex: 1;
    height: var(--progress-height, 6px);
    background-color: var(--garden-color-background-subtle, #e8eaec);
    border-radius: calc(var(--progress-height, 6px) / 2);
    overflow: hidden;
  }

  .garden-progress__indicator {
    height: 100%;
    background-color: var(--progress-color, var(--garden-color-background-primary-emphasis, #1f73b7));
    border-radius: inherit;
    transition: width 0.3s ease-in-out;
  }

  .garden-progress__value {
    min-width: 40px;
    font-size: 12px;
    font-weight: 600;
    color: var(--garden-color-foreground-default, #2f3941);
    text-align: right;
  }

  .garden-progress--small .garden-progress__value {
    font-size: 10px;
  }

  .garden-progress--large .garden-progress__value {
    font-size: 14px;
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  .garden-progress--rtl {
    flex-direction: row-reverse;
  }

  .garden-progress--rtl .garden-progress__indicator {
    margin-left: auto;
    margin-right: 0;
  }

  .garden-progress--rtl .garden-progress__value {
    text-align: left;
  }
</style>
