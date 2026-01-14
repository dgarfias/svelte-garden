<!--
  Svelte Garden - Message Component (Validation Message)
-->
<script lang="ts">
  import type { MessageProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';
  import { CheckCircleFill, AlertWarningFill, AlertErrorFill } from '../icons';

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
    <span class="garden-message__icon" aria-label={validationLabel}>
      {#if effectiveValidation === 'success'}
        <CheckCircleFill />
      {:else if effectiveValidation === 'warning'}
        <AlertWarningFill />
      {:else if effectiveValidation === 'error'}
        <AlertErrorFill />
      {/if}
    </span>
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
    margin-top: -1px;
  }

  .garden-message__icon :global(svg) {
    width: 16px;
    height: 16px;
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
