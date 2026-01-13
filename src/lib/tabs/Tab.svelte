<!--
  Svelte Garden - Tab Component
  
  Individual tab button with proper ARIA relationships.
-->
<script lang="ts">
  import type { TabProps } from './types';
  import type { Snippet } from 'svelte';
  import { getTabsContext } from './context';

  interface Props extends TabProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    disabled = false,
    index = 0,
    ...restProps
  }: Props = $props();

  const context = getTabsContext();
  
  const isSelected = $derived(context?.selectedIndex === index);
  const tabId = $derived(context ? `${context.tabsId}-tab-${index}` : undefined);
  const panelId = $derived(context ? `${context.tabsId}-panel-${index}` : undefined);

  const tabClasses = $derived([
    'garden-tab',
    isSelected && 'garden-tab--selected',
    disabled && 'garden-tab--disabled',
    className
  ].filter(Boolean).join(' '));

  function handleClick() {
    if (!disabled && context) {
      context.setSelectedIndex(index);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!context) return;
    
    const isVertical = context.isVertical;
    const isRtl = context.isRtl;
    
    // In RTL mode, swap left/right navigation for horizontal tabs
    let nextKey: string;
    let prevKey: string;
    
    if (isVertical) {
      nextKey = 'ArrowDown';
      prevKey = 'ArrowUp';
    } else if (isRtl) {
      // RTL horizontal: left goes forward, right goes back
      nextKey = 'ArrowLeft';
      prevKey = 'ArrowRight';
    } else {
      nextKey = 'ArrowRight';
      prevKey = 'ArrowLeft';
    }
    
    // Get all tab buttons in this tablist
    const tablist = (e.currentTarget as HTMLElement).parentElement;
    if (!tablist) return;
    
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]:not([disabled])')) as HTMLElement[];
    const currentIndex = tabs.indexOf(e.currentTarget as HTMLElement);
    
    let nextIndex: number | null = null;
    
    if (e.key === nextKey) {
      e.preventDefault();
      nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === prevKey) {
      e.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }
    
    if (nextIndex !== null && tabs[nextIndex]) {
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  }
</script>

<button
  role="tab"
  type="button"
  id={tabId}
  class={tabClasses}
  aria-selected={isSelected}
  aria-controls={panelId}
  tabindex={isSelected ? 0 : -1}
  aria-disabled={disabled || undefined}
  {disabled}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  data-garden-id="tabs.tab"
  {...restProps}
>
  {#if children}{@render children()}{/if}
</button>

<style>
  .garden-tab {
    display: inline-block;
    position: relative;
    transition: color 0.25s ease-in-out;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    overflow: hidden;
    vertical-align: top;
    user-select: none;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    padding: 10px 28px 7px;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    background: transparent;
  }

  .garden-tab::before {
    transition: box-shadow 0.1s ease-in-out;
    content: '';
  }

  .garden-tab:hover:not(:disabled) {
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-tab:focus {
    outline: none;
    text-decoration: none;
  }

  .garden-tab:focus-visible::before {
    position: absolute;
    top: 10px;
    right: 24px;
    left: 24px;
    height: calc(100% - 16px);
    border-radius: 4px;
    box-shadow: inset 0 0 0 2px var(--garden-color-border-primary-emphasis, #1f73b7);
    pointer-events: none;
  }

  .garden-tab:active:not(:disabled) {
    border-bottom-color: currentcolor;
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-tab:active:not(:disabled)::before {
    box-shadow: none;
  }

  .garden-tab--selected {
    border-bottom-color: var(--garden-color-border-primary-emphasis, #1f73b7);
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .garden-tab--disabled {
    border-bottom-color: transparent;
    color: var(--garden-color-foreground-disabled, #c2c8cc);
    cursor: default;
  }

  /* Vertical tab styles */
  :global(.garden-tablist--vertical) .garden-tab {
    display: block;
    border-bottom: none;
    border-left: 3px solid transparent;
    margin-bottom: 20px;
    padding: 4px 8px;
    text-align: left;
  }

  :global(.garden-tablist--vertical) .garden-tab:last-of-type {
    margin-bottom: 0;
  }

  :global(.garden-tablist--vertical) .garden-tab:focus-visible::before {
    top: 4px;
    right: 4px;
    left: 4px;
    height: calc(100% - 8px);
  }

  :global(.garden-tablist--vertical) .garden-tab--selected {
    border-bottom-color: transparent;
    border-left-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }

  /* RTL vertical: border on right side */
  :global(.garden-tabs--rtl .garden-tablist--vertical) .garden-tab {
    border-left: none;
    border-right: 3px solid transparent;
    text-align: right;
  }

  :global(.garden-tabs--rtl .garden-tablist--vertical) .garden-tab--selected {
    border-right-color: var(--garden-color-border-primary-emphasis, #1f73b7);
  }
</style>
