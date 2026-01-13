<!--
  Svelte Garden - Caption Component
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    /** Whether caption is hidden visually but available to screen readers */
    isHidden?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    class: className = '',
    isHidden = false,
    ...restProps
  }: Props = $props();

  const captionClasses = $derived([
    'garden-caption',
    isHidden && 'garden-caption--hidden',
    className
  ].filter(Boolean).join(' '));
</script>

<caption class={captionClasses} data-garden-id="tables.caption" {...restProps as Record<string, unknown>}>
  {#if children}{@render children()}{/if}
</caption>

<style>
  .garden-caption {
    padding: 12px 8px;
    text-align: left;
    font-weight: 600;
    color: var(--garden-color-foreground-default, #2f3941);
    caption-side: top;
  }

  .garden-caption--hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
