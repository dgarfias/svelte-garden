<!--
  Svelte Garden - ModalClose Component
-->
<script lang="ts">
  import type { ModalCloseProps } from './types';
  import { getModalContext } from './context';
  import { useRtl } from '../theming';

  let {
    'aria-label': ariaLabel = 'Close modal',
    class: className = '',
    ...restProps
  }: ModalCloseProps = $props();

  const modalContext = getModalContext();
  const isRtl = useRtl();

  function handleClick() {
    if (modalContext?.onClose) {
      modalContext.onClose();
    }
  }
</script>

<button
  type="button"
  class="garden-modal-close {className}"
  class:garden-modal-close--rtl={isRtl}
  aria-label={ariaLabel}
  onclick={handleClick}
  data-garden-id="modals.close"
  {...restProps}
>
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M12.707 4.707l-1.414-1.414L8 6.586 4.707 3.293 3.293 4.707 6.586 8l-3.293 3.293 1.414 1.414L8 9.414l3.293 3.293 1.414-1.414L9.414 8z"/>
  </svg>
</button>

<style>
  .garden-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px; /* 2.5 * 4px */
    right: 26px; /* 6.5 * 4px */
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: #68737d; /* foreground.subtle */
    cursor: pointer;
    transition:
      background-color 0.1s ease-in-out,
      color 0.25s ease-in-out;
  }

  /* RTL: position close button on left */
  .garden-modal-close--rtl {
    right: auto;
    left: 26px;
  }

  .garden-modal-close:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: #2f3941;
  }

  .garden-modal-close:active {
    background-color: rgba(0, 0, 0, 0.16);
  }

  .garden-modal-close:focus {
    outline: none;
  }

  .garden-modal-close:focus-visible {
    box-shadow:
      0 0 0 1px #fff,
      0 0 0 3px #1f73b7;
  }

  .garden-modal-close svg {
    width: 16px;
    height: 16px;
  }
</style>
