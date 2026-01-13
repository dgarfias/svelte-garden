<!--
  Svelte Garden - Table Component
  
  Data table with sorting, selection, and styling options.
  
  @example
  <Table>
    <Head>
      <Row>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Email</HeaderCell>
      </Row>
    </Head>
    <Body>
      <Row>
        <Cell>John</Cell>
        <Cell>john@example.com</Cell>
      </Row>
    </Body>
  </Table>
-->
<script lang="ts">
  import type { TableProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends TableProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    isHoverable = false,
    isStriped = false,
    isBordered = false,
    ...restProps
  }: Props = $props();

  const tableClasses = $derived([
    'garden-table',
    `garden-table--${size}`,
    isHoverable && 'garden-table--hoverable',
    isStriped && 'garden-table--striped',
    isBordered && 'garden-table--bordered',
    className
  ].filter(Boolean).join(' '));
</script>

<table
  class={tableClasses}
  data-garden-id="tables.table"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</table>

<style>
  .garden-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-table--small {
    font-size: 12px;
    line-height: 16px;
  }

  .garden-table--large {
    font-size: 16px;
    line-height: 24px;
  }

  .garden-table--bordered {
    border: 1px solid var(--garden-color-border-default, #d8dcde);
  }

  .garden-table--bordered :global(th),
  .garden-table--bordered :global(td) {
    border: 1px solid var(--garden-color-border-default, #d8dcde);
  }

  .garden-table--hoverable :global(tbody tr:hover) {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
  }

  .garden-table--striped :global(tbody tr:nth-child(even)) {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
  }
</style>
