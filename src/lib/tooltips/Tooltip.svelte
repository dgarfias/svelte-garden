<!--
  Svelte Garden - Tooltip Component
  
  Matches React Garden tooltip styling.
  Dark type has inverse (dark) background, light type has raised background.
  
  @example
  <Tooltip content="Helpful info">
    <button>Hover me</button>
  </Tooltip>
-->
<script lang="ts">
  import type { TooltipProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends TooltipProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    content,
    placement = 'top',
    size,
    type = 'dark',
    delayShow = 500,
    delayHide = 0,
    hasArrow = true,
    isVisible: controlledVisible,
    ...restProps
  }: Props = $props();

  // Default size based on type (matching React)
  const effectiveSize = $derived(size ?? (type === 'dark' ? 'small' : 'large'));

  let isHovered = $state(false);
  let isFocused = $state(false);
  let showTimeout: ReturnType<typeof setTimeout> | null = null;
  let hideTimeout: ReturnType<typeof setTimeout> | null = null;

  const isVisible = $derived(controlledVisible !== undefined ? controlledVisible : (isHovered || isFocused));

  function handleMouseEnter() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    showTimeout = setTimeout(() => {
      isHovered = true;
    }, delayShow);
  }

  function handleMouseLeave() {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    hideTimeout = setTimeout(() => {
      isHovered = false;
    }, delayHide);
  }

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = false;
  }

  const tooltipClasses = $derived([
    'garden-tooltip',
    `garden-tooltip--${placement}`,
    `garden-tooltip--${effectiveSize}`,
    `garden-tooltip--${type}`,
    hasArrow && 'garden-tooltip--has-arrow',
    className
  ].filter(Boolean).join(' '));
</script>

<div
  class="garden-tooltip-wrapper"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onfocusin={handleFocus}
  onfocusout={handleBlur}
  data-garden-id="tooltips.tooltip"
  {...restProps}
