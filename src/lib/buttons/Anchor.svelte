<!--
  Svelte Garden - Anchor Component
  
  A styled anchor/link component.
  
  @example
  <Anchor href="https://example.com">Link text</Anchor>
  
  @example
  <Anchor href="https://example.com" isExternal>External link</Anchor>
  
  @example
  <Anchor href="https://example.com" isDanger>Danger link</Anchor>
-->
<script lang="ts">
  import type { AnchorProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends AnchorProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    href,
    isDanger = false,
    isExternal = false,
    isUnderlined = true,
    externalIconLabel = 'Opens in a new window',
    ...restProps
  }: Props = $props();

  const anchorClasses = $derived([
    'garden-anchor',
    isDanger && 'garden-anchor--danger',
    !isUnderlined && 'garden-anchor--no-underline',
    className
  ].filter(Boolean).join(' '));

  // External link attributes
  const externalAttrs = $derived(isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {});
</script>

<a
  class={anchorClasses}
  {href}
  data-garden-id="buttons.anchor"
  {...externalAttrs}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
  {#if isExternal}
    <svg
      class="garden-anchor__external-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-label={externalIconLabel}
      role="img"
    >
      <path
        fill="currentColor"
        d="M10 1v4a1 1 0 0 1-2 0V3.414L4.707 6.707a1 1 0 0 1-1.414-1.414L6.586 2H5a1 1 0 0 1 0-2h4a1 1 0 0 1 1 1zM8 10H3V5a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2z"
      />
    </svg>
  {/if}
</a>

<style>
  .garden-anchor {
    color: var(--garden-color-foreground-primary, #1f73b7);
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.25s ease-in-out;
    outline-color: transparent;
  }

  .garden-anchor:hover {
    color: var(--_garden-anchor-hover-color, #3091ec);
  }

  .garden-anchor:active {
    color: var(--_garden-anchor-active-color, #1f73b7);
  }

  .garden-anchor:focus {
    outline: none;
  }

  .garden-anchor:focus-visible {
    outline: 2px solid var(--garden-color-border-primary-emphasis, #1f73b7);
    outline-offset: 1px;
  }

  /* Danger variant */
  .garden-anchor--danger {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  .garden-anchor--danger:hover {
    color: var(--_garden-anchor-danger-hover, #e34f32);
  }

  /* No underline variant */
  .garden-anchor--no-underline {
    text-decoration: none;
  }

  .garden-anchor--no-underline:hover {
    text-decoration: underline;
  }

  /* External icon */
  .garden-anchor__external-icon {
    margin-left: 0.25em;
    vertical-align: middle;
  }
</style>
