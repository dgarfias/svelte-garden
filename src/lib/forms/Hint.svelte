<!--
  Svelte Garden - Hint Component
-->
<script lang="ts">
  import type { HintProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';

  interface Props extends HintProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = ''
  }: Props = $props();

  const fieldContext = getFieldContext();
</script>

<div
  id={fieldContext?.hintId}
  class="garden-hint {className}"
  data-garden-id="forms.hint"
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .garden-hint {
    margin-top: -4px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.42857;
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  :global(.garden-field--compact) .garden-hint {
    margin-bottom: 4px;
  }
</style>
