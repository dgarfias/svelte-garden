<!--
  Svelte Garden - FileUpload Component
-->
<script lang="ts">
  import type { FileUploadProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends FileUploadProps {
    children?: Snippet;
    onFiles?: (files: FileList) => void;
  }

  let {
    children,
    disabled = false,
    isDragging = false,
    isCompact = false,
    accept,
    multiple = false,
    onFiles,
    class: className = ''
  }: Props = $props();

  let fileInput: HTMLInputElement;
  let internalDragging = $state(false);

  const isActive = $derived(isDragging || internalDragging);

  function handleClick() {
    if (!disabled) {
      fileInput?.click();
    }
  }

  function handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      onFiles?.(input.files);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (!disabled) {
      internalDragging = true;
    }
  }

  function handleDragLeave() {
    internalDragging = false;
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    internalDragging = false;
    if (!disabled && event.dataTransfer?.files) {
      onFiles?.(event.dataTransfer.files);
    }
  }

  const wrapperClasses = $derived([
    'garden-file-upload',
    isCompact && 'garden-file-upload--compact',
    isActive && 'garden-file-upload--active',
    disabled && 'garden-file-upload--disabled',
    className
  ].filter(Boolean).join(' '));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={wrapperClasses}
  onclick={handleClick}
  onkeydown={(e) => e.key === 'Enter' && handleClick()}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  role="button"
  tabindex={disabled ? -1 : 0}
  data-garden-id="forms.file_upload"
>
  <input
    bind:this={fileInput}
    type="file"
    class="garden-file-upload__input"
    {accept}
    {multiple}
    {disabled}
    onchange={handleChange}
  />
  {#if children}
    {@render children()}
  {:else}
    <span class="garden-file-upload__text">
      Drag files here or <span class="garden-file-upload__link">choose files</span>
    </span>
  {/if}
</div>

<style>
  .garden-file-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    padding: 20px 4em;
    border: 1px dashed var(--garden-color-border-emphasis, #68737d);
    border-radius: 4px;
    background-color: transparent;
    color: var(--garden-color-foreground-primary, #1f73b7);
    cursor: pointer;
    text-align: center;
    transition:
      border-color 0.25s ease-in-out,
      background-color 0.25s ease-in-out,
      color 0.25s ease-in-out;
  }

  .garden-file-upload__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .garden-file-upload--compact {
    min-height: 60px;
    padding: 10px 2em;
  }

  .garden-file-upload:hover:not(.garden-file-upload--disabled) {
    border-color: var(--garden-palette-blue-600, #3091ec);
    background-color: rgba(31, 115, 183, 0.08);
    color: var(--garden-palette-blue-600, #3091ec);
  }

  .garden-file-upload--active:not(.garden-file-upload--disabled) {
    border-color: var(--garden-palette-blue-800, #144a8e);
    background-color: rgba(31, 115, 183, 0.16);
    color: var(--garden-palette-blue-800, #144a8e);
  }

  .garden-file-upload:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 1px var(--garden-color-background-default, #fff),
      0 0 0 3px var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  .garden-file-upload--disabled {
    border-color: var(--garden-color-border-disabled, #d8dcde);
    background-color: rgba(0, 0, 0, 0.08);
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: default;
  }

  .garden-file-upload__text {
    font-size: 14px;
    line-height: 1.42857;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .garden-file-upload__link {
    color: inherit;
    text-decoration: underline;
  }

  .garden-file-upload--disabled .garden-file-upload__text,
  .garden-file-upload--disabled .garden-file-upload__link {
    color: var(--garden-color-foreground-subtle, #68737d);
  }
</style>
