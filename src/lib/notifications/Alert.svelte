<!--
  Svelte Garden - Alert Component
  
  Inline alert for page-level messages.
  Uses the same structure as React Garden Alert.
  
  @example
  <Alert type="success">
    Your changes have been saved.
  </Alert>
-->
<script lang="ts">
  import type { AlertProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends AlertProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    type = 'info',
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  const alertClasses = $derived([
    'garden-alert',
    `garden-alert--${type}`,
    isRtl && 'garden-alert--rtl',
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

<div
  role="alert"
  class={alertClasses}
  data-garden-id="notifications.alert"
  {...restProps}
>
  <svg class="garden-alert__icon" viewBox="0 0 16 16" aria-hidden="true">
    {@html icons[type]}
  </svg>
  
  <div class="garden-alert__content">
    {#if children}{@render children()}{/if}
  </div>
</div>

<style>
  .garden-alert {
    position: relative;
    display: block;
    border: 1px solid;
    border-radius: 8px;
    padding: 20px 40px;
    font-size: 14px;
    line-height: 1.42857;
  }

  /* Info type - matches React Garden */
  .garden-alert--info {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    border-color: var(--garden-color-border-default, #d8dcde);
    color: var(--garden-color-foreground-default, #2f3941);
  }

  /* Success type */
  .garden-alert--success {
    background-color: var(--garden-color-background-success, #edf8f4);
    border-color: var(--garden-color-border-success, #aecfc2);
    color: var(--garden-color-foreground-success, #186146);
  }

  /* Warning type */
  .garden-alert--warning {
    background-color: var(--garden-color-background-warning, #fff7ed);
    border-color: var(--garden-color-border-warning, #ffd596);
    color: var(--garden-color-foreground-warning, #ad5e18);
  }

  /* Error type */
  .garden-alert--error {
    background-color: var(--garden-color-background-danger, #fff0f1);
    border-color: var(--garden-color-border-danger, #f5b5ba);
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* Icon - absolutely positioned like React Garden */
  .garden-alert__icon {
    position: absolute;
    left: 16px;
    top: 22px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .garden-alert--info .garden-alert__icon {
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-alert--success .garden-alert__icon {
    color: var(--garden-color-foreground-success, #186146);
  }

  .garden-alert--warning .garden-alert__icon {
    color: var(--garden-color-foreground-warning, #ad5e18);
  }

  .garden-alert--error .garden-alert__icon {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* Content */
  .garden-alert__content {
    min-width: 0;
  }

  /* RTL Support */
  .garden-alert--rtl {
    direction: rtl;
  }

  .garden-alert--rtl .garden-alert__icon {
    left: auto;
    right: 16px;
  }
</style>
