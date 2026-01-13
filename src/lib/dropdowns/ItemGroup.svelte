<!--
  Svelte Garden - ItemGroup Component
  
  Groups menu items with an optional label header.
  
  @example
  <Menu>
    <ItemGroup legend="Actions">
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </ItemGroup>
  </Menu>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Group label text */
    legend?: string;
    /** Icon to display before the legend */
    icon?: Snippet;
    /** Content slot */
    children?: Snippet;
  }

  let {
    children,
    legend,
    icon,
    class: className = '',
    ...restProps
  }: Props = $props();

  const groupId = `menu-group-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div
  class="garden-menu-group {className}"
  role="group"
  aria-labelledby={legend ? groupId : undefined}
  data-garden-id="dropdowns.item_group"
  {...restProps}
>
  {#if legend}
    <div class="garden-menu-group__header" id={groupId}>
      {#if icon}
        <span class="garden-menu-group__icon" aria-hidden="true">
          {@render icon()}
        </span>
      {/if}
      <span class="garden-menu-group__legend">{legend}</span>
    </div>
  {/if}
  <div class="garden-menu-group__content">
    {#if children}{@render children()}{/if}
  </div>
</div>

<style>
  .garden-menu-group {
    display: block;
  }

  /* Separator between groups - use :global since siblings are separate component instances */
  :global(.garden-menu-group + .garden-menu-group) {
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid #e9ebed;
  }

  .garden-menu-group__header {
    display: flex;
    align-items: center;
    padding: 8px 16px 4px;
    color: #68737d;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 14px;
  }

  .garden-menu-group__icon {
    display: inline-flex;
    margin-right: 8px;
    width: 12px;
    height: 12px;
    color: inherit;
  }

  .garden-menu-group__icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  /* RTL support */
  :global([dir="rtl"]) .garden-menu-group__icon {
    margin-right: 0;
    margin-left: 8px;
  }

  .garden-menu-group__legend {
    flex: 1;
  }

  .garden-menu-group__content {
    display: flex;
    flex-direction: column;
  }

  /* Dark mode */
  :global([data-garden-color-scheme="dark"] .garden-menu-group + .garden-menu-group) {
    border-top-color: #49545c;
  }

  :global([data-garden-color-scheme="dark"]) .garden-menu-group__header {
    color: #87929d;
  }
</style>
