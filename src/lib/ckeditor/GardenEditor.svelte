<!--
  @component
  GardenEditor - A CKEditor 5 integration styled with Zendesk Garden design system.
  
  Automatically detects dark mode from the ThemeProvider context and applies
  the appropriate styling. Works seamlessly with the theme selector.
  
  @example
  ```svelte
  <script>
    import { GardenEditor } from 'svelte-garden/ckeditor';
    
    let content = '<p>Hello, World!</p>';
    
    function handleChange(data) {
      content = data;
    }
  </script>
  
  <GardenEditor 
    value={content}
    onchange={handleChange}
    placeholder="Start typing..."
  />
  ```
-->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { GardenEditorProps, Editor } from './types.js';
  
  // Import Garden theme CSS
  import './garden-ckeditor.css';

  let {
    config = {},
    value = '',
    disabled = false,
    placeholder = '',
    minHeight = '200px',
    class: className = '',
    onchange,
    onready,
    onblur,
    onfocus,
    onerror
  }: GardenEditorProps = $props();

  let editorContainer: HTMLDivElement;
  let editorInstance: Editor | null = null;
  let isReady = $state(false);
  let observer: MutationObserver | null = null;

  // Sync dark mode to body for CKEditor balloon panels (rendered outside ThemeProvider)
  function syncDarkModeToBody() {
    if (typeof document === 'undefined') return;
    
    // Find the nearest ancestor with data-garden-color-scheme
    const themeRoot = editorContainer?.closest('[data-garden-color-scheme]');
    const colorScheme = themeRoot?.getAttribute('data-garden-color-scheme');
    
    if (colorScheme === 'dark') {
      document.body.setAttribute('data-garden-color-scheme', 'dark');
    } else {
      document.body.removeAttribute('data-garden-color-scheme');
    }
  }

  // Watch for theme changes
  function setupThemeObserver() {
    if (typeof document === 'undefined' || !editorContainer) return;
    
    const themeRoot = editorContainer.closest('[data-garden-color-scheme]');
    if (!themeRoot) return;
    
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-garden-color-scheme') {
          syncDarkModeToBody();
        }
      }
    });
    
    observer.observe(themeRoot, { attributes: true });
  }

  onMount(async () => {
    try {
      // Dynamically import CKEditor to avoid SSR issues
      const ckeditor5 = await import('ckeditor5');
      const { 
        ClassicEditor,
        Essentials,
        Bold,
        Italic,
        Underline,
        Heading,
        Paragraph,
        Link,
        List,
        BlockQuote,
        Indent,
        IndentBlock,
        HorizontalLine,
        Code,
        CodeBlock
      } = ckeditor5;

      // Import CKEditor CSS
      await import('ckeditor5/ckeditor5.css');

      // Plugins matching Zendesk Garden CKEditor
      const defaultPlugins = [
        Essentials,
        Bold,
        Italic,
        Underline,
        Code,
        Heading,
        Paragraph,
        Link,
        List,
        BlockQuote,
        Indent,
        IndentBlock,
        HorizontalLine,
        CodeBlock
      ];

      // Toolbar matching Zendesk Garden CKEditor exactly
      const defaultToolbar = {
        items: [
          'heading',
          '|',
          'bold', 'italic', 'underline', 'code',
          '|',
          'bulletedList', 'numberedList', 'outdent', 'indent',
          '|',
          'blockQuote', 'codeBlock', 'link', 'horizontalLine'
        ],
        shouldNotGroupWhenFull: false
      };

      // Build editor config - use user config if provided, otherwise defaults
      const editorConfig = {
        licenseKey: 'GPL' as const,
        plugins: config.plugins || defaultPlugins,
        toolbar: config.toolbar || defaultToolbar,
        codeBlock: config.codeBlock || {
          languages: [{ language: 'plaintext', label: 'Plain text' }],
          forceValue: true
        },
        indentBlock: config.indentBlock || {
          offset: 40,
          unit: 'px'
        },
        link: config.link || {
          defaultProtocol: 'https://'
        },
        placeholder: placeholder || 'Type your content here...',
        ...config
      };

      editorInstance = await ClassicEditor.create(editorContainer, editorConfig);

      // Set initial value
      if (value) {
        editorInstance.setData(value);
      }

      // Set disabled state
      if (disabled) {
        editorInstance.enableReadOnlyMode('garden-disabled');
      }

      // Set up event listeners
      editorInstance.model.document.on('change:data', () => {
        if (editorInstance && onchange) {
          onchange(editorInstance.getData());
        }
      });

      editorInstance.editing.view.document.on('focus', () => {
        if (editorInstance && onfocus) {
          onfocus(editorInstance);
        }
      });

      editorInstance.editing.view.document.on('blur', () => {
        if (editorInstance && onblur) {
          onblur(editorInstance);
        }
      });

      isReady = true;
      
      // Sync dark mode to body for balloon panels
      syncDarkModeToBody();
      setupThemeObserver();
      
      if (onready) {
        onready(editorInstance);
      }
    } catch (error) {
      console.error('Error initializing CKEditor:', error);
      if (onerror) {
        onerror(error as Error);
      }
    }
  });

  onDestroy(() => {
    if (editorInstance) {
      editorInstance.destroy().catch((err: Error) => console.error('Error destroying editor:', err));
    }
    if (observer) {
      observer.disconnect();
    }
    // Clean up body attribute if this was the last editor
    if (typeof document !== 'undefined') {
      document.body.removeAttribute('data-garden-color-scheme');
    }
  });

  // Watch for disabled changes
  $effect(() => {
    if (editorInstance && isReady) {
      if (disabled) {
        editorInstance.enableReadOnlyMode('garden-disabled');
      } else {
        editorInstance.disableReadOnlyMode('garden-disabled');
      }
    }
  });

  // Watch for value changes from outside
  $effect(() => {
    if (editorInstance && isReady && value !== undefined) {
      const currentData = editorInstance.getData();
      if (currentData !== value) {
        editorInstance.setData(value);
      }
    }
  });
</script>

<div 
  class="garden-ckeditor-wrapper {className}"
  class:garden-ckeditor--disabled={disabled}
  style:--garden-ckeditor-min-height={minHeight}
>
  <div bind:this={editorContainer}>
    {#if !isReady}
      <div class="garden-ckeditor-loading">
        <p>Loading editor...</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .garden-ckeditor-wrapper {
    width: 100%;
  }

  .garden-ckeditor-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: var(--garden-ckeditor-min-height, 200px);
    border: 1px solid var(--garden-border-color, #d8dcde);
    border-radius: 4px;
    background-color: var(--garden-background-color, #fff);
    color: var(--garden-foreground-subtle, #68737d);
  }

  .garden-ckeditor--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Override CKEditor min-height */
  :global(.garden-ckeditor-wrapper .ck-editor__editable_inline) {
    min-height: var(--garden-ckeditor-min-height, 200px);
  }
</style>
