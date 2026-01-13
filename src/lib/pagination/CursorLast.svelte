<!--
  Svelte Garden - CursorLast Component
  
  Last page button for cursor pagination.
-->
<script lang="ts">
  import type { CursorButtonProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends CursorButtonProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    disabled = false,
    onClick,
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();
</script>

<button
  type="button"
  class="garden-cursor-btn garden-cursor-btn--last {className}"
  class:garden-cursor-btn--disabled={disabled}
  class:garden-cursor-btn--rtl={isRtl}
  data-garden-id="pagination.cursor.last"
  {disabled}
  onclick={onClick}
  aria-label="Last page"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M5 2.5L10.5 8 5 13.5M12 2.5v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {/if}
</button>

<style>
  .garden-cursor-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: #1f73b7;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
  }

  .garden-cursor-btn:hover:not(:disabled) {
    background-color: rgba(31, 115, 183, 0.08);
    color: #1f73b7;
  }

  .garden-cursor-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }

  .garden-cursor-btn:disabled,
  .garden-cursor-btn--disabled {
    color: #c2c8cc;
    cursor: not-allowed;
    background-color: transparent;
  }

  /* RTL: rotate icon */
  .garden-cursor-btn--rtl svg {
    transform: rotate(180deg);
  }
</style>
