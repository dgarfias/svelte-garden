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
  import { InfoStroke, CheckCircleStroke, AlertWarningStroke, XCircleStroke, XStroke } from '../icons';

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
</script>

{#if isVisible}
  <div
    role="status"
    class={notificationClasses}
    data-garden-id="notifications.notification"
    {...restProps}
  >
    <span class="garden-notification__icon">
      {#if type === 'info'}
        <InfoStroke />
      {:else if type === 'success'}
        <CheckCircleStroke />
      {:else if type === 'warning'}
        <AlertWarningStroke />
      {:else if type === 'error'}
        <XCircleStroke />
      {/if}
    </span>
    
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
        <XStroke />
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
    top: 20px;
    display: flex;
    align-items: center;
    height: 20px; /* Match line-height of text */
  }

  .garden-notification__icon :global(svg) {
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

  .garden-notification__close :global(svg) {
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
