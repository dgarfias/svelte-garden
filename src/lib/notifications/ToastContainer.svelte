<!--
  Svelte Garden - ToastContainer Component
  
  A positioned container for displaying toast notifications.
  
  @example
  <ToastContainer placement="bottom-end" />
  
  @example
  <script>
    import { ToastContainer, toastStore } from '$lib/notifications';
    
    toastStore.addToast({ 
      content: 'Changes saved!', 
      type: 'success' 
    });
  </script>
  <ToastContainer />
-->
<script lang="ts">
  import type { ToastContainerProps, ToastItem } from './types';
  import { toastStore } from './toastStore';
  import { XStroke } from '../icons';

  let {
    placement = 'bottom-end',
    limit = 5,
    class: className = '',
    ...restProps
  }: ToastContainerProps = $props();

  let toasts: ToastItem[] = $state([]);

  // Subscribe to toast store
  $effect(() => {
    const unsubscribe = toastStore.subscribe(value => {
      toasts = value.slice(-limit);
    });
    return unsubscribe;
  });

  // Auto-dismiss toasts
  $effect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    for (const toast of toasts) {
      if (toast.duration && toast.duration > 0) {
        const timer = setTimeout(() => {
          toastStore.removeToast(toast.id);
        }, toast.duration);
        timers.push(timer);
      }
    }
    
    return () => {
      timers.forEach(clearTimeout);
    };
  });

  function handleDismiss(id: string) {
    toastStore.removeToast(id);
  }

  const containerClasses = $derived([
    'garden-toast-container',
    `garden-toast-container--${placement}`,
    className
  ].filter(Boolean).join(' '));
</script>

{#if toasts.length > 0}
  <div
    class={containerClasses}
    aria-live="polite"
    aria-atomic="false"
    data-garden-id="notifications.toast_container"
    {...restProps}
  >
    {#each toasts as toast (toast.id)}
      <div
        class="garden-toast garden-toast--{toast.type || 'info'}"
        role="alert"
        data-garden-id="notifications.toast"
      >
        <div class="garden-toast__content">
          {#if toast.title}
            <strong class="garden-toast__title">{toast.title}</strong>
          {/if}
          <span class="garden-toast__message">{toast.content}</span>
        </div>

        {#if toast.isDismissible !== false}
          <button
            type="button"
            class="garden-toast__close"
            aria-label="Dismiss"
            onclick={() => handleDismiss(toast.id)}
          >
            <XStroke size={14} />
          </button>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .garden-toast-container {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    pointer-events: none;
  }

  /* Placement positions */
  .garden-toast-container--top-start {
    top: 0;
    left: 0;
    align-items: flex-start;
  }

  .garden-toast-container--top {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }

  .garden-toast-container--top-end {
    top: 0;
    right: 0;
    align-items: flex-end;
  }

  .garden-toast-container--bottom-start {
    bottom: 0;
    left: 0;
    align-items: flex-start;
  }

  .garden-toast-container--bottom {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }

  .garden-toast-container--bottom-end {
    bottom: 0;
    right: 0;
    align-items: flex-end;
  }

  /* Toast styles */
  .garden-toast {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #2f3941;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    line-height: 20px;
    pointer-events: auto;
    animation: garden-toast-enter 0.3s ease-out;
  }

  .garden-toast--info {
    background: #2f3941;
  }

  .garden-toast--success {
    background: #037f52;
  }

  .garden-toast--warning {
    background: #ac5918;
  }

  .garden-toast--error {
    background: #cc3340;
  }

  .garden-toast__content {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .garden-toast__title {
    font-weight: 600;
  }

  .garden-toast__close {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.15s ease-in-out;
  }

  .garden-toast__close:hover {
    opacity: 1;
  }

  .garden-toast__close:focus {
    outline: none;
  }

  .garden-toast__close:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);
  }

  .garden-toast__close svg {
    width: 14px;
    height: 14px;
  }

  @keyframes garden-toast-enter {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
