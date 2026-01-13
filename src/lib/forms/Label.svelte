<!--
  Svelte Garden - Label Component
  
  @example
  <Label>Username</Label>
  
  @example
  <Label isRequired>Email</Label>
-->
<script lang="ts">
  import type { LabelProps } from './types';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context';

  interface Props extends LabelProps {
    children?: Snippet;
  }

  let {
    children,
    isRequired = false,
    isRegular = false,
    hidden = false,
    class: className = ''
  }: Props = $props();

  const fieldContext = getFieldContext();
  const labelId = fieldContext?.labelId;
  const inputId = fieldContext?.fieldId ? `${fieldContext.fieldId}--input` : undefined;
</script>

<label
  id={labelId}
  for={inputId}
  class="garden-label {isRegular ? 'garden-label--regular' : ''} {hidden ? 'garden-label--hidden' : ''} {className}"
  data-garden-id="forms.label"
>
  {#if children}
    {@render children()}
  {/if}
  {#if isRequired}
    <span class="garden-label__required" aria-hidden="true">*</span>
  {/if}
</label>

<style>
  .garden-label {
    display: block;
    margin-bottom: 8px; /* 2 * 4px */
    font-size: 14px;
    font-weight: 600;
    line-height: 1.42857; /* 20px / 14px */
    color: var(--garden-color-foreground-default, #2f3941); /* grey.800 - foreground.default */
  }

  .garden-label--regular {
    font-weight: 400;
  }

  .garden-label--hidden {
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

  .garden-label__required {
    color: var(--garden-color-foreground-danger, #cc3340); /* red.700 - danger */
  }

  /* Compact spacing */
  :global(.garden-field--compact) .garden-label {
    margin-bottom: 4px; /* 1 * 4px */
  }
</style>
