<!--
  Svelte Garden - ColorPicker Component
  
  A full-featured color picker with hue slider, alpha slider, and input fields.
-->
<script lang="ts">
  import type { ColorPickerProps, IColor, IHSVColor } from './types';
  import type { Snippet } from 'svelte';
  import { parseColor, colorFromHsv, colorFromRgb, colorFromHex, hslToHsv, colorToCss } from './utils';
  import ColorWell from './ColorWell.svelte';

  interface Props extends ColorPickerProps {
    children?: Snippet;
    onChange?: (color: IColor) => void;
  }

  let {
    children,
    class: className = '',
    color,
    defaultColor = '#1f73b7',
    isOpaque = false,
    labels = {},
    onChange,
    ...restProps
  }: Props = $props();

  // Parse initial color reactively
  const initialColor = $derived(parseColor(color ?? defaultColor));
  
  // Internal state - use empty initial values, sync with effect
  let internalColor = $state<IColor>(parseColor('#1f73b7'));
  let hexInput = $state('');
  let redInput = $state('');
  let greenInput = $state('');
  let blueInput = $state('');
  let alphaInput = $state('');
  
  // Sync internal state with initial color on mount/change
  $effect(() => {
    internalColor = initialColor;
    hexInput = initialColor.hex;
    redInput = String(initialColor.red);
    greenInput = String(initialColor.green);
    blueInput = String(initialColor.blue);
    alphaInput = String(initialColor.alpha);
  });

  // Computed color (controlled vs uncontrolled)
  const currentColor = $derived(color ? parseColor(color) : internalColor);

  // Get HSV for the color well
  const hsv = $derived(hslToHsv(currentColor.hue, currentColor.saturation, currentColor.lightness));

  // Update internal state when color changes
  function updateColor(newColor: IColor) {
    if (isOpaque) {
      newColor = { ...newColor, alpha: 100 };
    }
    internalColor = newColor;
    hexInput = newColor.hex;
    redInput = String(newColor.red);
    greenInput = String(newColor.green);
    blueInput = String(newColor.blue);
    alphaInput = String(newColor.alpha);
    
    onChange?.(newColor);
  }

  // Handle color well change
  function handleColorWellChange(newHsv: IHSVColor) {
    const newColor = colorFromHsv(newHsv.h, newHsv.s, newHsv.v, currentColor.alpha);
    updateColor(newColor);
  }

  // Handle hue slider change
  function handleHueChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const newHue = parseInt(target.value, 10);
    const newColor = colorFromHsv(newHue, hsv.s, hsv.v, currentColor.alpha);
    updateColor(newColor);
  }

  // Handle alpha slider change
  function handleAlphaSliderChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const newAlpha = Math.round(parseFloat(target.value) * 100);
    updateColor({ ...currentColor, alpha: newAlpha });
  }

  // Handle hex input change
  function handleHexChange(e: Event) {
    const target = e.target as HTMLInputElement;
    hexInput = target.value;
  }

  // Handle hex input blur - validate and apply
  function handleHexBlur() {
    let hex = hexInput.trim();
    if (!hex.startsWith('#')) {
      hex = '#' + hex;
    }
    
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      const newColor = colorFromHex(hex, currentColor.alpha);
      updateColor(newColor);
    } else {
      // Reset to current color
      hexInput = currentColor.hex;
    }
  }

  // Handle RGB input changes
  function handleRedChange(e: Event) {
    const target = e.target as HTMLInputElement;
    redInput = target.value;
  }

  function handleGreenChange(e: Event) {
    const target = e.target as HTMLInputElement;
    greenInput = target.value;
  }

  function handleBlueChange(e: Event) {
    const target = e.target as HTMLInputElement;
    blueInput = target.value;
  }

  function handleAlphaChange(e: Event) {
    const target = e.target as HTMLInputElement;
    alphaInput = target.value;
  }

  // Handle RGB/Alpha blur - validate and apply
  function handleRgbBlur() {
    const r = Math.max(0, Math.min(255, parseInt(redInput, 10) || 0));
    const g = Math.max(0, Math.min(255, parseInt(greenInput, 10) || 0));
    const b = Math.max(0, Math.min(255, parseInt(blueInput, 10) || 0));
    const a = Math.max(0, Math.min(100, parseInt(alphaInput, 10) || 100));
    
    const newColor = colorFromRgb(r, g, b, a);
    updateColor(newColor);
  }

  const pickerClasses = $derived([
    'garden-color-picker',
    isOpaque && 'garden-color-picker--opaque',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={pickerClasses}
  data-garden-id="colorpickers.color_picker"
  {...restProps}
>
  <ColorWell
    hue={currentColor.hue}
    saturation={currentColor.saturation}
    lightness={currentColor.lightness}
    onChange={handleColorWellChange}
  />
  
  <div class="garden-color-picker__controls">
    <div 
      class="garden-color-picker__preview"
      style:background-color={colorToCss(currentColor)}
    >
      {#if !isOpaque}
        <div class="garden-color-picker__preview-checker"></div>
      {/if}
    </div>
    
    <div class="garden-color-picker__sliders">
      <div class="garden-color-picker__slider-field">
        <label class="garden-color-picker__slider-label sr-only" for="hue-slider-{pickerClasses}">
          {labels.hueSlider || 'Hue slider'}
        </label>
        <input
          id="hue-slider-{pickerClasses}"
          type="range"
          class="garden-color-picker__hue-slider"
          min="0"
          max="360"
          step="1"
          value={currentColor.hue}
          oninput={handleHueChange}
        />
      </div>
      
      {#if !isOpaque}
        <div class="garden-color-picker__slider-field">
          <label class="garden-color-picker__slider-label sr-only" for="alpha-slider-{pickerClasses}">
            {labels.alphaSlider || 'Alpha slider'}
          </label>
          <input
            id="alpha-slider-{pickerClasses}"
            type="range"
            class="garden-color-picker__alpha-slider"
            min="0"
            max="1"
            step="0.01"
            value={currentColor.alpha / 100}
            oninput={handleAlphaSliderChange}
            style:--alpha-color="rgb({currentColor.red}, {currentColor.green}, {currentColor.blue})"
          />
        </div>
      {/if}
    </div>
  </div>
  
  <div class="garden-color-picker__inputs">
    <div class="garden-color-picker__hex-field">
      <label class="garden-color-picker__label" for="hex-input-{pickerClasses}">{labels.hex || 'Hex'}</label>
      <input
        id="hex-input-{pickerClasses}"
        type="text"
        class="garden-color-picker__input"
        maxlength="7"
        value={hexInput}
        oninput={handleHexChange}
        onblur={handleHexBlur}
        spellcheck="false"
      />
    </div>
    
    <div class="garden-color-picker__rgba-field">
      <label class="garden-color-picker__label" for="red-input-{pickerClasses}">{labels.red || 'R'}</label>
      <input
        id="red-input-{pickerClasses}"
        type="number"
        class="garden-color-picker__input garden-color-picker__input--number"
        min="0"
        max="255"
        value={redInput}
        oninput={handleRedChange}
        onblur={handleRgbBlur}
      />
    </div>
    
    <div class="garden-color-picker__rgba-field">
      <label class="garden-color-picker__label" for="green-input-{pickerClasses}">{labels.green || 'G'}</label>
      <input
        id="green-input-{pickerClasses}"
        type="number"
        class="garden-color-picker__input garden-color-picker__input--number"
        min="0"
        max="255"
        value={greenInput}
        oninput={handleGreenChange}
        onblur={handleRgbBlur}
      />
    </div>
    
    <div class="garden-color-picker__rgba-field">
      <label class="garden-color-picker__label" for="blue-input-{pickerClasses}">{labels.blue || 'B'}</label>
      <input
        id="blue-input-{pickerClasses}"
        type="number"
        class="garden-color-picker__input garden-color-picker__input--number"
        min="0"
        max="255"
        value={blueInput}
        oninput={handleBlueChange}
        onblur={handleRgbBlur}
      />
    </div>
    
    {#if !isOpaque}
      <div class="garden-color-picker__rgba-field">
        <label class="garden-color-picker__label" for="alpha-input-{pickerClasses}">{labels.alpha || 'A'}</label>
        <input
          id="alpha-input-{pickerClasses}"
          type="number"
          class="garden-color-picker__input garden-color-picker__input--number"
          min="0"
          max="100"
          value={alphaInput}
          oninput={handleAlphaChange}
          onblur={handleRgbBlur}
        />
      </div>
    {/if}
  </div>
</div>

<style>
  .garden-color-picker {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 240px;
    padding: 12px;
    background-color: var(--garden-color-background-default, #fff);
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    font-family: inherit;
  }

  .garden-color-picker__controls {
    display: flex;
    gap: 12px;
    align-items: stretch;
  }

  .garden-color-picker__preview {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid var(--garden-color-border-subtle, rgba(0, 0, 0, 0.1));
    overflow: hidden;
  }

  .garden-color-picker__preview-checker {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: 
      linear-gradient(45deg, var(--garden-checkered-color, #ccc) 25%, transparent 25%),
      linear-gradient(-45deg, var(--garden-checkered-color, #ccc) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--garden-checkered-color, #ccc) 75%),
      linear-gradient(-45deg, transparent 75%, var(--garden-checkered-color, #ccc) 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  }

  .garden-color-picker__sliders {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  .garden-color-picker__slider-field {
    display: flex;
    align-items: center;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Hue slider */
  .garden-color-picker__hue-slider {
    width: 100%;
    height: 12px;
    border-radius: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: linear-gradient(
      to right,
      hsl(0, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(360, 100%, 50%)
    );
    outline: none;
  }

  .garden-color-picker__hue-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--garden-color-background-default, #fff);
    border: 2px solid var(--garden-color-background-default, #fff);
    box-shadow: 0 0 0 1px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.3)), 0 1px 3px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.2));
    cursor: pointer;
  }

  .garden-color-picker__hue-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--garden-color-background-default, #fff);
    border: 2px solid var(--garden-color-background-default, #fff);
    box-shadow: 0 0 0 1px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.3)), 0 1px 3px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.2));
    cursor: pointer;
  }

  /* Alpha slider */
  .garden-color-picker__alpha-slider {
    width: 100%;
    height: 12px;
    border-radius: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: 
      linear-gradient(to right, transparent, var(--alpha-color, #000)),
      linear-gradient(45deg, var(--garden-checkered-color, #ccc) 25%, transparent 25%),
      linear-gradient(-45deg, var(--garden-checkered-color, #ccc) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--garden-checkered-color, #ccc) 75%),
      linear-gradient(-45deg, transparent 75%, var(--garden-checkered-color, #ccc) 75%);
    background-size: 100% 100%, 8px 8px, 8px 8px, 8px 8px, 8px 8px;
    background-position: 0 0, 0 0, 0 4px, 4px -4px, -4px 0px;
    outline: none;
  }

  .garden-color-picker__alpha-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--garden-color-background-default, #fff);
    border: 2px solid var(--garden-color-background-default, #fff);
    box-shadow: 0 0 0 1px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.3)), 0 1px 3px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.2));
    cursor: pointer;
  }

  .garden-color-picker__alpha-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--garden-color-background-default, #fff);
    border: 2px solid var(--garden-color-background-default, #fff);
    box-shadow: 0 0 0 1px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.3)), 0 1px 3px var(--garden-slider-thumb-shadow, rgba(0, 0, 0, 0.2));
    cursor: pointer;
  }

  /* Input fields */
  .garden-color-picker__inputs {
    display: flex;
    gap: 8px;
  }

  .garden-color-picker__hex-field {
    flex: 2;
  }

  .garden-color-picker__rgba-field {
    flex: 1;
    min-width: 0;
  }

  .garden-color-picker__label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: var(--garden-color-foreground-subtle, #68737d);
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .garden-color-picker__input {
    width: 100%;
    height: 32px;
    padding: 0 8px;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    font-size: 13px;
    font-family: inherit;
    color: var(--garden-color-foreground-default, #2f3941);
    background-color: var(--garden-color-background-default, #fff);
    outline: none;
    box-sizing: border-box;
  }

  .garden-color-picker__input:focus {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow: 0 0 0 3px var(--garden-focus-ring-color, rgba(31, 115, 183, 0.15));
  }

  .garden-color-picker__input--number {
    padding: 0 4px;
    text-align: center;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  .garden-color-picker__input--number::-webkit-outer-spin-button,
  .garden-color-picker__input--number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Opaque variant */
  .garden-color-picker--opaque .garden-color-picker__preview-checker {
    display: none;
  }
</style>
