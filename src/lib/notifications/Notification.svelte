<!--
  Svelte Garden - Notification Component
  
  Floating notification card that matches React Garden styling.
  
  @example
  <Notification type="success" title="Saved!">
    Your document has been saved.
  </Notification>
-->
<script lang="ts">
  import type { NotificationProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends NotificationProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    type = 'info',
    title,
    isDismissible = true,
    onDismiss,
    ...restProps
  }: Props = $props();

  let isVisible = $state(true);
  const isRtl = useRtl();

  function handleDismiss() {
    isVisible = false;
    onDismiss?.();
  }

  const notificationClasses = $derived([
    'garden-notification',
    `garden-notification--${type}`,
    isRtl && 'garden-notification--rtl',
    className
  ].filter(Boolean).join(' '));

  // SVG icons matching @zendeskgarden/svg-icons stroke style
  const icons = {
    info: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" fill="none" stroke-width="1"/><path d="M8 11V8M8 5.5v-.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>',
    success: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" fill="none" stroke-width="1"/><path d="M5.5 8l2 2 3-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    warning: '<path d="M8 3L2 13h12L8 3z" stroke="currentColor" fill="none" stroke-width="1" stroke-linejoin="round"/><path d="M8 10V7M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>',
    error: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" fill="none" stroke-width="1"/><path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
  };
</script>

{#if isVisible}
  <div
    role="status"
    class={notificationClasses}
    data-garden-id="notifications.notification"
    {...restProps}
  >
    <svg class="garden-notification__icon" viewBox="0 0 16 16" aria-hidden="true">
      {@html icons[type]}
    </svg>
    
    <div class="garden-notification__content">
      {#if title}
        <div class="garden-notification__title">{title}</div>
      {/if}
      <div class="garden-notification__message">
        {#if children}{@render children()}{/if}
      </div>
    </div>

    {#if isDismissible}
      <button
        type="button"
        class="garden-notification__close"
        aria-label="Dismiss notification"
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
  .garden-notification {
    position: relative;
    display: block;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    padding: 20px 40px;
    background-color: var(--garden-color-background-raised, #fff);
    box-shadow: 
      0 20px 28px 0 var(--garden-shadow-large, rgba(4, 68, 77, 0.15));
    font-size: 14px;
    line-height: 1.42857;
    color: var(--garden-color-foreground-default, #2f3941);
    max-width: 400px;
  }

  /* Icon - absolutely positioned like React Garden */
  .garden-notification__icon {
    position: absolute;
    left: 16px;
    top: 22px;
    width: 16px;
    height: 16px;
  }

  .garden-notification--info .garden-notification__icon {
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-notification--success .garden-notification__icon {
    color: var(--garden-color-foreground-success, #038153);
  }

  .garden-notification--warning .garden-notification__icon {
    color: var(--garden-color-foreground-warning, #c25b0a);
  }

  .garden-notification--error .garden-notification__icon {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* Content */
  .garden-notification__content {
    min-width: 0;
  }

  /* Title - colored based on type like React Garden */
  .garden-notification__title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .garden-notification--info .garden-notification__title {
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-notification--success .garden-notification__title {
    color: var(--garden-color-foreground-success, #038153);
  }

  .garden-notification--warning .garden-notification__title {
    color: var(--garden-color-foreground-warning, #c25b0a);
  }

  .garden-notification--error .garden-notification__title {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* Message */
  .garden-notification__message {
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* Close button - positioned like React Garden */
  .garden-notification__close {
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

  .garden-notification__close:hover {
    background-color: var(--garden-color-background-subtle, rgba(0, 0, 0, 0.05));
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-notification__close:focus {
    outline: none;
  }

  .garden-notification__close:focus-visible {
    box-shadow: inset 0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-notification__close svg {
    width: 16px;
    height: 16px;
  }

  /* RTL Support */
  .garden-notification--rtl {
    direction: rtl;
  }

  .garden-notification--rtl .garden-notification__icon {
    left: auto;
    right: 16px;
  }

  .garden-notification--rtl .garden-notification__close {
    right: auto;
    left: 4px;
  }
</style>
