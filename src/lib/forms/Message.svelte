<!--
  Svelte Garden - Message Component (Validation Message)
-->
<script lang="ts">
  import type { MessageProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';

  interface Props extends MessageProps {
    children?: Snippet;
  }

  let {
    children,
    validation,
    validationLabel,
    class: className = ''
  }: Props = $props();

  const fieldContext = getFieldContext();
  const effectiveValidation = $derived(validation || fieldContext?.validation);
</script>

<div
  id={fieldContext?.messageId}
  class="garden-message {effectiveValidation ? `garden-message--${effectiveValidation}` : ''} {className}"
  role={effectiveValidation === 'error' ? 'alert' : undefined}
  data-garden-id="forms.message"
>
  {#if effectiveValidation}
    <svg class="garden-message__icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-label={validationLabel}>
      {#if effectiveValidation === 'success'}
        <path fill="currentColor" d="M8 0a8 8 0 110 16A8 8 0 018 0zm3.54 4.96L6.5 9.5 4.46 7.46l-1.42 1.42 3.54 3.54 6.46-6.46-1.5-1.5z"/>
      {:else if effectiveValidation === 'warning'}
        <path fill="currentColor" d="M8.00001 0C12.4 0 16 3.6 16 8C16 12.4 12.4 16 8.00001 16C3.60001 16 0 12.4 0 8C0 3.6 3.60001 0 8.00001 0ZM8.8 12V10H7.2V12H8.8ZM8.8 8.8V4H7.2V8.8H8.8Z"/>
      {:else if effectiveValidation === 'error'}
        <path fill="currentColor" d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 10.5a1 1 0 100 2 1 1 0 000-2zM8 4a1 1 0 00-1 1v4a1 1 0 102 0V5a1 1 0 00-1-1z"/>
      {/if}
    </svg>
  {/if}
  <span class="garden-message__text">
    {#if children}
      {@render children()}
    {/if}
  </span>
</div>

<style>
  .garden-message {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: 8px;
    font-size: 12px;
    line-height: 1.333;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  :global(.garden-field--compact) .garden-message {
    margin-top: 4px;
  }

  .garden-message__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: -1px;
  }

  .garden-message__text {
    flex: 1;
  }

  /* Validation colors */
  .garden-message--success {
    color: var(--garden-color-foreground-success, #038153);
  }

  .garden-message--warning {
    color: var(--garden-color-foreground-warning, #ad5e18);
  }

  .garden-message--error {
    color: var(--garden-color-foreground-danger, #cc3340);
  }
</style>
