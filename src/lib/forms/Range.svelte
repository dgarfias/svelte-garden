<!--
  Svelte Garden - Range/Slider Component
  
  Uses CSS variables for dark mode support.
-->
<script lang="ts">
  import type { RangeProps } from './types';
  import { getFieldContext } from './context';

  let {
    min = 0,
    max = 100,
    step = 1,
    value = 50,
    hasLowerTrack = true,
    disabled = false,
    class: className = '',
    ...restProps
  }: RangeProps = $props();

  const fieldContext = getFieldContext();
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;

  // Calculate percentage for lower track
  const percentage = $derived(((Number(value) - min) / (max - min)) * 100);
</script>

<div class="garden-range {disabled ? 'garden-range--disabled' : ''} {className}">
  <input
    id={inputId}
    type="range"
    class="garden-range__input"
    {min}
    {max}
    {step}
    {value}
    {disabled}
    style={hasLowerTrack ? `--range-progress: ${percentage}%` : undefined}
    data-garden-id="forms.range"
    {...restProps}
  />
</div>

<style>
  .garden-range {
    display: block;
    width: 100%;
  }

  .garden-range__input {
    width: 100%;
    height: 20px;
    background: transparent;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  .garden-range__input:focus {
    outline: none;
  }

  /* Track - WebKit */
  .garden-range__input::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    border-radius: 6px;
    background: linear-gradient(
      to right,
      var(--garden-color-background-primary-emphasis, #1f73b7) 0%,
      var(--garden-color-background-primary-emphasis, #1f73b7) var(--range-progress, 50%),
      var(--garden-color-border-emphasis, #c2c8cc) var(--range-progress, 50%),
      var(--garden-color-border-emphasis, #c2c8cc) 100%
    );
  }

  /* Track - Firefox */
  .garden-range__input::-moz-range-track {
    width: 100%;
    height: 6px;
    border-radius: 6px;
    background: var(--garden-color-border-emphasis, #c2c8cc);
  }

  .garden-range__input::-moz-range-progress {
    height: 6px;
    border-radius: 6px;
    background: var(--garden-color-background-primary-emphasis, #1f73b7);
  }

  /* Thumb - WebKit */
  .garden-range__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    margin-top: -7px;
    border: none;
    border-radius: 50%;
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
    box-shadow: 0 4px 8px var(--garden-shadow-small, rgba(0, 0, 0, 0.15));
    cursor: pointer;
    transition: background-color 0.25s ease-in-out, box-shadow 0.1s ease-in-out;
  }

  /* Thumb - Firefox */
  .garden-range__input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background-color: var(--garden-color-background-primary-emphasis, #1f73b7);
    box-shadow: 0 4px 8px var(--garden-shadow-small, rgba(0, 0, 0, 0.15));
    cursor: pointer;
    transition: background-color 0.25s ease-in-out, box-shadow 0.1s ease-in-out;
  }

  /* Hover */
  .garden-range__input:hover::-webkit-slider-thumb {
    background-color: var(--garden-palette-blue-600, #3091ec);
  }

  .garden-range__input:hover::-moz-range-thumb {
    background-color: var(--garden-palette-blue-600, #3091ec);
  }

  /* Active */
  .garden-range__input:active::-webkit-slider-thumb {
    background-color: var(--garden-palette-blue-800, #144a75);
  }

  .garden-range__input:active::-moz-range-thumb {
    background-color: var(--garden-palette-blue-800, #144a75);
  }

  /* Focus */
  .garden-range__input:focus-visible::-webkit-slider-thumb {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7),
      0 4px 8px var(--garden-shadow-small, rgba(0, 0, 0, 0.15));
  }

  .garden-range__input:focus-visible::-moz-range-thumb {
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7),
      0 4px 8px var(--garden-shadow-small, rgba(0, 0, 0, 0.15));
  }

  /* Disabled */
  .garden-range--disabled .garden-range__input {
    cursor: default;
  }

  .garden-range--disabled .garden-range__input::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      var(--garden-color-border-emphasis, #c2c8cc) 0%,
      var(--garden-color-border-emphasis, #c2c8cc) var(--range-progress, 50%),
      var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08)) var(--range-progress, 50%),
      var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08)) 100%
    );
  }

  .garden-range--disabled .garden-range__input::-webkit-slider-thumb {
    background-color: var(--garden-color-border-emphasis, #c2c8cc);
    box-shadow: none;
  }

  .garden-range--disabled .garden-range__input::-moz-range-track {
    background: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
  }

  .garden-range--disabled .garden-range__input::-moz-range-progress {
    background: var(--garden-color-border-emphasis, #c2c8cc);
  }

  .garden-range--disabled .garden-range__input::-moz-range-thumb {
    background-color: var(--garden-color-border-emphasis, #c2c8cc);
    box-shadow: none;
  }
</style>
