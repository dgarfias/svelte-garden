<!--
  Svelte Garden - Fieldset Component
  
  Groups related form fields with an optional legend.
  
  @example
  <Fieldset>
    {#snippet legend()}
      <Legend>Contact Information</Legend>
    {/snippet}
    <Field>
      <Label>Name</Label>
      <Input />
    </Field>
    <Field>
      <Label>Email</Label>
      <Input type="email" />
    </Field>
  </Fieldset>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLFieldsetAttributes } from 'svelte/elements';
  import { setContext } from 'svelte';

  interface Props extends HTMLFieldsetAttributes {
    children?: Snippet;
    /** Whether to use compact spacing */
    isCompact?: boolean;
  }

  let {
    children,
    isCompact = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Provide context for nested fields using getter to capture reactive value
  setContext('garden-fieldset', {
    get isCompact() { return isCompact; }
  });

  const fieldsetClasses = $derived([
    'garden-fieldset',
    isCompact && 'garden-fieldset--compact',
    className
  ].filter(Boolean).join(' '));
</script>

<fieldset
  class={fieldsetClasses}
  data-garden-id="forms.fieldset"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</fieldset>

<style>
  .garden-fieldset {
    margin: 0;
    padding: 0;
    border: none;
  }

  /* Nested fields get spacing */
  .garden-fieldset :global(.garden-field) {
    margin-top: 8px; /* base * 2 */
  }

  .garden-fieldset :global(.garden-field:first-of-type) {
    margin-top: 0;
  }

  .garden-fieldset--compact :global(.garden-field) {
    margin-top: 4px; /* base * 1 */
  }
</style>
