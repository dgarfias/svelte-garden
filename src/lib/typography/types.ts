/**
 * Svelte Garden - Typography Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (h1-h6) */
  level?: HeadingLevel;
  /** Visual size (independent of level) */
  size?: HeadingSize;
  /** Whether to truncate with ellipsis */
  isTruncated?: boolean;
  /** Whether to use bold weight */
  isBold?: boolean;
}

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Visual size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to use bold weight */
  isBold?: boolean;
  /** Whether to truncate with ellipsis */
  isTruncated?: boolean;
}

export interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
  /** Whether to use bold weight */
  isBold?: boolean;
  /** Whether to use italic style */
  isItalic?: boolean;
  /** Whether to use monospace font */
  isMono?: boolean;
  /** Whether to strike through */
  isStrike?: boolean;
}

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** Visual size */
  size?: 'small' | 'medium' | 'large';
  /** Hue color */
  hue?: string;
}

/** Supported languages for syntax highlighting (matches prism-react-renderer) */
export const CODEBLOCK_LANGUAGES = [
  'bash',
  'css',
  'diff',
  'graphql',
  'javascript',
  'json',
  'jsx',
  'markdown',
  'markup',
  'python',
  'typescript',
  'tsx',
  'yaml'
] as const;

export type CodeBlockLanguage = (typeof CODEBLOCK_LANGUAGES)[number];

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  /** Programming language for syntax highlighting */
  language?: CodeBlockLanguage;
  /** Visual size */
  size?: 'small' | 'medium' | 'large';
  /** Whether line numbers are shown */
  isNumbered?: boolean;
  /** Lines to highlight (1-indexed) */
  highlightLines?: number[];
}

export interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
  /** Visual size */
  size?: 'small' | 'medium' | 'large';
}

export interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /** Visual size */
  size?: 'small' | 'medium' | 'large';
  /** List type */
  type?: 'ordered' | 'unordered';
}
