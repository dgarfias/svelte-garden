<!--
  Svelte Garden - Tag Close Button
  
  Close button for dismissible tags.
  
  @example
  <Tag>
    Label
    <TagClose onclick={() => dismiss()} />
  </Tag>
-->
<script lang="ts">
  import type { TagCloseProps } from './types';

  let {
    class: className = '',
    'aria-label': ariaLabel = 'Remove',
    ...restProps
  }: TagCloseProps = $props();

  const closeClasses = $derived([
    'garden-tag__close',
    className
  ].filter(Boolean).join(' '));
</script>

<button
  type="button"
  class={closeClasses}
  aria-label={ariaLabel}
  data-garden-id="tags.close"
  {...restProps}
>
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path fill="currentColor" d="M6.707 6l2.646 2.646a.5.5 0 01-.707.708L6 6.707l-2.646 2.647a.5.5 0 11-.708-.708L5.293 6 2.646 3.354a.5.5 0 11.708-.708L6 5.293l2.646-2.647a.5.5 0 11.708.708L6.707 6z"/>
  </svg>
</button>

<style>
  .garden-tag__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin: 0 -4px 0 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }

  .garden-tag__close:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .garden-tag__close:focus {
    outline: none;
  }

  .garden-tag__close:focus-visible {
    box-shadow: 0 0 0 2px #1f73b7;
  }

  .garden-tag__close svg {
    width: 12px;
    height: 12px;
  }
</style>
