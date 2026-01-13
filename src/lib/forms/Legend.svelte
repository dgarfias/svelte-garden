<!--
  Svelte Garden - Legend Component
  
  A legend for fieldsets, styled like a label.
  
  @example
  <Fieldset>
    <Legend>Account Settings</Legend>
    ...
  </Fieldset>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLLegendElement> {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const legendClasses = $derived([
    'garden-legend',
    className
  ].filter(Boolean).join(' '));
</script>

<legend
  class={legendClasses}
  data-garden-id="forms.legend"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</legend>

<style>
  .garden-legend {
    display: block;
    padding: 0;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.42857;
    color: #2f3941;
  }

  /* Compact spacing from fieldset context */
  :global(.garden-fieldset--compact) .garden-legend {
    margin-bottom: 4px;
  }
</style>
