<!--
  Svelte Garden - File Component
  
  Displays a file with icon and optional close/delete actions.
  
  @example
  <File type="document">report.pdf</File>
  
  @example
  <File type="image" validation="success">
    photo.jpg
    {#snippet close()}
      <FileClose onclick={() => handleRemove()} />
    {/snippet}
  </File>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ValidationState } from './types';
  import { useRtl } from '../theming';

  type FileType = 'generic' | 'document' | 'spreadsheet' | 'presentation' | 'image' | 'video' | 'zip' | 'pdf';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    /** Close button slot */
    close?: Snippet;
    /** Delete button slot */
    delete?: Snippet;
    /** File type for icon */
    type?: FileType;
    /** Whether compact size */
    isCompact?: boolean;
    /** Focus styling inset */
    focusInset?: boolean;
    /** Validation state */
    validation?: ValidationState;
  }

  let {
    children,
    close,
    delete: deleteSlot,
    type = 'generic',
    isCompact = false,
    focusInset = false,
    validation,
    class: className = '',
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  const fileClasses = $derived([
    'garden-file',
    isCompact && 'garden-file--compact',
    focusInset && 'garden-file--focus-inset',
    validation && `garden-file--${validation}`,
    isRtl && 'garden-file--rtl',
    className
  ].filter(Boolean).join(' '));

  // File type icons (simplified SVGs)
  const icons: Record<FileType, string> = {
    generic: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3z"/>',
    document: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3zM5 10h6v1H5v-1zm0 2h6v1H5v-1z"/>',
    spreadsheet: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3zM4 9h3v2H4V9zm4 0h4v2H8V9zM4 12h3v2H4v-2zm4 0h4v2H8v-2z"/>',
    presentation: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3zM5 10l2 3 2-2 3 3H4l1-4z"/>',
    image: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3zM6 9a1 1 0 100 2 1 1 0 000-2zm-2 6l2-3 2 2 3-4 3 5H4z"/>',
    video: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3zM6 10v4l4-2-4-2z"/>',
    zip: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3zM7 8h2v1H7V8zm0 2h2v1H7v-1zm0 2h2v3H7v-3z"/>',
    pdf: '<path fill="currentColor" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4H4zm5 1v3h3l-3-3zM5 10h1c.6 0 1 .4 1 1s-.4 1-1 1H5v2H4v-4h1zm4 0h1c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H9v-4zm-2 0h1v1h1v1H7v1h1v1H6v-4z"/>'
  };
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class={fileClasses}
  data-garden-id="forms.file"
  tabindex="0"
  {...restProps}
>
  <svg class="garden-file__icon" viewBox="0 0 16 20" aria-hidden="true">
    {@html icons[type]}
  </svg>
  
  <span class="garden-file__name">
    {#if children}
      {@render children()}
    {/if}
  </span>
  
  {#if close}
    <span class="garden-file__close">
      {@render close()}
    </span>
  {/if}
  
  {#if deleteSlot}
    <span class="garden-file__delete">
      {@render deleteSlot()}
    </span>
  {/if}
</div>

<style>
  .garden-file {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    background-color: var(--garden-color-background-default, #fff);
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
    transition:
      border-color 0.25s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  .garden-file:focus {
    outline: none;
  }

  .garden-file:focus-visible {
    border-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-file--focus-inset:focus-visible {
    box-shadow:
      inset 0 0 0 2px var(--garden-color-background-default, #fff),
      inset 0 0 0 4px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-file__icon {
    flex-shrink: 0;
    width: 16px;
    height: 20px;
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  .garden-file__name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .garden-file__close,
  .garden-file__delete {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  /* ===========================================
   * COMPACT SIZE
   * =========================================== */

  .garden-file--compact {
    padding: 4px 8px;
    font-size: 12px;
  }

  .garden-file--compact .garden-file__icon {
    width: 12px;
    height: 16px;
  }

  /* ===========================================
   * VALIDATION STATES
   * =========================================== */

  .garden-file--success {
    border-color: var(--garden-color-border-success-emphasis, #038153);
  }

  .garden-file--success .garden-file__icon {
    color: var(--garden-color-foreground-success, #038153);
  }

  .garden-file--warning {
    border-color: var(--garden-color-border-warning-emphasis, #ad5e18);
  }

  .garden-file--warning .garden-file__icon {
    color: var(--garden-color-foreground-warning, #ad5e18);
  }

  .garden-file--error {
    border-color: var(--garden-color-border-danger-emphasis, #cc3340);
  }

  .garden-file--error .garden-file__icon {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  .garden-file--rtl {
    flex-direction: row-reverse;
  }

  .garden-file--rtl .garden-file__close,
  .garden-file--rtl .garden-file__delete {
    margin-left: 0;
    margin-right: auto;
  }
</style>
