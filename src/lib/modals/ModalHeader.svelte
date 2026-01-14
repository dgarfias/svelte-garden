<!--
  Svelte Garden - ModalHeader Component
-->
<script lang="ts">
  import type { ModalHeaderProps } from './types';
  import type { Snippet } from 'svelte';
  import { getModalContext } from './context';
  import { useRtl } from '../theming';
  import { AlertErrorFill } from '../icons';

  interface Props extends ModalHeaderProps {
    children?: Snippet;
  }

  let {
    children,
    isDanger = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  const modalContext = getModalContext();
  const isRtl = useRtl();
</script>

<div
  id={modalContext?.titleId}
  class="garden-modal-header {isDanger ? 'garden-modal-header--danger' : ''} {className}"
  class:garden-modal-header--rtl={isRtl}
  role="heading"
  aria-level="1"
  data-garden-id="modals.header"
  {...restProps}
>
  {#if isDanger}
    <AlertErrorFill class="garden-modal-header__danger-icon" />
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .garden-modal-header {
    display: block;
    margin: 0;
    padding: 20px 40px; /* 5 * 4px top/bottom, 10 * 4px sides */
    border-bottom: 1px solid var(--garden-color-border-subtle, #e8eaec);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.428;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* When close button is present (account for close button space) */
  :global(.garden-modal:has(.garden-modal-close)) .garden-modal-header {
    padding-right: 72px; /* 40 + 26 + 6 */
  }

  /* RTL: close button space on left */
  :global(.garden-modal:has(.garden-modal-close)) .garden-modal-header--rtl {
    padding-right: 40px;
    padding-left: 72px;
  }

  .garden-modal-header--danger {
    position: relative;
    padding-left: 56px; /* 40 + 16 icon */
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* RTL danger: icon on right */
  .garden-modal-header--danger.garden-modal-header--rtl {
    padding-left: 40px;
    padding-right: 56px;
  }

  :global(.garden-modal-header__danger-icon) {
    position: absolute;
    top: 22px; /* 5.5 * 4px */
    left: 16px; /* 4 * 4px */
    width: 16px;
    height: 16px;
  }

  /* RTL: danger icon on right */
  .garden-modal-header--rtl :global(.garden-modal-header__danger-icon) {
    left: auto;
    right: 16px;
  }
</style>
