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
  import { XStroke } from '../icons';

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
  <XStroke size={12} />
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

  .garden-file-close :global(svg) {
    width: 12px;
    height: 12px;
  }
</style>
