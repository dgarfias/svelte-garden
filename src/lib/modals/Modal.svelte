<!--
  Svelte Garden - Modal Component
  
  A dialog that overlays the page content with focus trapping.
  
  @example
  <Modal isOpen={showModal} onClose={() => showModal = false}>
    <ModalHeader>Title</ModalHeader>
    <ModalBody>Content here</ModalBody>
    <ModalFooter>
      <Button>Cancel</Button>
      <Button isPrimary>Confirm</Button>
    </ModalFooter>
    <ModalClose />
  </Modal>
-->
<script lang="ts">
  import type { ModalProps } from './types';
  import type { Snippet } from 'svelte';
  import { setModalContext } from './context';

  interface Props extends ModalProps {
    children?: Snippet;
  }

  let {
    children,
    isOpen = false,
    onClose,
    isCentered = true,
    isLarge = false,
    isAnimated = true,
    focusOnMount = true,
    restoreFocus = true,
    'aria-label': ariaLabel,
    class: className = '',
    ...restProps
  }: Props = $props();

  let modalElement: HTMLDivElement | undefined = $state();
  let previousActiveElement: Element | null = $state(null);
  const modalId = `garden-modal-${Math.random().toString(36).slice(2, 9)}`;
  const titleId = `${modalId}--title`;

  // Set context for child components
  setModalContext({
    get onClose() { return onClose; },
    titleId
  });

  // Focusable elements selector
  const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  // Get all focusable elements within the modal
  function getFocusableElements(): HTMLElement[] {
    if (!modalElement) return [];
    return Array.from(modalElement.querySelectorAll(FOCUSABLE_SELECTOR))
      .filter(el => !el.hasAttribute('disabled')) as HTMLElement[];
  }

  // Handle keyboard events including focus trapping
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && onClose) {
      onClose();
      return;
    }

    // Focus trapping on Tab
    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: go to last element if on first
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: go to first element if on last
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  // Handle backdrop click
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  }

  // Focus management and scroll lock
  $effect(() => {
    if (isOpen) {
      previousActiveElement = document.activeElement;
      
      // Focus the modal or first focusable element
      if (focusOnMount && modalElement) {
        // Delay focus to allow animation to start
        requestAnimationFrame(() => {
          const focusableElements = getFocusableElements();
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            modalElement?.focus();
          }
        });
      }
      
      // Prevent body scroll and compensate for scrollbar
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Restore focus when closing
      if (restoreFocus && previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  });

  const backdropClasses = $derived([
    'garden-modal-backdrop',
    isCentered && 'garden-modal-backdrop--centered',
    isAnimated && 'garden-modal-backdrop--animated'
  ].filter(Boolean).join(' '));

  const modalClasses = $derived([
    'garden-modal',
    isLarge && 'garden-modal--large',
    isAnimated && 'garden-modal--animated',
    className
  ].filter(Boolean).join(' '));
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class={backdropClasses}
    role="presentation"
    onclick={handleBackdropClick}
    onkeydown={handleKeydown}
  >
    <div
      bind:this={modalElement}
      class={modalClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabel ? undefined : titleId}
      aria-label={ariaLabel}
      tabindex="-1"
      data-garden-id="modals.modal"
      {...restProps}
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
{/if}

<style>
  /* ===========================================
   * BACKDROP
   * =========================================== */
  
  .garden-modal-backdrop {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 400;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: var(--garden-color-modal-backdrop, rgba(47, 57, 65, 0.8));
  }

  .garden-modal-backdrop--centered {
    align-items: center;
    justify-content: center;
  }

  .garden-modal-backdrop--animated {
    animation: backdropFadeIn 0.15s ease-in;
  }

  @keyframes backdropFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* ===========================================
   * MODAL
   * =========================================== */
  
  .garden-modal {
    display: flex;
    position: relative;
    flex-direction: column;
    min-height: 60px;
    max-height: calc(100vh - 96px); /* 24 * 4px = 96px */
    width: 576px; /* breakpoints.sm = 144 * 4 */
    max-width: calc(100vw - 48px);
    margin: 48px; /* 12 * 4px */
    overflow: auto;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    background-color: var(--garden-color-background-raised, #fff);
    box-shadow: 0 20px 28px 0 rgba(0, 0, 0, 0.16); /* shadow.large */
  }

  .garden-modal-backdrop--centered .garden-modal {
    margin: 0;
  }

  .garden-modal--large {
    width: 768px; /* breakpoints.md = 192 * 4 */
  }

  .garden-modal:focus {
    outline: none;
  }

  .garden-modal--animated {
    animation: modalScaleIn 0.3s ease-in;
    animation-delay: 0.01s;
  }

  @keyframes modalScaleIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Small viewport */
  @media (max-height: 399px) {
    .garden-modal {
      top: 24px;
      margin-bottom: 24px;
      max-height: calc(100vh - 48px);
    }
  }
</style>
