<script lang="ts">
  import { ThemeProvider } from '$lib/theming';
  import { Button } from '$lib/buttons';
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
  <div class="app">
    <header class="header">
      <span class="title">Svelte Garden</span>
      <div class="header-actions">
        <Button 
          isBasic 
          size="small"
          onclick={toggleTheme}
        >
          {colorScheme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
        <Button 
          isBasic
          size="small"
          onclick={() => window.open('https://github.com/dgarfias/svelte-garden', '_blank')}
        >
          GitHub
        </Button>
      </div>
    </header>
    <main class="main">
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

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    padding: 0 16px;
    border-bottom: 1px solid var(--garden-color-border-default, #d8dcde);
    background-color: var(--garden-color-background-default, #fff);
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--garden-color-foreground-default, #2f3941);
  }

  .header-actions {
    display: flex;
    gap: 8px;
  }

  .main {
    flex: 1;
    padding: 32px;
    background-color: var(--garden-color-background-default, #fff);
  }

  @media (max-width: 768px) {
    .main {
      padding: 16px;
    }
  }
</style>
