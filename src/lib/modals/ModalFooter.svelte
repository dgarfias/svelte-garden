<!--
  Svelte Garden - ModalFooter Component
-->
<script lang="ts">
  import type { ModalFooterProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends ModalFooterProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<div
  class="garden-modal-footer {className}"
  data-garden-id="modals.footer"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .garden-modal-footer {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    gap: 20px; /* 5 * 4px */
    padding: 20px 40px 32px; /* 5 * 4px top, 10 * 4px sides, 8 * 4px bottom */
  }

  /* Large modal has different footer styling */
  :global(.garden-modal--large) .garden-modal-footer {
    padding: 32px 40px;
    border-top: 1px solid #d8dcde; /* border.default */
  }
</style>
