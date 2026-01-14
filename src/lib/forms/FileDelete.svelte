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
  import { TrashStroke } from '../icons';

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
  <TrashStroke size={12} />
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

  .garden-file-delete :global(svg) {
    width: 12px;
    height: 12px;
  }
</style>
