<!--
  Svelte Garden - Field Component
  
  Container component that provides context for form field composition.
  
  @example
  <Field>
    <Label>Username</Label>
    <Hint>Enter your username</Hint>
    <Input />
    <Message validation="error">Username is required</Message>
  </Field>
-->
<script lang="ts">
  import type { FieldProps } from './types';
  import type { Snippet } from 'svelte';
  import { setFieldContext } from './context';

  interface Props extends FieldProps {
    children?: Snippet;
  }

  let {
    children,
    id,
    isCompact = false,
    class: className = ''
  }: Props = $props();

  // Generate unique ID if not provided
  const fieldId = $derived(id || `garden-field-${Math.random().toString(36).slice(2, 9)}`);
  
  // Track whether hint/message are present
  let hasHint = $state(false);
  let hasMessage = $state(false);
  let validation = $state<'success' | 'warning' | 'error' | undefined>(undefined);

  // Set up field context
  setFieldContext({
    get fieldId() { return fieldId; },
    get labelId() { return `${fieldId}--label`; },
    get hintId() { return `${fieldId}--hint`; },
    get messageId() { return `${fieldId}--message`; },
    get hasHint() { return hasHint; },
    get hasMessage() { return hasMessage; },
    get validation() { return validation; },
    get isCompact() { return isCompact; }
  });
</script>

<div
  class="garden-field {isCompact ? 'garden-field--compact' : ''} {className}"
  data-garden-id="forms.field"
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .garden-field {
    display: block;
  }
</style>
