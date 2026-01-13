<!--
  Svelte Garden - SplitButton Component
  
  A wrapper component for grouping buttons together.
  
  @example
  <SplitButton>
    <Button isPrimary>Main Action</Button>
    <IconButton isPrimary aria-label="More options">
      <ChevronIcon />
    </IconButton>
  </SplitButton>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className = ''
  }: Props = $props();
</script>

<div
  class="garden-split-button {className}"
  data-garden-id="buttons.split_button"
  role="group"
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .garden-split-button {
    display: inline-flex;
    position: relative;
    z-index: 0;
    white-space: nowrap;
  }

  /* Button grouping styles - target garden-btn (Button) and garden-icon-button (IconButton) */
  .garden-split-button :global(.garden-btn),
  .garden-split-button :global(.garden-icon-button) {
    position: relative;
    transition:
      border-color 0.1s ease-in-out,
      background-color 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out,
      color 0.1s ease-in-out,
      margin-left 0.1s ease-in-out,
      outline-color 0.1s ease-in-out,
      z-index 0.25s ease-in-out;
  }

  /* Middle buttons */
  .garden-split-button :global(.garden-btn:not(:first-child):not(:last-child)),
  .garden-split-button :global(.garden-icon-button:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  /* First button in group */
  .garden-split-button :global(.garden-btn:first-child:not(:last-child)),
  .garden-split-button :global(.garden-icon-button:first-child:not(:last-child)) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* Last button in group */
  .garden-split-button :global(.garden-btn:last-child:not(:first-child)),
  .garden-split-button :global(.garden-icon-button:last-child:not(:first-child)) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* Negative margin for overlapping borders - non-primary, non-basic buttons */
  .garden-split-button :global(.garden-btn:not(:first-child):not(.garden-btn--primary):not(.garden-btn--basic)),
  .garden-split-button :global(.garden-icon-button:not(:first-child):not(.garden-icon-button--primary):not(.garden-icon-button--basic)) {
    margin-left: -1px;
  }

  /* Primary and basic buttons need a small gap instead */
  .garden-split-button :global(.garden-btn--primary:not(:first-child)),
  .garden-split-button :global(.garden-icon-button--primary:not(:first-child)),
  .garden-split-button :global(.garden-btn--basic:not(:first-child)),
  .garden-split-button :global(.garden-icon-button--basic:not(:first-child)) {
    margin-left: 1px;
  }

  /* Raise active/focused buttons */
  .garden-split-button :global(.garden-btn:hover),
  .garden-split-button :global(.garden-btn:active),
  .garden-split-button :global(.garden-btn:focus-visible),
  .garden-split-button :global(.garden-icon-button:hover),
  .garden-split-button :global(.garden-icon-button:active),
  .garden-split-button :global(.garden-icon-button:focus-visible) {
    z-index: 1;
  }

  /* Lower disabled buttons */
  .garden-split-button :global(.garden-btn:disabled),
  .garden-split-button :global(.garden-icon-button:disabled) {
    z-index: -1;
  }

  /* Reset margin on disabled buttons to prevent gaps */
  .garden-split-button :global(.garden-btn:not(:first-child):disabled),
  .garden-split-button :global(.garden-icon-button:not(:first-child):disabled) {
    margin-left: 0;
  }
</style>
