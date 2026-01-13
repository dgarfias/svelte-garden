<!--
  Svelte Garden - Body Component
-->
<script lang="ts">
  import type { BodyProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends BodyProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const bodyClasses = $derived([
    'garden-tbody',
    className
  ].filter(Boolean).join(' '));
</script>

<tbody class={bodyClasses} data-garden-id="tables.body" {...restProps}>
  {#if children}{@render children()}{/if}
</tbody>

<style>
  .garden-tbody {
    /* Default body styles - explicit display for semantic tbody */
    display: table-row-group;
  }
</style>
