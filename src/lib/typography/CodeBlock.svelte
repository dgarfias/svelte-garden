<!--
  Svelte Garden - CodeBlock Component
  
  Code block with syntax highlighting powered by PrismJS.
  Automatically follows the Garden theme (light/dark mode).
  
  @example
  <CodeBlock language="typescript">
    {`function hello(): string {
      return 'world';
    }`}
  </CodeBlock>
  
  @example
  <CodeBlock language="jsx" isNumbered highlightLines={[2]}>
    {`function App() {
      return <div>Hello</div>;
    }`}
  </CodeBlock>
-->
<script lang="ts">
  import type { CodeBlockProps, CodeBlockLanguage } from './types';
  import type { Snippet } from 'svelte';
  import Prism from 'prismjs';
  import { CopyStroke, CheckLgStroke } from '../icons';
  
  // Import additional languages
  import 'prismjs/components/prism-typescript';
  import 'prismjs/components/prism-jsx';
  import 'prismjs/components/prism-tsx';
  import 'prismjs/components/prism-bash';
  import 'prismjs/components/prism-json';
  import 'prismjs/components/prism-yaml';
  import 'prismjs/components/prism-python';
  import 'prismjs/components/prism-graphql';
  import 'prismjs/components/prism-diff';
  import 'prismjs/components/prism-markdown';
  import 'prismjs/components/prism-css';

  interface Props extends CodeBlockProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    language = 'typescript',
    size = 'medium',
    isNumbered = false,
    highlightLines = [],
    ...restProps
  }: Props = $props();

  // Reference to extract code from children
  let codeElement: HTMLElement | null = $state(null);
  let codeContent = $state('');
  let copied = $state(false);
  
  // Token type from Prism
  type PrismToken = string | Prism.Token;
  
  // Extract code content after mount
  $effect(() => {
    if (codeElement) {
      codeContent = codeElement.textContent?.trim() || '';
    }
  });

  // Copy to clipboard
  async function copyCode() {
    if (!codeContent) return;
    try {
      await navigator.clipboard.writeText(codeContent);
      copied = true;
      setTimeout(() => { copied = false; }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  // Language display names
  const languageLabels: Record<CodeBlockLanguage, string> = {
    'bash': 'Bash',
    'css': 'CSS',
    'diff': 'Diff',
    'graphql': 'GraphQL',
    'javascript': 'JavaScript',
    'json': 'JSON',
    'jsx': 'JSX',
    'markdown': 'Markdown',
    'markup': 'HTML',
    'python': 'Python',
    'typescript': 'TypeScript',
    'tsx': 'TSX',
    'yaml': 'YAML'
  };

  // Map language to Prism grammar
  function getGrammar(lang: CodeBlockLanguage): Prism.Grammar | undefined {
    const grammarMap: Record<string, string> = {
      'markup': 'markup',
      'javascript': 'javascript',
      'typescript': 'typescript',
      'jsx': 'jsx',
      'tsx': 'tsx',
      'css': 'css',
      'json': 'json',
      'yaml': 'yaml',
      'bash': 'bash',
      'python': 'python',
      'graphql': 'graphql',
      'diff': 'diff',
      'markdown': 'markdown'
    };
    const key = grammarMap[lang] || lang;
    return Prism.languages[key];
  }

  // Tokenize the code
  const tokens = $derived.by(() => {
    if (!codeContent) return [];
    const grammar = getGrammar(language);
    if (!grammar) return [codeContent];
    return Prism.tokenize(codeContent, grammar);
  });

  // Split tokens into lines
  const lines = $derived.by(() => {
    const result: PrismToken[][] = [[]];
    
    function processToken(token: PrismToken) {
      if (typeof token === 'string') {
        const parts = token.split('\n');
        parts.forEach((part, i) => {
          if (i > 0) result.push([]);
          if (part) result[result.length - 1].push(part);
        });
      } else if (token.content) {
        if (Array.isArray(token.content)) {
          const nestedLines: PrismToken[][] = [[]];
          token.content.forEach((t: PrismToken) => {
            if (typeof t === 'string') {
              const parts = t.split('\n');
              parts.forEach((part, i) => {
                if (i > 0) nestedLines.push([]);
                if (part) nestedLines[nestedLines.length - 1].push(part);
              });
            } else {
              nestedLines[nestedLines.length - 1].push(t);
            }
          });
          nestedLines.forEach((lineTokens, i) => {
            if (i > 0) result.push([]);
            if (lineTokens.length > 0) {
              result[result.length - 1].push(new Prism.Token(token.type, lineTokens, token.alias));
            }
          });
        } else if (typeof token.content === 'string') {
          const parts = token.content.split('\n');
          parts.forEach((part, i) => {
            if (i > 0) result.push([]);
            if (part) {
              result[result.length - 1].push(new Prism.Token(token.type, part, token.alias));
            }
          });
        }
      }
    }

    tokens.forEach(processToken);
    return result;
  });

  // Get CSS classes for a token
  function getTokenClasses(token: PrismToken): string {
    if (typeof token === 'string') return '';
    const types = [token.type];
    if (token.alias) {
      if (Array.isArray(token.alias)) {
        types.push(...token.alias);
      } else {
        types.push(token.alias);
      }
    }
    return types.map(t => `token ${t}`).join(' ');
  }

  // Get token content
  function getTokenContent(token: PrismToken): string {
    if (typeof token === 'string') return token;
    if (typeof token.content === 'string') return token.content;
    if (Array.isArray(token.content)) {
      return token.content.map(t => getTokenContent(t)).join('');
    }
    return '';
  }

  const codeBlockClasses = $derived([
    'garden-codeblock',
    `garden-codeblock--${size}`,
    isNumbered && 'garden-codeblock--numbered',
    className
  ].filter(Boolean).join(' '));
</script>

<!-- Hidden element to extract code from children -->
{#if !codeContent}
  <code bind:this={codeElement} style="display: none;">{#if children}{@render children()}{/if}</code>
{/if}

<div class="garden-codeblock-container">
  <!-- Header with language badge and copy button -->
  <div class="garden-codeblock__header">
    <span class="garden-codeblock__language">{languageLabels[language] || language}</span>
    <button 
      type="button" 
      class="garden-codeblock__copy" 
      onclick={copyCode}
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      {#if copied}
        <CheckLgStroke size={14} />
        <span>Copied</span>
      {:else}
        <CopyStroke size={14} />
        <span>Copy</span>
      {/if}
    </button>
  </div>
  
  <pre class={codeBlockClasses} data-garden-id="typography.codeblock" {...restProps}><code>{#each lines as line, lineIndex}{@const lineNum = lineIndex + 1}<span class="line" class:line--highlighted={highlightLines.includes(lineNum)} data-line={lineNum}><span class="line-content">{#each line as token}{#if typeof token === 'string'}{token}{:else}<span class={getTokenClasses(token)}>{getTokenContent(token)}</span>{/if}{/each}{line.length === 0 ? ' ' : ''}</span></span>{/each}</code></pre>
</div>

<style>
  .garden-codeblock-container {
    position: relative;
    border-radius: 4px;
    /* Dark theme (default) */
    background-color: #24292e;
  }

  /* Light theme via Garden ThemeProvider */
  :global(.garden-theme-light) .garden-codeblock-container,
  :global([data-garden-color-scheme="light"]) .garden-codeblock-container {
    background-color: #f6f8fa;
    border: 1px solid var(--garden-color-border-subtle, #e1e4e8);
  }

  /* Header */
  .garden-codeblock__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    background-color: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  :global(.garden-theme-light) .garden-codeblock__header,
  :global([data-garden-color-scheme="light"]) .garden-codeblock__header {
    background-color: rgba(0, 0, 0, 0.02);
    border-bottom-color: rgba(0, 0, 0, 0.06);
  }

  .garden-codeblock__language {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 11px;
    font-weight: 400;
    color: #6a737d;
  }

  :global(.garden-theme-light) .garden-codeblock__language,
  :global([data-garden-color-scheme="light"]) .garden-codeblock__language {
    color: #6a737d;
  }

  .garden-codeblock__copy {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 24px;
    padding: 0 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    background: transparent;
    color: #8b949e;
    font-family: inherit;
    font-size: 11px;
    cursor: pointer;
    transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }

  .garden-codeblock__copy:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    color: #c9d1d9;
  }

  .garden-codeblock__copy:active {
    background-color: rgba(255, 255, 255, 0.08);
  }

  :global(.garden-theme-light) .garden-codeblock__copy,
  :global([data-garden-color-scheme="light"]) .garden-codeblock__copy {
    border-color: rgba(0, 0, 0, 0.12);
    color: #57606a;
  }

  :global(.garden-theme-light) .garden-codeblock__copy:hover,
  :global([data-garden-color-scheme="light"]) .garden-codeblock__copy:hover {
    border-color: rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.04);
    color: #24292e;
  }

  :global(.garden-theme-light) .garden-codeblock__copy:active,
  :global([data-garden-color-scheme="light"]) .garden-codeblock__copy:active {
    background-color: rgba(0, 0, 0, 0.08);
  }

  .garden-codeblock__copy svg {
    width: 12px;
    height: 12px;
  }

  /* Code block */
  .garden-codeblock {
    margin: 0;
    padding: 12px 16px;
    border-radius: 0 0 4px 4px;
    background-color: transparent;
    color: #e1e4e8;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 13px;
    line-height: 1.45;
    overflow-x: auto;
    tab-size: 2;
  }

  :global(.garden-theme-light) .garden-codeblock,
  :global([data-garden-color-scheme="light"]) .garden-codeblock {
    color: #24292e;
  }

  .garden-codeblock code {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    background: none;
    padding: 0;
    color: inherit;
  }

  /* Size variants */
  .garden-codeblock--small {
    font-size: 11px;
    padding: 10px 12px;
  }

  .garden-codeblock--large {
    font-size: 14px;
    padding: 16px 20px;
  }

  /* Line styles */
  .garden-codeblock .line {
    display: block;
  }

  .garden-codeblock .line-content {
    white-space: pre;
  }

  /* Numbered lines - must use flex to align line numbers */
  .garden-codeblock--numbered .line {
    display: flex;
  }

  .garden-codeblock--numbered .line-content {
    flex: 1;
    min-width: 0;
  }

  .garden-codeblock--numbered .line::before {
    content: attr(data-line);
    display: inline-block;
    width: 2em;
    margin-right: 1.5em;
    text-align: right;
    color: #6a737d;
    user-select: none;
    flex-shrink: 0;
  }

  /* Highlighted line - use negative margin + padding trick without width */
  .garden-codeblock .line--highlighted {
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* Highlighted + numbered needs padding adjustment for line number */
  .garden-codeblock--numbered .line--highlighted {
    padding-left: 16px;
  }

  :global(.garden-theme-light) .garden-codeblock .line--highlighted,
  :global([data-garden-color-scheme="light"]) .garden-codeblock .line--highlighted {
    background-color: rgba(255, 220, 0, 0.2);
  }

  /* ============================================
   * Token colors - Dark theme (default)
   * ============================================ */

  .garden-codeblock :global(.token.comment),
  .garden-codeblock :global(.token.prolog),
  .garden-codeblock :global(.token.doctype),
  .garden-codeblock :global(.token.cdata) {
    color: #8b949e;
  }

  .garden-codeblock :global(.token.punctuation) {
    color: #e1e4e8;
  }

  .garden-codeblock :global(.token.string),
  .garden-codeblock :global(.token.attr-value),
  .garden-codeblock :global(.token.char) {
    color: #a5d6ff;
  }

  .garden-codeblock :global(.token.keyword) {
    color: #ff7b72;
  }

  .garden-codeblock :global(.token.function),
  .garden-codeblock :global(.token.class-name) {
    color: #d2a8ff;
  }

  .garden-codeblock :global(.token.number),
  .garden-codeblock :global(.token.boolean),
  .garden-codeblock :global(.token.constant) {
    color: #79c0ff;
  }

  .garden-codeblock :global(.token.property),
  .garden-codeblock :global(.token.variable),
  .garden-codeblock :global(.token.attr-name) {
    color: #79c0ff;
  }

  .garden-codeblock :global(.token.tag) {
    color: #7ee787;
  }

  .garden-codeblock :global(.token.operator),
  .garden-codeblock :global(.token.entity),
  .garden-codeblock :global(.token.url) {
    color: #e1e4e8;
  }

  .garden-codeblock :global(.token.selector),
  .garden-codeblock :global(.token.regex) {
    color: #a5d6ff;
  }

  .garden-codeblock :global(.token.builtin) {
    color: #ffa657;
  }

  .garden-codeblock :global(.token.inserted) {
    color: #7ee787;
    background-color: rgba(46, 160, 67, 0.15);
  }

  .garden-codeblock :global(.token.deleted) {
    color: #ffa198;
    background-color: rgba(248, 81, 73, 0.15);
  }

  .garden-codeblock :global(.token.important),
  .garden-codeblock :global(.token.bold) {
    font-weight: bold;
  }

  .garden-codeblock :global(.token.italic) {
    font-style: italic;
  }

  /* ============================================
   * Token colors - Light theme
   * ============================================ */

  :global(.garden-theme-light) .garden-codeblock :global(.token.comment),
  :global(.garden-theme-light) .garden-codeblock :global(.token.prolog),
  :global(.garden-theme-light) .garden-codeblock :global(.token.doctype),
  :global(.garden-theme-light) .garden-codeblock :global(.token.cdata),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.comment),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.prolog),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.doctype),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.cdata) {
    color: #6e7781;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.punctuation),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.punctuation) {
    color: #24292e;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.string),
  :global(.garden-theme-light) .garden-codeblock :global(.token.attr-value),
  :global(.garden-theme-light) .garden-codeblock :global(.token.char),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.string),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.attr-value),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.char) {
    color: #0a3069;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.keyword),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.keyword) {
    color: #cf222e;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.function),
  :global(.garden-theme-light) .garden-codeblock :global(.token.class-name),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.function),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.class-name) {
    color: #8250df;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.number),
  :global(.garden-theme-light) .garden-codeblock :global(.token.boolean),
  :global(.garden-theme-light) .garden-codeblock :global(.token.constant),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.number),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.boolean),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.constant) {
    color: #0550ae;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.property),
  :global(.garden-theme-light) .garden-codeblock :global(.token.variable),
  :global(.garden-theme-light) .garden-codeblock :global(.token.attr-name),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.property),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.variable),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.attr-name) {
    color: #0550ae;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.tag),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.tag) {
    color: #116329;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.operator),
  :global(.garden-theme-light) .garden-codeblock :global(.token.entity),
  :global(.garden-theme-light) .garden-codeblock :global(.token.url),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.operator),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.entity),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.url) {
    color: #24292e;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.selector),
  :global(.garden-theme-light) .garden-codeblock :global(.token.regex),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.selector),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.regex) {
    color: #0a3069;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.builtin),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.builtin) {
    color: #953800;
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.inserted),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.inserted) {
    color: #116329;
    background-color: rgba(46, 160, 67, 0.15);
  }

  :global(.garden-theme-light) .garden-codeblock :global(.token.deleted),
  :global([data-garden-color-scheme="light"]) .garden-codeblock :global(.token.deleted) {
    color: #cf222e;
    background-color: rgba(255, 129, 130, 0.15);
  }
</style>
