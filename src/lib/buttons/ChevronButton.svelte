<!--
  Svelte Garden - ChevronButton Component
  
  An IconButton pre-configured with a chevron icon.
  Note: Unlike IconButton, ChevronButton defaults to isBasic=false and isPill=false.
  
  @example
  <ChevronButton aria-label="Expand" />
  
  @example
  <ChevronButton isRotated aria-label="Collapse" />
-->
<script lang="ts">
  import type { IconButtonProps } from './types';
  import IconButton from './IconButton.svelte';

  interface Props extends IconButtonProps {}

  let {
    class: className = '',
    // ChevronButton has DIFFERENT defaults from IconButton
    isBasic = false,
    isPill = false,
    size = 'medium',
    ...restProps
  }: Props = $props();
</script>

<IconButton
  class={className}
  {isBasic}
  {isPill}
  {size}
  {...restProps}
>
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M12.354 5.646a.5.5 0 010 .708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 11.708-.708L8 9.293l3.646-3.647a.5.5 0 01.708 0z"/>
  </svg>
</IconButton>
