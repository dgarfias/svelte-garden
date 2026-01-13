<!--
  Svelte Garden - ColorWell Component
  
  A saturation/value color well for picking colors.
-->
<script lang="ts">
  import type { ColorWellProps, IHSVColor } from './types';
  import type { Snippet } from 'svelte';
  import { hslToHsv } from './utils';

  interface Props extends ColorWellProps {
    children?: Snippet;
    onChange?: (hsv: IHSVColor) => void;
  }

  let {
    children,
    class: className = '',
    hue = 0,
    saturation = 100,
    lightness = 50,
    onChange,
    ...restProps
  }: Props = $props();

  let wellRef: HTMLDivElement;
  let isDragging = $state(false);

  // Convert HSL to HSV for the well display
  const hsv = $derived(hslToHsv(hue, saturation, lightness));

  // Thumb position based on saturation (x) and value (y)
  const thumbX = $derived(hsv.s);
  const thumbY = $derived(100 - hsv.v);

  function getPositionFromEvent(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const rect = wellRef.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    
    return { x, y };
  }

  function handleColorChange(x: number, y: number) {
    if (onChange) {
      onChange({
        h: hue,
        s: x,
        v: 100 - y
      });
    }
  }

  function handleMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    isDragging = true;
    const pos = getPositionFromEvent(e);
    handleColorChange(pos.x, pos.y);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    const pos = getPositionFromEvent(e);
    handleColorChange(pos.x, pos.y);
  }

  function handleMouseUp() {
    isDragging = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  function handleTouchStart(e: TouchEvent) {
    isDragging = true;
    const pos = getPositionFromEvent(e);
    handleColorChange(pos.x, pos.y);
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    e.preventDefault();
    const pos = getPositionFromEvent(e);
    handleColorChange(pos.x, pos.y);
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleKeyDown(e: KeyboardEvent) {
    const step = e.shiftKey ? 10 : 1;
    let newS = hsv.s;
    let newV = hsv.v;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newV = Math.min(100, hsv.v + step);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newV = Math.max(0, hsv.v - step);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newS = Math.max(0, hsv.s - step);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newS = Math.min(100, hsv.s + step);
        break;
      default:
        return;
    }

    if (onChange) {
      onChange({ h: hue, s: newS, v: newV });
    }
  }

  const wellClasses = $derived([
    'garden-color-well',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  bind:this={wellRef}
  class={wellClasses}
  role="slider"
  tabindex="0"
  aria-label="Color saturation and brightness"
  aria-valuetext={`Saturation ${Math.round(hsv.s)}%, Brightness ${Math.round(hsv.v)}%`}
  data-garden-id="colorpickers.color_well"
  style:--well-hue={hue}
  onmousedown={handleMouseDown}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
  onkeydown={handleKeyDown}
  {...restProps}
>
  <div class="garden-color-well__saturation">
    <div class="garden-color-well__brightness">
      <div 
        class="garden-color-well__thumb"
        style:left="{thumbX}%"
        style:top="{thumbY}%"
        class:is-dragging={isDragging}
      ></div>
    </div>
  </div>
</div>

<style>
  .garden-color-well {
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 4px;
    cursor: crosshair;
    background-color: hsl(var(--well-hue), 100%, 50%);
    outline: none;
    user-select: none;
    touch-action: none;
  }

  .garden-color-well:focus-visible {
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }

  .garden-color-well__saturation {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #fff, transparent);
    border-radius: inherit;
  }

  .garden-color-well__brightness {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #000, transparent);
    border-radius: inherit;
  }

  .garden-color-well__thumb {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: box-shadow 0.1s ease;
  }

  .garden-color-well__thumb.is-dragging {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
  }
</style>
