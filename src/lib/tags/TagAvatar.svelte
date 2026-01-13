<!--
  Svelte Garden - Tag Avatar
  
  Avatar component sized for tags.
  
  @example
  <Tag>
    <TagAvatar src="/user.jpg" />
    John Doe
  </Tag>
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
    src?: string;
    alt?: string;
  }

  let {
    children,
    class: className = '',
    src,
    alt = '',
    ...restProps
  }: Props = $props();

  const avatarClasses = $derived([
    'garden-tag__avatar',
    className
  ].filter(Boolean).join(' '));
</script>

<span class={avatarClasses} data-garden-id="tags.avatar" {...restProps}>
  {#if src}
    <img {src} {alt} />
  {:else if children}
    {@render children()}
  {/if}
</span>

<style>
  .garden-tag__avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-left: -4px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #c2c8cc;
  }

  .garden-tag__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Size adjustments inherited from parent tag */
  :global(.garden-tag--small) .garden-tag__avatar {
    width: 14px;
    height: 14px;
    margin-left: -2px;
  }

  :global(.garden-tag--large) .garden-tag__avatar {
    width: 20px;
    height: 20px;
    margin-left: -6px;
  }
</style>
