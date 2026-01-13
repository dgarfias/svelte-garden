<!--
  Svelte Garden - InputGroup Component
  
  Groups inputs and buttons together with proper visual styling.
  Handles border radius removal between adjacent items.
  
  @example
  <InputGroup>
    <Input placeholder="Search..." />
    <Button>Search</Button>
  </InputGroup>
  
  @example
  <InputGroup isCompact>
    <Button isNeutral focusInset>$</Button>
    <Input placeholder="Amount" />
    <Button isNeutral focusInset>.00</Button>
  </InputGroup>
-->
<script lang="ts" module>
  export const INPUT_GROUP_KEY = Symbol('garden-input-group');
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { setContext } from 'svelte';

  interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Applies compact styling */
    isCompact?: boolean;
  }

  interface Props extends InputGroupProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    isCompact = false,
    ...restProps
  }: Props = $props();

  // Provide context for child components
  setContext(INPUT_GROUP_KEY, {
    get isCompact() { return isCompact; }
  });

  const groupClasses = $derived([
    'garden-input-group',
    isCompact && 'garden-input-group--compact',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class={groupClasses}
  data-garden-id="forms.input_group"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .garden-input-group {
    display: inline-flex;
    position: relative;
    flex-wrap: nowrap;
    align-items: stretch;
    z-index: 0;
    width: 100%;
  }

  /* Margin when following label/hint/message */
  :global(.garden-label:not([hidden])) + .garden-input-group,
  :global(.garden-hint) + .garden-input-group,
  :global(.garden-message) + .garden-input-group {
    margin-top: 8px;
  }

  .garden-input-group--compact + :global(.garden-hint),
  .garden-input-group--compact + :global(.garden-message),
  :global(.garden-label:not([hidden])) + .garden-input-group--compact,
  :global(.garden-hint) + .garden-input-group--compact,
  :global(.garden-message) + .garden-input-group--compact {
    margin-top: 4px;
  }

  .garden-input-group + :global(.garden-hint),
  .garden-input-group + :global(.garden-message) {
    margin-top: 8px;
  }

  /* Child input styling */
  .garden-input-group > :global(.garden-input) {
    position: relative;
    flex: 1 1 auto;
    margin-top: 0;
    margin-bottom: 0;
    width: auto;
    min-width: 0;
  }

  /* Z-index stacking */
  .garden-input-group > :global(*) {
    z-index: -1;
  }

  .garden-input-group > :global(.garden-input) {
    z-index: 0;
  }

  .garden-input-group > :global(.garden-input:disabled) {
    z-index: -2;
  }

  .garden-input-group > :global(.garden-input:hover),
  .garden-input-group > :global(button:hover),
  .garden-input-group > :global(.garden-input:focus-visible),
  .garden-input-group > :global(button:focus-visible),
  .garden-input-group > :global(.garden-input:active),
  .garden-input-group > :global(button:active),
  .garden-input-group > :global(button[aria-pressed='true']),
  .garden-input-group > :global(button[aria-pressed='mixed']) {
    z-index: 1;
  }

  .garden-input-group > :global(button:disabled) {
    border-top-width: 0;
    border-bottom-width: 0;
  }

  /* Border overlap removal - LTR */
  .garden-input-group > :global(*:not(:first-child)) {
    margin-left: -1px;
  }

  .garden-input-group > :global(*:first-child:not(:last-child)) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .garden-input-group > :global(*:last-child:not(:first-child)) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .garden-input-group > :global(*:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  /* RTL support */
  :global([dir="rtl"]) .garden-input-group > :global(*:not(:first-child)) {
    margin-left: 0;
    margin-right: -1px;
  }

  :global([dir="rtl"]) .garden-input-group > :global(*:first-child:not(:last-child)) {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :global([dir="rtl"]) .garden-input-group > :global(*:last-child:not(:first-child)) {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
