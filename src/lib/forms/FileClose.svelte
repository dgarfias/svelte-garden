<!--
  Svelte Garden - FileClose Component
  
  A close button for removing a file from the list.
  
  @example
  <File type="document">
    report.pdf
    {#snippet close()}
      <FileClose onclick={() => handleRemove()} />
    {/snippet}
  </File>
-->
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    /** Whether the button is disabled */
    disabled?: boolean;
  }

  let {
    disabled = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  const buttonClasses = $derived([
    'garden-file-close',
    disabled && 'garden-file-close--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<button
  type="button"
  class={buttonClasses}
  aria-label="Remove file"
  {disabled}
  data-garden-id="forms.file_close"
  {...restProps}
>
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M12.354 4.354a.5.5 0 00-.708-.708L8 7.293 4.354 3.646a.5.5 0 10-.708.708L7.293 8l-3.647 3.646a.5.5 0 00.708.708L8 8.707l3.646 3.647a.5.5 0 00.708-.708L8.707 8l3.647-3.646z"/>
  </svg>
</button>

<style>
  .garden-file-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: pointer;
    transition:
      background-color 0.15s ease-in-out,
      color 0.15s ease-in-out;
  }

  .garden-file-close:hover:not(:disabled) {
    background-color: var(--garden-color-background-subtle, rgba(0, 0, 0, 0.08));
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-file-close:active:not(:disabled) {
    background-color: var(--garden-color-background-emphasis, rgba(0, 0, 0, 0.16));
  }

  .garden-file-close:focus {
    outline: none;
  }

  .garden-file-close:focus-visible {
    box-shadow: 0 0 0 2px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-file-close:disabled,
  .garden-file-close--disabled {
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: not-allowed;
  }

  .garden-file-close svg {
    width: 12px;
    height: 12px;
  }
</style>
