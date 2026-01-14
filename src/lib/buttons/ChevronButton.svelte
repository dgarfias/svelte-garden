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
  import { ChevronDownStroke } from '../icons';

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
  <ChevronDownStroke />
</IconButton>
