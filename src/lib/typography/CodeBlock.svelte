<!--
  Svelte Garden - CodeBlock Component
  
  Code block for multi-line code with dark/light theme support.
  Note: For syntax highlighting, consider using a library like prismjs or shiki.
  
  @example
  <CodeBlock>
    function hello() {
      return 'world';
    }
  </CodeBlock>
  
  @example
  <CodeBlock isLight isNumbered>
    const x = 1;
    const y = 2;
  </CodeBlock>
-->
<script lang="ts">
  import type { CodeBlockProps } from './types';
  import type { Snippet } from 'svelte';

  interface Props extends CodeBlockProps {
    children?: Snippet;
  }

  let {
    children,
    class: className = '',
    size = 'medium',
    isNumbered = false,
    highlightLines = [],
    isLight = false,
    ...restProps
  }: Props = $props();

  const codeBlockClasses = $derived([
    'garden-codeblock',
    `garden-codeblock--${size}`,
    isLight && 'garden-codeblock--light',
    isNumbered && 'garden-codeblock--numbered',
    className
  ].filter(Boolean).join(' '));
</script>

<div class="garden-codeblock-container">
  <pre class={codeBlockClasses} data-garden-id="typography.codeblock" {...restProps}><code>{#if children}{@render children()}{/if}</code></pre>
</div>

<style>
  .garden-codeblock-container {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  .garden-codeblock {
    margin: 0;
    padding: 16px;
    border-radius: 8px;
    background-color: #1a1a2e;
    color: #e4e4e7;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    overflow-x: auto;
    white-space: pre;
    tab-size: 2;
  }

  /* Light theme variant */
  .garden-codeblock--light {
    background-color: var(--garden-color-background-subtle, #f8f9f9);
    color: var(--garden-color-foreground-default, #2f3941);
    border: 1px solid var(--garden-color-border-subtle, #e8eaec);
  }

  .garden-codeblock code {
    font-family: inherit;
    font-size: inherit;
    background: none;
    padding: 0;
    color: inherit;
    display: block;
  }

  /* Size variants */
  .garden-codeblock--small {
    font-size: 11px;
    line-height: 16px;
    padding: 12px;
  }

  .garden-codeblock--medium {
    font-size: 13px;
    line-height: 20px;
  }

  .garden-codeblock--large {
    font-size: 15px;
    line-height: 24px;
    padding: 20px;
  }

  /* Numbered lines */
  .garden-codeblock--numbered {
    padding-left: 0;
  }

  .garden-codeblock--numbered code {
    display: table;
    width: 100%;
    counter-reset: linenumber;
  }

  /* Style for line-by-line content when using :global for external rendering */
  .garden-codeblock :global(.line) {
    display: table-row;
  }

  .garden-codeblock--numbered :global(.line)::before {
    content: counter(linenumber);
    counter-increment: linenumber;
    display: table-cell;
    padding-right: 24px;
    padding-left: 16px;
    width: 1px;
    text-align: right;
    color: #6b7280;
    user-select: none;
  }

  .garden-codeblock--numbered.garden-codeblock--light :global(.line)::before {
    color: var(--garden-color-foreground-subtle, #68737d);
  }

  /* Highlighted line */
  .garden-codeblock :global(.line--highlighted) {
    background-color: rgba(255, 255, 255, 0.08);
    margin: 0 -16px;
    padding: 0 16px;
  }

  .garden-codeblock--light :global(.line--highlighted) {
    background-color: rgba(31, 115, 183, 0.08);
  }

  /* Basic token colors for manual syntax highlighting */
  .garden-codeblock :global(.token.comment),
  .garden-codeblock :global(.token.prolog),
  .garden-codeblock :global(.token.doctype),
  .garden-codeblock :global(.token.cdata) {
    color: #6b7280;
  }

  .garden-codeblock :global(.token.punctuation) {
    color: #9ca3af;
  }

  .garden-codeblock :global(.token.property),
  .garden-codeblock :global(.token.tag),
  .garden-codeblock :global(.token.boolean),
  .garden-codeblock :global(.token.number),
  .garden-codeblock :global(.token.constant),
  .garden-codeblock :global(.token.symbol),
  .garden-codeblock :global(.token.deleted) {
    color: #f472b6;
  }

  .garden-codeblock :global(.token.selector),
  .garden-codeblock :global(.token.attr-name),
  .garden-codeblock :global(.token.string),
  .garden-codeblock :global(.token.char),
  .garden-codeblock :global(.token.builtin),
  .garden-codeblock :global(.token.inserted) {
    color: #a7f3d0;
  }

  .garden-codeblock :global(.token.operator),
  .garden-codeblock :global(.token.entity),
  .garden-codeblock :global(.token.url),
  .garden-codeblock :global(.token.variable) {
    color: #fbbf24;
  }

  .garden-codeblock :global(.token.atrule),
  .garden-codeblock :global(.token.attr-value),
  .garden-codeblock :global(.token.function),
  .garden-codeblock :global(.token.class-name) {
    color: #93c5fd;
  }

  .garden-codeblock :global(.token.keyword) {
    color: #c4b5fd;
  }

  .garden-codeblock :global(.token.regex),
  .garden-codeblock :global(.token.important) {
    color: #fde68a;
  }

  /* Light theme token colors */
  .garden-codeblock--light :global(.token.comment),
  .garden-codeblock--light :global(.token.prolog),
  .garden-codeblock--light :global(.token.doctype),
  .garden-codeblock--light :global(.token.cdata) {
    color: #6b7280;
  }

  .garden-codeblock--light :global(.token.punctuation) {
    color: #374151;
  }

  .garden-codeblock--light :global(.token.property),
  .garden-codeblock--light :global(.token.tag),
  .garden-codeblock--light :global(.token.boolean),
  .garden-codeblock--light :global(.token.number),
  .garden-codeblock--light :global(.token.constant),
  .garden-codeblock--light :global(.token.symbol),
  .garden-codeblock--light :global(.token.deleted) {
    color: #be185d;
  }

  .garden-codeblock--light :global(.token.selector),
  .garden-codeblock--light :global(.token.attr-name),
  .garden-codeblock--light :global(.token.string),
  .garden-codeblock--light :global(.token.char),
  .garden-codeblock--light :global(.token.builtin),
  .garden-codeblock--light :global(.token.inserted) {
    color: #047857;
  }

  .garden-codeblock--light :global(.token.operator),
  .garden-codeblock--light :global(.token.entity),
  .garden-codeblock--light :global(.token.url),
  .garden-codeblock--light :global(.token.variable) {
    color: #b45309;
  }

  .garden-codeblock--light :global(.token.atrule),
  .garden-codeblock--light :global(.token.attr-value),
  .garden-codeblock--light :global(.token.function),
  .garden-codeblock--light :global(.token.class-name) {
    color: #1d4ed8;
  }

  .garden-codeblock--light :global(.token.keyword) {
    color: #7c3aed;
  }

  .garden-codeblock--light :global(.token.regex),
  .garden-codeblock--light :global(.token.important) {
    color: #d97706;
  }
</style>
