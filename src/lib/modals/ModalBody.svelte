<!--
  Svelte Garden - ModalBody Component
-->
<script lang="ts">
  import type { ModalBodyProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends ModalBodyProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<div
  class="garden-modal-body {className}"
  data-garden-id="modals.body"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .garden-modal-body {
    display: block;
    margin: 0;
    padding: 20px 40px;
    height: 100%;
    overflow: auto;
    font-size: 14px;
    line-height: 1.428;
    color: var(--garden-color-foreground-default, #2f3941);
  }
</style>
