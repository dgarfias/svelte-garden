<!--
  Svelte Garden - MenuSeparator Component
-->
<script lang="ts">
  import type { MenuSeparatorProps } from './types';

  let {
    class: className = '',
    ...restProps
  }: MenuSeparatorProps = $props();
</script>

<li
  class="garden-menu-separator {className}"
  role="separator"
  data-garden-id="dropdowns.separator"
  {...restProps}
></li>

<style>
  .garden-menu-separator {
    margin: 4px 0;
    height: 1px;
    background-color: #e8eaec; /* border.subtle */
    cursor: default;
  }
</style>
