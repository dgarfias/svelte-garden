<!--
  Svelte Garden - Avatar Component
  
  Matches React Garden avatar styling exactly.
  Status indicators include icons for away/transfers states.
  
  @example
  <Avatar src="/user.jpg" alt="User Name" />
  
  @example
  <Avatar text="JD" status="available" />
-->
<script lang="ts">
  import type { AvatarProps } from './types';
  import type { Snippet } from 'svelte';
  import { useRtl } from '../theming';

  interface Props extends AvatarProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    status,
    isSystem = false,
    backgroundColor,
    foregroundColor,
    src,
    alt = '',
    text,
    badge,
    surfaceColor,
    ...restProps
  }: Props = $props();

  const isRtl = useRtl();

  // Avatar sizes in px (base * multiplier)
  const sizeMap = {
    extraextrasmall: 16, // 4 * 4
    extrasmall: 24,      // 6 * 4
    small: 32,           // 8 * 4
    medium: 40,          // 10 * 4
    large: 48            // 12 * 4
  };

  // Font sizes for text/initials
  const fontSizeMap = {
    extraextrasmall: 0,  // Hidden
    extrasmall: 12,      // sm
    small: 14,           // md
    medium: 16,          // lg
    large: 18            // xl
  };

  // Status indicator base sizes (before border offset subtraction)
  // base * multiplier, matches React: xxs=4, xs=8, s=12, m/l=16
  const statusBaseSizeMap = {
    extraextrasmall: 4,   // base * 1
    extrasmall: 8,        // base * 2
    small: 12,            // base * 3
    medium: 16,           // base * 4
    large: 16             // base * 4
  };

  // Border offset (shadowWidths.sm = 2px, except xxs which is 1px)
  const borderOffsetMap = {
    extraextrasmall: 1,
    extrasmall: 2,
    small: 2,
    medium: 2,
    large: 2
  };

  // Position offset for status indicator
  // React: -4px + (xxs/xs: 3, others: 2)
  const positionOffsetMap = {
    extraextrasmall: -1,  // -4 + 3
    extrasmall: -1,       // -4 + 3
    small: -2,            // -4 + 2
    medium: -2,           // -4 + 2
    large: -2             // -4 + 2
  };

  const avatarClasses = $derived([
    'garden-avatar',
    `garden-avatar--${size}`,
    isSystem && 'garden-avatar--system',
    status && `garden-avatar--status-${status}`,
    isRtl && 'garden-avatar--rtl',
    className
  ].filter(Boolean).join(' '));

  const avatarStyles = $derived([
    backgroundColor && `--avatar-bg: ${backgroundColor}`,
    foregroundColor && `--avatar-fg: ${foregroundColor}`,
    surfaceColor && `--avatar-surface: ${surfaceColor}`
  ].filter(Boolean).join('; '));

  // Compute status indicator size (subtract border offset * 2 for non-active)
  const borderOffset = $derived(borderOffsetMap[size]);
  const statusBaseSize = $derived(statusBaseSizeMap[size]);
  const statusSize = $derived(
    status === 'active' 
      ? statusBaseSize 
      : statusBaseSize - (borderOffset * 2)
  );
  const positionOffset = $derived(positionOffsetMap[size]);
  const fontSize = $derived(fontSizeMap[size]);
  
  // Use larger icon for medium/large sizes
  const useSmallIcon = $derived(size === 'extraextrasmall' || size === 'extrasmall' || size === 'small');
</script>

<figure
  class={avatarClasses}
  style={avatarStyles || undefined}
  data-garden-id="avatars.avatar"
  {...restProps}
