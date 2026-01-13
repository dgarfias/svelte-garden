<!--
  Svelte Garden - Textarea Component
-->
<script lang="ts">
  import type { TextareaProps } from './types';
  import { getFieldContext } from './context';

  let {
    validation,
    isCompact = false,
    isResizable = false,
    minRows = 3,
    maxRows,
    disabled = false,
    readonly = false,
    class: className = '',
    ...restProps
  }: TextareaProps = $props();

  const fieldContext = getFieldContext();
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;

  const textareaClasses = $derived([
    'garden-textarea',
    isCompact && 'garden-textarea--compact',
    isResizable && 'garden-textarea--resizable',
    validation && `garden-textarea--${validation}`,
    disabled && 'garden-textarea--disabled',
    className
  ].filter(Boolean).join(' '));

  // Calculate rows based on content
  const rows = $derived(minRows);
</script>

<textarea
  id={inputId}
  class={textareaClasses}
  {disabled}
  {readonly}
  {rows}
  aria-invalid={validation === 'error' || validation === 'warning' ? true : undefined}
  data-garden-id="forms.textarea"
  {...restProps}
></textarea>

<style>
  .garden-textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-height: 80px;
    padding: 9px 12px;
    font-family: inherit;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid var(--garden-color-border-default, #c2c8cc);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    color: var(--garden-color-foreground-default, #2f3941);
    outline-color: transparent;
    resize: none;
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out,
      background-color 0.25s ease-in-out,
      color 0.25s ease-in-out;
  }

  .garden-textarea::placeholder {
    color: var(--garden-color-foreground-subtle, #68737d);
    opacity: 1;
  }

  .garden-textarea--compact {
    min-height: 64px;
    padding: 5px 12px;
  }

  .garden-textarea--resizable {
    resize: vertical;
  }

  .garden-textarea:hover:not(:disabled):not(:focus) {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-textarea:focus {
    outline: none;
  }

  .garden-textarea:focus-visible {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-textarea:disabled {
    border-color: var(--garden-color-border-disabled, #d8dcde);
    background-color: var(--garden-color-background-disabled, rgba(0, 0, 0, 0.08));
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: default;
  }

  .garden-textarea--success {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-textarea--success:focus-visible {
    box-shadow: 0 0 0 1px var(--garden-color-background-default, #fff), 0 0 0 3px var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-textarea--warning {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-textarea--warning:focus-visible {
    box-shadow: 0 0 0 1px var(--garden-color-background-default, #fff), 0 0 0 3px var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-textarea--error {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-textarea--error:focus-visible {
    box-shadow: 0 0 0 1px var(--garden-color-background-default, #fff), 0 0 0 3px var(--garden-color-border-danger-emphasis, #cc3340);
  }
</style>
