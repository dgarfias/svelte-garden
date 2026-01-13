<!--
  Svelte Garden - Head Component
-->
<script lang="ts">
  import type { HeadProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends HeadProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();

  const headClasses = $derived([
    'garden-thead',
    className
  ].filter(Boolean).join(' '));
</script>

<thead class={headClasses} data-garden-id="tables.head" {...restProps}>
  {#if children}{@render children()}{/if}
</thead>

<style>
  .garden-thead {
    border-bottom: 2px solid var(--garden-color-border-default, #d8dcde);
  }
</style>