>
  <div class="garden-avatar__content">
    {#if src}
      <img class="garden-avatar__img" {src} {alt} />
    {:else if text && fontSize > 0}
      <span class="garden-avatar__text" style="font-size: {fontSize}px">{text}</span>
    {:else if children}
      <span class="garden-avatar__icon">
        {@render children()}
      </span>
    {:else}
      <!-- Default user icon -->
      <svg class="garden-avatar__icon" viewBox="0 0 16 16" aria-hidden="true">
        <path fill="currentColor" d="M8 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0 1c-2.114 0-4 1.575-4 3.5 0 .828.672 1.5 1.5 1.5h5c.828 0 1.5-.672 1.5-1.5C12 9.575 10.114 8 8 8z"/>
      </svg>
    {/if}
  </div>

  {#if status}
    <figcaption 
      class="garden-avatar__status"
      style="
        width: {statusSize}px; 
        height: {statusSize}px; 
        min-width: {statusSize}px;
        border-width: {borderOffset}px;
        {isRtl ? 'left' : 'right'}: {positionOffset}px;
        bottom: {positionOffset}px;
      "
    >
      {#if status === 'away'}
        <!-- Clock stroke icon for away status (matches @zendeskgarden/svg-icons) -->
        {#if useSmallIcon}
          <svg 
            class="garden-avatar__status-icon" 
            viewBox="0 0 12 12" 
            aria-hidden="true"
            style="width: {statusBaseSize}px; height: {statusBaseSize}px; top: -{borderOffset}px; {isRtl ? 'right' : 'left'}: -{borderOffset}px;"
          >
            <path fill="currentColor" d="M6 0a6 6 0 110 12A6 6 0 016 0zm0 1a5 5 0 100 10A5 5 0 006 1zm.5 2v3.293l1.854 1.853a.5.5 0 01-.708.708l-2-2A.5.5 0 015.5 6.5v-3a.5.5 0 011 0z"/>
          </svg>
        {:else}
          <svg 
            class="garden-avatar__status-icon" 
            viewBox="0 0 16 16" 
            aria-hidden="true"
            style="width: {statusBaseSize}px; height: {statusBaseSize}px; top: -{borderOffset}px; {isRtl ? 'right' : 'left'}: -{borderOffset}px;"
          >
            <path fill="currentColor" d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1a7 7 0 100 14A7 7 0 008 1zm.5 3v4.293l2.354 2.353a.5.5 0 01-.708.708l-2.5-2.5A.5.5 0 017.5 8.5v-4a.5.5 0 011 0z"/>
          </svg>
        {/if}
      {:else if status === 'transfers'}
        <!-- Arrow-left stroke icon for transfers status (mirrored in RTL) -->
        {#if useSmallIcon}
          <svg 
            class="garden-avatar__status-icon" 
            viewBox="0 0 12 12" 
            aria-hidden="true"
            style="width: {statusBaseSize}px; height: {statusBaseSize}px; top: -{borderOffset}px; {isRtl ? 'right' : 'left'}: -{borderOffset}px; transform: scaleX({isRtl ? -1 : 1});"
          >
            <path fill="currentColor" d="M9.5 5.5a.5.5 0 010 1H4.707l1.647 1.646a.5.5 0 01-.708.708l-2.5-2.5a.5.5 0 010-.708l2.5-2.5a.5.5 0 01.708.708L4.707 5.5H9.5z"/>
          </svg>
        {:else}
          <svg 
            class="garden-avatar__status-icon" 
            viewBox="0 0 16 16" 
            aria-hidden="true"
            style="width: {statusBaseSize}px; height: {statusBaseSize}px; top: -{borderOffset}px; {isRtl ? 'right' : 'left'}: -{borderOffset}px; transform: scaleX({isRtl ? -1 : 1});"
          >
            <path fill="currentColor" d="M12.5 7.5a.5.5 0 010 1H5.707l2.647 2.646a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708.708L5.707 7.5H12.5z"/>
          </svg>
        {/if}
      {:else if status === 'active' && badge !== undefined}
        <span class="garden-avatar__badge-text">{badge}</span>
      {/if}
      <span class="sr-only">{status}</span>
    </figcaption>
  {/if}
</figure>

<style>
  .garden-avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    vertical-align: middle;
    box-sizing: border-box;
    transition: box-shadow 0.25s ease-in-out;
  }

  /* Avatar ring (box-shadow) based on status color - applied to the avatar itself */
  .garden-avatar--status-available {
    box-shadow: 0 0 0 2px var(--garden-color-status-available, var(--garden-palette-mint-500, #00a656));
  }
  .garden-avatar--status-away {
    box-shadow: 0 0 0 2px var(--garden-color-status-away, var(--garden-palette-orange-500, #de701d));
  }
  .garden-avatar--status-transfers {
    box-shadow: 0 0 0 2px var(--garden-color-status-transfers, var(--garden-palette-azure-500, #1f73b7));
  }
  .garden-avatar--status-offline {
    box-shadow: 0 0 0 2px var(--garden-color-status-offline, var(--garden-palette-grey-500, #87929d));
  }
  .garden-avatar--status-active {
    box-shadow: 0 0 0 2px var(--garden-color-status-active, var(--garden-palette-crimson-700, #cc3340));
  }

  .garden-avatar__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--avatar-bg, var(--garden-color-background-emphasis, #87929d));
    color: var(--avatar-fg, var(--garden-palette-white, #fff));
    overflow: hidden;
  }

  /* Size variants */
  .garden-avatar--extraextrasmall { width: 16px; height: 16px; border-radius: 50%; }
  .garden-avatar--extrasmall { width: 24px; height: 24px; border-radius: 50%; }
  .garden-avatar--small { width: 32px; height: 32px; border-radius: 50%; }
  .garden-avatar--medium { width: 40px; height: 40px; border-radius: 50%; }
  .garden-avatar--large { width: 48px; height: 48px; border-radius: 50%; }

  /* System avatar (square with rounded corners) */
  .garden-avatar--system.garden-avatar--extraextrasmall,
  .garden-avatar--system.garden-avatar--extrasmall,
  .garden-avatar--system.garden-avatar--small {
    border-radius: 3px;
  }
  .garden-avatar--system.garden-avatar--medium {
    border-radius: var(--garden-border-radius-md, 4px);
  }
  .garden-avatar--system.garden-avatar--large {
    border-radius: 5px;
  }

  .garden-avatar--system .garden-avatar__content {
    border-radius: inherit;
  }

  /* Image */
  .garden-avatar__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Text (initials) */
  .garden-avatar__text {
    font-weight: 600;
    text-transform: uppercase;
    line-height: 1;
    user-select: none;
  }

  /* Icon */
  .garden-avatar__icon {
    width: 60%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .garden-avatar__icon svg,
  .garden-avatar__icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  /* Status indicator base - positioned absolutely */
  .garden-avatar__status {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    border-style: solid;
    box-sizing: content-box;
    transition: all 0.25s ease-in-out;
    line-height: 1;
    overflow: hidden;
    text-align: center;
  }

  /* Status icon - positioned to fill including border */
  .garden-avatar__status-icon {
    position: absolute;
    color: var(--garden-color-foreground-on-emphasis, #fff);
    animation: icon-fade-in 0.25s;
  }

  /* Status: Available - solid mint circle */
  .garden-avatar--status-available .garden-avatar__status {
    background-color: var(--garden-color-status-available, var(--garden-palette-mint-500, #00a656));
    border-color: var(--garden-color-status-available, var(--garden-palette-mint-500, #00a656));
    box-shadow: 0 0 0 2px var(--avatar-surface, var(--garden-color-background-default, #fff));
  }

  /* Status: Away - solid orange with clock icon */
  .garden-avatar--status-away .garden-avatar__status {
    background-color: var(--garden-color-status-away, var(--garden-palette-orange-500, #de701d));
    border-color: var(--garden-color-status-away, var(--garden-palette-orange-500, #de701d));
    box-shadow: 0 0 0 2px var(--avatar-surface, var(--garden-color-background-default, #fff));
  }

  /* Status: Transfers - solid azure with arrow icon */
  .garden-avatar--status-transfers .garden-avatar__status {
    background-color: var(--garden-color-status-transfers, var(--garden-palette-azure-500, #1f73b7));
    border-color: var(--garden-color-status-transfers, var(--garden-palette-azure-500, #1f73b7));
    box-shadow: 0 0 0 2px var(--avatar-surface, var(--garden-color-background-default, #fff));
  }

  /* Status: Offline - hollow with grey border */
  .garden-avatar--status-offline .garden-avatar__status {
    background-color: var(--avatar-surface, var(--garden-color-background-default, #fff));
    border-color: var(--garden-color-status-offline, var(--garden-palette-grey-500, #87929d));
    box-shadow: 0 0 0 2px var(--avatar-surface, var(--garden-color-background-default, #fff));
  }

  /* Status: Active - solid crimson with badge number */
  .garden-avatar--status-active .garden-avatar__status {
    background-color: var(--garden-color-status-active, var(--garden-palette-crimson-700, #cc3340));
    border-color: var(--garden-color-status-active, var(--garden-palette-crimson-700, #cc3340));
    box-shadow: 0 0 0 2px var(--avatar-surface, var(--garden-color-background-default, #fff));
    animation: badge-scale 0.375s ease-in-out;
  }

  /* Badge text (for active status) */
  .garden-avatar__badge-text {
    color: var(--garden-color-foreground-on-emphasis, #fff);
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    padding: 0 2px;
    max-width: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* RTL Support */
  .garden-avatar--rtl {
    direction: rtl;
  }

  /* Screen reader only */
  .sr-only {
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

  @keyframes icon-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes badge-scale {
    from { transform: scale(0.1); }
    to { transform: scale(1); }
  }
</style>
