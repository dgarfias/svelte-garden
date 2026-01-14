<!--
  Svelte Garden - MenuItem Component
-->
<script lang="ts">
  import type { MenuItemProps } from './types';
  import type { Snippet } from 'svelte';
  import { getMenuContext } from './context';
  import { useRtl } from '../theming';
  import { CheckSmStroke, PlusStroke, ChevronRightStroke } from '../icons';

  interface Props extends MenuItemProps {
    children?: Snippet;
  }

  let {
    children,
    value,
    disabled = false,
    type = 'default',
    isSelected = false,
    onSelect,
    class: className = '',
    ...restProps
  }: Props = $props();

  const menuContext = getMenuContext();
  const isRtl = useRtl();

  function handleClick() {
    if (disabled) return;
    if (value && onSelect) {
      onSelect(value);
    }
    menuContext?.onClose?.();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }

  const itemClasses = $derived([
    'garden-menu-item',
    `garden-menu-item--${type}`,
    disabled && 'garden-menu-item--disabled',
    isSelected && 'garden-menu-item--selected',
    isRtl && 'garden-menu-item--rtl',
    className
  ].filter(Boolean).join(' '));
</script>

<li
  class={itemClasses}
  role="menuitem"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled ? 'true' : undefined}
  onclick={handleClick}
  onkeydown={handleKeydown}
  data-garden-id="dropdowns.item"
  {...restProps}
>
  {#if type === 'default' || type === 'danger' || type === 'add'}
    <span class="garden-menu-item__icon">
      {#if isSelected}
        <CheckSmStroke size={12} />
      {:else if type === 'add'}
        <PlusStroke size={12} />
      {/if}
    </span>
  {/if}
  <span class="garden-menu-item__content">
    {#if children}
      {@render children()}
    {/if}
  </span>
  {#if type === 'next'}
    <ChevronRightStroke class="garden-menu-item__chevron" size={12} />
  {/if}
</li>

<style>
  .garden-menu-item {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 36px; /* 9 * 4px */
    padding: 8px 36px; /* 8px vertical, 36px horizontal for icon space */
    font-size: 14px;
    line-height: 20px;
    color: var(--garden-color-foreground-default, #2f3941);
    cursor: pointer;
    transition: color 0.25s ease-in-out;
    user-select: none;
  }

  .garden-menu-item:focus {
    outline: none;
  }

  .garden-menu-item:focus-visible,
  .garden-menu-item:hover:not(.garden-menu-item--disabled) {
    background-color: rgba(31, 115, 183, 0.08); /* primary with opacity.100 */
    box-shadow: inset 3px 0 0 var(--garden-color-foreground-primary, #1f73b7); /* 3px left border */
  }

  .garden-menu-item:active:not(.garden-menu-item--disabled) {
    background-color: rgba(31, 115, 183, 0.16); /* opacity.200 */
  }

  /* Icon container */
  .garden-menu-item__icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-menu-item__icon :global(svg) {
    width: 12px;
    height: 12px;
  }

  .garden-menu-item__content {
    flex: 1;
    overflow-wrap: anywhere;
  }

  .garden-menu-item__chevron {
    width: 12px;
    height: 12px;
    margin-left: 8px;
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  /* Type variants */
  .garden-menu-item--danger {
    color: var(--garden-color-foreground-danger, #cc3340);
  }

  .garden-menu-item--danger:focus-visible,
  .garden-menu-item--danger:hover:not(.garden-menu-item--disabled) {
    background-color: rgba(204, 51, 64, 0.08);
    box-shadow: inset 3px 0 0 var(--garden-color-foreground-danger, #cc3340);
  }

  .garden-menu-item--add {
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-menu-item--header {
    font-weight: 600;
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: default;
    padding-left: 12px;
  }

  .garden-menu-item--header:hover {
    background-color: transparent;
    box-shadow: none;
  }

  /* Disabled */
  .garden-menu-item--disabled {
    color: var(--garden-color-foreground-subtle, #68737d);
    cursor: default;
  }

  .garden-menu-item--disabled .garden-menu-item__icon {
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  /* Selected */
  .garden-menu-item--selected .garden-menu-item__icon {
    opacity: 1;
  }

  /* ===========================================
   * RTL SUPPORT
   * =========================================== */

  /* RTL: flip selection border to right side */
  .garden-menu-item--rtl:focus-visible,
  .garden-menu-item--rtl:hover:not(.garden-menu-item--disabled) {
    box-shadow: inset -3px 0 0 var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-menu-item--rtl.garden-menu-item--danger:focus-visible,
  .garden-menu-item--rtl.garden-menu-item--danger:hover:not(.garden-menu-item--disabled) {
    box-shadow: inset -3px 0 0 var(--garden-color-foreground-danger, #cc3340);
  }

  /* RTL: flip icon position to right */
  .garden-menu-item--rtl .garden-menu-item__icon {
    left: auto;
    right: 12px;
  }

  /* RTL: flip chevron margin */
  .garden-menu-item--rtl .garden-menu-item__chevron {
    margin-left: 0;
    margin-right: 8px;
    transform: rotate(180deg);
  }

  /* RTL: header padding */
  .garden-menu-item--rtl.garden-menu-item--header {
    padding-left: 36px;
    padding-right: 12px;
  }
</style>