>
  {#if children}{@render children()}{/if}
  
  {#if isVisible}
    <div
      role="tooltip"
      class={tooltipClasses}
    >
      {content}
      {#if hasArrow}
        <span class="garden-tooltip__arrow"></span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .garden-tooltip-wrapper {
    position: relative;
    display: inline-block;
  }

  .garden-tooltip {
    position: absolute;
    z-index: 1000;
    pointer-events: none;
    animation: garden-tooltip-fade 0.15s ease-out;
    box-sizing: border-box;
  }

  /* Dark type - inverse background (default)
     Uses neutralHue: light mode shade 900, dark mode shade 700 */
  .garden-tooltip--dark {
    background-color: var(--garden-color-tooltip-background-dark, var(--garden-palette-grey-900, #293239));
    color: var(--garden-palette-white, #fff);
    border: 1px solid var(--garden-color-tooltip-background-dark, var(--garden-palette-grey-900, #293239));
    box-shadow: 0 4px 8px 0 var(--garden-color-shadow-small, rgba(4, 68, 77, 0.1));
  }

  /* Light type - raised background */
  .garden-tooltip--light {
    background-color: var(--garden-color-background-raised, #fff);
    color: var(--garden-color-foreground-subtle, #68737d);
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    box-shadow: 0 20px 28px 0 var(--garden-color-shadow-medium, rgba(4, 68, 77, 0.15));
  }

  /* Size: small - compact, nowrap */
  .garden-tooltip--small {
    padding: 0 8px;
    font-size: 12px;
    line-height: 20px;
    border-radius: 2px;
    white-space: nowrap;
  }

  /* Size: medium */
  .garden-tooltip--medium {
    padding: 8px;
    font-size: 12px;
    line-height: 16px;
    border-radius: 4px;
    max-width: 140px;
    white-space: normal;
    word-wrap: break-word;
  }

  /* Size: large */
  .garden-tooltip--large {
    padding: 20px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
    max-width: 270px;
    white-space: normal;
    word-wrap: break-word;
  }

  /* Size: extra-large */
  .garden-tooltip--extra-large {
    padding: 40px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
    max-width: 460px;
    white-space: normal;
    word-wrap: break-word;
  }

  /* Placements - Top */
  .garden-tooltip--top,
  .garden-tooltip--top-start,
  .garden-tooltip--top-end {
    bottom: 100%;
    margin-bottom: 6px;
  }
  .garden-tooltip--top { left: 50%; transform: translateX(-50%); }
  .garden-tooltip--top-start { left: 0; }
  .garden-tooltip--top-end { right: 0; }

  /* Placements - Bottom */
  .garden-tooltip--bottom,
  .garden-tooltip--bottom-start,
  .garden-tooltip--bottom-end {
    top: 100%;
    margin-top: 6px;
  }
  .garden-tooltip--bottom { left: 50%; transform: translateX(-50%); }
  .garden-tooltip--bottom-start { left: 0; }
  .garden-tooltip--bottom-end { right: 0; }

  /* Placements - Start (Left in LTR) */
  .garden-tooltip--start,
  .garden-tooltip--start-top,
  .garden-tooltip--start-bottom {
    right: 100%;
    margin-right: 6px;
  }
  .garden-tooltip--start { top: 50%; transform: translateY(-50%); }
  .garden-tooltip--start-top { top: 0; }
  .garden-tooltip--start-bottom { bottom: 0; }

  /* Placements - End (Right in LTR) */
  .garden-tooltip--end,
  .garden-tooltip--end-top,
  .garden-tooltip--end-bottom {
    left: 100%;
    margin-left: 6px;
  }
  .garden-tooltip--end { top: 50%; transform: translateY(-50%); }
  .garden-tooltip--end-top { top: 0; }
  .garden-tooltip--end-bottom { bottom: 0; }

  /* Larger margins for large/extra-large sizes */
  .garden-tooltip--large.garden-tooltip--top,
  .garden-tooltip--large.garden-tooltip--top-start,
  .garden-tooltip--large.garden-tooltip--top-end { margin-bottom: 8px; }
  .garden-tooltip--large.garden-tooltip--bottom,
  .garden-tooltip--large.garden-tooltip--bottom-start,
  .garden-tooltip--large.garden-tooltip--bottom-end { margin-top: 8px; }
  .garden-tooltip--large.garden-tooltip--start,
  .garden-tooltip--large.garden-tooltip--start-top,
  .garden-tooltip--large.garden-tooltip--start-bottom { margin-right: 8px; }
  .garden-tooltip--large.garden-tooltip--end,
  .garden-tooltip--large.garden-tooltip--end-top,
  .garden-tooltip--large.garden-tooltip--end-bottom { margin-left: 8px; }

  .garden-tooltip--extra-large.garden-tooltip--top,
  .garden-tooltip--extra-large.garden-tooltip--top-start,
  .garden-tooltip--extra-large.garden-tooltip--top-end { margin-bottom: 12px; }
  .garden-tooltip--extra-large.garden-tooltip--bottom,
  .garden-tooltip--extra-large.garden-tooltip--bottom-start,
  .garden-tooltip--extra-large.garden-tooltip--bottom-end { margin-top: 12px; }
  .garden-tooltip--extra-large.garden-tooltip--start,
  .garden-tooltip--extra-large.garden-tooltip--start-top,
  .garden-tooltip--extra-large.garden-tooltip--start-bottom { margin-right: 12px; }
  .garden-tooltip--extra-large.garden-tooltip--end,
  .garden-tooltip--extra-large.garden-tooltip--end-top,
  .garden-tooltip--extra-large.garden-tooltip--end-bottom { margin-left: 12px; }

  /* Arrow */
  .garden-tooltip__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    border: inherit;
    border-right: none;
    border-bottom: none;
  }

  /* Arrow positions - Top placements */
  .garden-tooltip--top .garden-tooltip__arrow,
  .garden-tooltip--top-start .garden-tooltip__arrow,
  .garden-tooltip--top-end .garden-tooltip__arrow {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(-135deg);
  }
  .garden-tooltip--top-start .garden-tooltip__arrow { left: 12px; transform: rotate(-135deg); }
  .garden-tooltip--top-end .garden-tooltip__arrow { left: auto; right: 12px; transform: rotate(-135deg); }

  /* Arrow positions - Bottom placements */
  .garden-tooltip--bottom .garden-tooltip__arrow,
  .garden-tooltip--bottom-start .garden-tooltip__arrow,
  .garden-tooltip--bottom-end .garden-tooltip__arrow {
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
  .garden-tooltip--bottom-start .garden-tooltip__arrow { left: 12px; transform: rotate(45deg); }
  .garden-tooltip--bottom-end .garden-tooltip__arrow { left: auto; right: 12px; transform: rotate(45deg); }

  /* Arrow positions - Start placements */
  .garden-tooltip--start .garden-tooltip__arrow,
  .garden-tooltip--start-top .garden-tooltip__arrow,
  .garden-tooltip--start-bottom .garden-tooltip__arrow {
    right: -5px;
    top: 50%;
    transform: translateY(-50%) rotate(135deg);
  }
  .garden-tooltip--start-top .garden-tooltip__arrow { top: 12px; transform: rotate(135deg); }
  .garden-tooltip--start-bottom .garden-tooltip__arrow { top: auto; bottom: 12px; transform: rotate(135deg); }

  /* Arrow positions - End placements */
  .garden-tooltip--end .garden-tooltip__arrow,
  .garden-tooltip--end-top .garden-tooltip__arrow,
  .garden-tooltip--end-bottom .garden-tooltip__arrow {
    left: -5px;
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
  }
  .garden-tooltip--end-top .garden-tooltip__arrow { top: 12px; transform: rotate(-45deg); }
  .garden-tooltip--end-bottom .garden-tooltip__arrow { top: auto; bottom: 12px; transform: rotate(-45deg); }

  @keyframes garden-tooltip-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
