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
  import { XStroke } from '../icons';

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
  <XStroke size={12} />
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
