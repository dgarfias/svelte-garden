<!--
  Svelte Garden - StartIcon Component
  
  Icon wrapper for icons placed at the start of a button.
  Provides proper spacing and rotation support.
  
  @example
  <Button>
    <StartIcon><SearchIcon /></StartIcon>
    Search
  </Button>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Rotates icon 180 degrees */
    isRotated?: boolean;
    /** Additional class name */
    class?: string;
    /** Icon content */
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isRotated = false,
  }: Props = $props();

  const iconClasses = $derived([
    'garden-btn-icon',
    'garden-btn-icon--start',
    isRotated && 'garden-btn-icon--rotated',
    className
  ].filter(Boolean).join(' '));
</script>

<span class={iconClasses} data-garden-id="buttons.icon" aria-hidden="true">
  {#if children}{@render children()}{/if}
</span>

<style>
  .garden-btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    transition: transform 0.25s ease-in-out, color 0.25s ease-in-out;
  }

  .garden-btn-icon--start {
    margin-right: 8px; /* base * 2 */
  }

  /* RTL support */
  :global([dir="rtl"]) .garden-btn-icon--start {
    margin-right: 0;
    margin-left: 8px;
  }

  .garden-btn-icon--rotated {
    transform: rotate(180deg);
  }

  :global([dir="rtl"]) .garden-btn-icon--rotated {
    transform: rotate(-180deg);
  }

  /* Make SVG fill the icon container */
  .garden-btn-icon :global(svg) {
    width: 100%;
    height: 100%;
  }
</style>
