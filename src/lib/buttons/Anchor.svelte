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
  import { NewWindowStroke } from '../icons';

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
    <NewWindowStroke class="garden-anchor__external-icon" size={12} aria-label={externalIconLabel} />
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
  :global(.garden-anchor__external-icon) {
    margin-left: 0.25em;
    vertical-align: middle;
  }
</style>
