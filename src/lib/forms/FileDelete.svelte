<!--
  Svelte Garden - FileDelete Component
  
  A delete button for removing a file (uses trash icon).
  
  @example
  <File type="document">
    report.pdf
    {#snippet delete()}
      <FileDelete onclick={() => handleDelete()} />
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
    'garden-file-delete',
    disabled && 'garden-file-delete--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<button
  type="button"
  class={buttonClasses}
  aria-label="Delete file"
  {disabled}
  data-garden-id="forms.file_delete"
  {...restProps}
>
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M6 1a1 1 0 00-1 1H3a1 1 0 000 2h10a1 1 0 100-2h-2a1 1 0 00-1-1H6zM4 5v9a2 2 0 002 2h4a2 2 0 002-2V5H4zm2 2h1v6H6V7zm3 0h1v6H9V7z"/>
  </svg>
</button>

<style>
  .garden-file-delete {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--garden-color-foreground-danger, #cc3340);
    cursor: pointer;
    transition:
      background-color 0.15s ease-in-out,
      color 0.15s ease-in-out;
  }

  .garden-file-delete:hover:not(:disabled) {
    background-color: var(--garden-color-background-danger-subtle, rgba(204, 51, 64, 0.08));
    color: var(--garden-color-foreground-danger-emphasis, #a81f2c);
  }

  .garden-file-delete:active:not(:disabled) {
    background-color: var(--garden-color-background-danger, rgba(204, 51, 64, 0.16));
  }

  .garden-file-delete:focus {
    outline: none;
  }

  .garden-file-delete:focus-visible {
    box-shadow: 0 0 0 2px var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-file-delete:disabled,
  .garden-file-delete--disabled {
    color: var(--garden-color-foreground-danger-disabled, #e8c8ca);
    cursor: not-allowed;
  }

  .garden-file-delete svg {
    width: 12px;
    height: 12px;
  }
</style>
