<!--
  Svelte Garden - ToggleButton Component
  
  A button that can be toggled on/off.
  
  @example
  <ToggleButton isPressed={true}>Toggle me</ToggleButton>
  
  @example
  <ToggleButton bind:isPressed={pressed}>
    {pressed ? 'On' : 'Off'}
  </ToggleButton>
-->
<script lang="ts">
  import type { ToggleButtonProps } from './types';
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';

  interface Props extends ToggleButtonProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isDanger = false,
    size = 'medium',
    isStretched = false,
    isNeutral = false,
    isPrimary = false,
    isBasic = false,
    isLink = false,
    isPill = false,
    focusInset = false,
    isPressed = false,
    disabled = false,
    type = 'button',
    ...restProps
  }: Props = $props();

  const ariaPressed = $derived(
    isPressed === 'mixed' ? 'mixed' : isPressed ? 'true' : 'false'
  );
</script>

<Button
  class={className}
  {isDanger}
  {size}
  {isStretched}
  {isNeutral}
  {isPrimary}
  {isBasic}
  {isLink}
  {isPill}
  {focusInset}
  {disabled}
  {type}
  aria-pressed={ariaPressed}
  data-garden-id="buttons.toggle_button"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</Button>
