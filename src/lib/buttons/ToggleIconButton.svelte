<!--
  Svelte Garden - ToggleIconButton Component
  
  An icon button that can be toggled on/off.
  
  @example
  <ToggleIconButton isPressed={true} aria-label="Favorite">
    <HeartIcon />
  </ToggleIconButton>
-->
<script lang="ts">
  import type { ToggleIconButtonProps } from './types';
  import type { Snippet } from 'svelte';
  import IconButton from './IconButton.svelte';

  interface Props extends ToggleIconButtonProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isDanger = false,
    size = 'medium',
    isNeutral = false,
    isPrimary = false,
    isBasic = true,  // React default is true
    isPill = true,   // React default is true
    focusInset = false,
    isRotated = false,
    isPressed = false,
    disabled = false,
    type = 'button',
    ...restProps
  }: Props = $props();

  const ariaPressed = $derived(
    isPressed === 'mixed' ? 'mixed' : isPressed ? 'true' : 'false'
  );
</script>

<IconButton
  class={className}
  {isDanger}
  {size}
  {isNeutral}
  {isPrimary}
  {isBasic}
  {isPill}
  {focusInset}
  {isRotated}
  {disabled}
  {type}
  aria-pressed={ariaPressed}
  data-garden-id="buttons.toggle_icon_button"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</IconButton>
