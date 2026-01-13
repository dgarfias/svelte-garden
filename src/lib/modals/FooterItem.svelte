<!--
  Svelte Garden - FooterItem Component
  
  Wrapper for modal footer items with proper alignment.
  
  @example
  <ModalFooter>
    <FooterItem>
      <Button isBasic>Cancel</Button>
    </FooterItem>
    <FooterItem>
      <Button isPrimary>Submit</Button>
    </FooterItem>
  </ModalFooter>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<span
  class="garden-modal-footer-item {className}"
  data-garden-id="modals.footer_item"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</span>

<style>
  .garden-modal-footer-item {
    display: inline-flex;
    flex-shrink: 0;
  }

  /* Add margin between footer items - use :global since siblings are separate component instances */
  :global(.garden-modal-footer-item + .garden-modal-footer-item) {
    margin-left: 8px;
  }

  /* RTL support */
  :global([dir="rtl"] .garden-modal-footer-item + .garden-modal-footer-item) {
    margin-left: 0;
    margin-right: 8px;
  }
</style>
