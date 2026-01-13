/**
 * Svelte Garden - Typography Module
 */

export { default as Heading } from './Heading.svelte';
export { default as Paragraph } from './Paragraph.svelte';
export { default as Span } from './Span.svelte';
export { default as Code } from './Code.svelte';
export { default as CodeBlock } from './CodeBlock.svelte';
export { default as Blockquote } from './Blockquote.svelte';
export { default as OrderedList } from './OrderedList.svelte';
export { default as UnorderedList } from './UnorderedList.svelte';

export type {
  HeadingProps,
  HeadingLevel,
  HeadingSize,
  ParagraphProps,
  SpanProps,
  CodeProps,
  CodeBlockProps,
  CodeBlockLanguage,
  BlockquoteProps,
  ListProps
} from './types';

export { CODEBLOCK_LANGUAGES } from './types';
