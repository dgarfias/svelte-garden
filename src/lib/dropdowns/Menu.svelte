<!--
  Svelte Garden - Menu Component
  
  A dropdown menu for actions with click-outside handling.
  
  @example
  <Menu isExpanded={open} onClose={() => open = false}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem type="danger">Delete</MenuItem>
  </Menu>
-->
<script lang="ts">
  import type { MenuProps } from './types';
  import type { Snippet } from 'svelte';
  import { setMenuContext } from './context';
  import { useRtl } from '../theming';

  interface Props extends MenuProps {
    children?: Snippet;
    /** Reference to trigger element for positioning */
    triggerRef?: HTMLElement;
  }

  let {
    children,
    triggerRef,
    isExpanded = false,
    placement = 'bottom-start',
    onClose,
    hasArrow = false,
    maxHeight = '400px',
    class: className = '',
    ...restProps
  }: Props = $props();

  let menuElement: HTMLDivElement | undefined = $state();
  let focusedIndex = $state(-1);
  const menuId = `garden-menu-${Math.random().toString(36).slice(2, 9)}`;
  const isRtl = useRtl();

  // Set context for child components
  setMenuContext({
    get onClose() { return onClose; },
    focusedValue: undefined
  });

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    if (!menuElement) return;
    
    const items = menuElement.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
    const itemCount = items.length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusedIndex = (focusedIndex + 1) % itemCount;
        (items[focusedIndex] as HTMLElement)?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusedIndex = focusedIndex <= 0 ? itemCount - 1 : focusedIndex - 1;
        (items[focusedIndex] as HTMLElement)?.focus();
        break;
      case 'Home':
        event.preventDefault();
        focusedIndex = 0;
        (items[focusedIndex] as HTMLElement)?.focus();
        break;
      case 'End':
        event.preventDefault();
        focusedIndex = itemCount - 1;
        (items[focusedIndex] as HTMLElement)?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        onClose?.();
        break;
      case 'Tab':
        onClose?.();
        break;
    }
  }

  // Handle click outside
  function handleClickOutside(event: MouseEvent) {
    if (!menuElement || !isExpanded) return;
    
    const target = event.target as Node;
    
    // Check if click is outside menu and outside trigger
    if (!menuElement.contains(target) && !triggerRef?.contains(target)) {
      onClose?.();
    }
  }

  // Focus first item when menu opens
  $effect(() => {
    if (isExpanded && menuElement) {
      const firstItem = menuElement.querySelector('[role="menuitem"]:not([aria-disabled="true"])') as HTMLElement;
      if (firstItem) {
        focusedIndex = 0;
        firstItem.focus();
      }
      
      // Add click outside listener
      document.addEventListener('click', handleClickOutside, true);
      
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
  });
</script>

{#if isExpanded}
  <div
    bind:this={menuElement}
    id={menuId}
    class="garden-menu {className}"
    class:garden-menu--rtl={isRtl}
    role="menu"
    style="max-height: {maxHeight}"
    onkeydown={handleKeydown}
    data-garden-id="dropdowns.menu"
    {...restProps}
  >
    {#if hasArrow}
      <div class="garden-menu__arrow"></div>
    {/if}
    <ul class="garden-menu__list" role="none">
      {#if children}
        {@render children()}
      {/if}
    </ul>
  </div>
{/if}

<style>
  .garden-menu {
    position: absolute;
    z-index: 1000;
    display: inline-block;
    box-sizing: border-box;
    min-width: 180px;
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    background-color: var(--garden-color-background-raised, #fff);
    box-shadow: 0 20px 24px 0 rgba(0, 0, 0, 0.16); /* shadow.medium */
    animation: menuSlideIn 0.2s cubic-bezier(0.15, 0.85, 0.35, 1.2);
  }

  @keyframes menuSlideIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .garden-menu__list {
    margin: 0;
    padding: 4px 0; /* base vertical padding */
    list-style: none;
    overflow-y: auto;
  }

  .garden-menu__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: var(--garden-color-background-raised, #fff);
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-right: none;
    border-bottom: none;
    transform: rotate(45deg);
    top: -5px;
    left: 16px;
  }

  /* RTL: flip arrow position */
  .garden-menu--rtl .garden-menu__arrow {
    left: auto;
    right: 16px;
    border-right: 1px solid var(--garden-color-border-default, #d8dcde);
    border-left: none;
  }

  /* RTL: direction for text alignment */
  .garden-menu--rtl {
    direction: rtl;
  }
</style>
