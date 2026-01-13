<!--
  Svelte Garden - OrderedList Component
  
  Styled ordered list.
  
  @example
  <OrderedList>
    <li>First item</li>
    <li>Second item</li>
  </OrderedList>
-->
<script lang="ts">
  import type { ListProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<ListProps, 'type'> {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    ...restProps
  }: Props = $props();

  const listClasses = $derived([
    'garden-list',
    'garden-list--ordered',
    `garden-list--${size}`,
    className
  ].filter(Boolean).join(' '));
</script>

<ol class={listClasses} data-garden-id="typography.ordered-list" {...restProps}>
  {#if children}{@render children()}{/if}
</ol>

<style>
  .garden-list {
    margin: 0;
    padding: 0 0 0 24px;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-list--ordered {
    list-style-type: decimal;
  }

  .garden-list :global(li) {
    margin: 4px 0;
  }

  .garden-list--small {
    font-size: 12px;
    line-height: 16px;
    padding-left: 20px;
  }

  .garden-list--medium {
    font-size: 14px;
    line-height: 20px;
  }

  .garden-list--large {
    font-size: 16px;
    line-height: 24px;
    padding-left: 28px;
  }
</style>
