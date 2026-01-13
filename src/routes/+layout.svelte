<script lang="ts">
  import { ThemeProvider } from '$lib/theming';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let colorScheme = $state<'light' | 'dark'>('light');

  function toggleTheme() {
    colorScheme = colorScheme === 'light' ? 'dark' : 'light';
  }
</script>

<ThemeProvider {colorScheme}>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-brand">
        <svg class="header-logo" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span class="header-title">Svelte Garden</span>
      </div>
      <button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle color scheme">
        {#if colorScheme === 'light'}
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
          </svg>
        {/if}
        <span>{colorScheme === 'light' ? 'Dark' : 'Light'}</span>
      </button>
    </header>
    <main class="app-main">
      {@render children()}
    </main>
  </div>
</ThemeProvider>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  :global(body) {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background-color: var(--garden-color-background-raised, #fff);
    border-bottom: 1px solid var(--garden-color-border-default, #d8dcde);
    box-shadow: 0 1px 3px var(--garden-color-shadow-small, rgba(0,0,0,0.08));
  }

  .header-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-logo {
    color: var(--garden-color-foreground-primary, #1f73b7);
  }

  .header-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--garden-color-foreground-default, #2f3941);
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    border: 1px solid var(--garden-color-border-default, #d8dcde);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .theme-toggle:hover {
    background-color: var(--garden-color-background-emphasis, #e9ebed);
    border-color: var(--garden-color-border-emphasis, #c2c8cc);
  }

  .theme-toggle svg {
    flex-shrink: 0;
  }

  .app-main {
    flex: 1;
    padding: 32px;
    background-color: var(--garden-color-background-default, #fff);
  }

  @media (max-width: 768px) {
    .app-header {
      padding: 12px 16px;
    }

    .app-main {
      padding: 16px;
    }

    .header-title {
      font-size: 16px;
    }

    .theme-toggle span {
      display: none;
    }

    .theme-toggle {
      padding: 8px;
    }
  }
</style>
