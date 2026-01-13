<!--
  Svelte Garden - Toast Component
  
  Floating notification (toast) that matches React Garden Notification component.
  Uses the same structure as Notification: border, icon, title, content, close button.
  
  @example
  <Toast type="success" title="Saved!">Changes saved successfully.</Toast>
-->
<script lang="ts">
  import type { ToastProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends ToastProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    type = 'info',
    title,
    isDismissible = true,
    duration = 5000,
    onDismiss,
    ...restProps
  }: Props = $props();

  let isVisible = $state(true);
  const isRtl = useRtl();

  $effect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  });

  function handleDismiss() {
    isVisible = false;
    onDismiss?.();
  }

  const toastClasses = $derived([
    'garden-toast',
    `garden-toast--${type}`,
    isRtl && 'garden-toast--rtl',
    className
  ].filter(Boolean).join(' '));

  // SVG icons matching @zendeskgarden/svg-icons stroke style (16px)
  const icons: Record<string, string> = {
    info: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" fill="none" stroke-width="1"/><path d="M8 11V8M8 5.5v-.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>',
    success: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" fill="none" stroke-width="1"/><path d="M5.5 8l2 2 3-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    warning: '<path d="M8 3L2 13h12L8 3z" stroke="currentColor" fill="none" stroke-width="1" stroke-linejoin="round"/><path d="M8 10V7M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>',
    error: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" fill="none" stroke-width="1"/><path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
  };
</script>

{#if isVisible}
  <div
    role="alert"
    class={toastClasses}
    data-garden-id="notifications.toast"
    {...restProps}
  >
    <!-- Type icon -->
    <svg class="garden-toast__icon" viewBox="0 0 16 16" aria-hidden="true">
      {@html icons[type]}
    </svg>
    
    <!-- Content area -->
    <div class="garden-toast__content">
      {#if title}
        <div class="garden-toast__title">{title}</div>
      {/if}
      <div class="garden-toast__message">
        {#if children}{@render children()}{/if}
      </div>
    </div>

    <!-- Close button -->
    {#if isDismissible}
      <button
        type="button"
        class="garden-toast__close"
        aria-label="Dismiss"
        onclick={handleDismiss}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  /* 
   * Toast matches React Garden Notification (floating) styling:
   * - Border with border-radius
   * - Absolute-positioned icon on left
   * - Box shadow for floating effect
   * - Padding: 20px vertical, 40px horizontal (base * 5, base * 10)
   */
  .garden-toast {
    position: relative;
    display: block;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    padding: 20px 40px;
    background-color: var(--garden-color-background-raised, #fff);
    box-shadow: 0 20px 28px 0 var(--garden-shadow-large, rgba(4, 68, 77, 0.15));
    font-size: 14px;
    line-height: 1.42857;
    color: var(--garden-color-foreground-default, #2f3941);
    max-width: 400px;
    animation: garden-toast-enter 0.4s cubic-bezier(0.15, 0.85, 0.35, 1.2);
  }

  /* Icon - positioned absolutely like React Garden */
  .garden-toast__icon {
    position: absolute;
    left: 16px;
    top: 22px;
    width: 16px;
    height: 16px;
  }

  /* Icon colors by type */
  .garden-toast--info .garden-toast__icon {
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-toast--success .garden-toast__icon {
    color: var(--garden-color-foreground-success, #038153);
  }

  .garden-toast--warning .garden-toast__icon {
    color: var(--garden-color-foreground-warning, #c25b0a);
  }

  .garden-toast--error .garden-toast__icon {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* Content area */
  .garden-toast__content {
    min-width: 0;
  }

  /* Title - styled based on type */
  .garden-toast__title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .garden-toast--info .garden-toast__title {
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-toast--success .garden-toast__title {
    color: var(--garden-color-foreground-success, #038153);
  }

  .garden-toast--warning .garden-toast__title {
    color: var(--garden-color-foreground-warning, #c25b0a);
  }

  .garden-toast--error .garden-toast__title {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* Message */
  .garden-toast__message {
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* Close button - positioned top-right like React Garden */
  .garden-toast__close {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: pointer;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }

  .garden-toast__close:hover {
    background-color: var(--garden-color-background-subtle, rgba(0, 0, 0, 0.05));
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-toast__close:focus {
    outline: none;
  }

  .garden-toast__close:focus-visible {
    box-shadow: inset 0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-toast__close svg {
    width: 16px;
    height: 16px;
  }

  /* RTL Support */
  .garden-toast--rtl {
    direction: rtl;
  }

  .garden-toast--rtl .garden-toast__icon {
    left: auto;
    right: 16px;
  }

  .garden-toast--rtl .garden-toast__close {
    right: auto;
    left: 4px;
  }

  /* Animation */
  @keyframes garden-toast-enter {
    from {
      opacity: 0;
      transform: translateY(-100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
