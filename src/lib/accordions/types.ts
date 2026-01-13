/**
 * Svelte Garden - Accordions Types
 */

import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export interface AccordionProps extends HTMLAttributes<HTMLElement> {
  /** Whether multiple sections can be open */
  isExpandable?: boolean;
  /** Whether accordion has borders */
  isBordered?: boolean;
  /** Whether accordion is compact */
  isCompact?: boolean;
  /** Level for headings (1-6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Whether sections can be fully collapsed (default: true) */
  isCollapsible?: boolean;
}

export interface AccordionSectionProps extends HTMLAttributes<HTMLElement> {
  /** Whether section is expanded */
  isExpanded?: boolean;
  /** Callback when expanded state changes */
  onToggle?: (isExpanded: boolean) => void;
}

export interface AccordionHeaderProps extends HTMLButtonAttributes {
  /** Custom icon */
}

export interface AccordionPanelProps extends HTMLAttributes<HTMLElement> {
  /** Whether to animate open/close */
  isAnimated?: boolean;
}

export interface AccordionContextValue {
  isExpanded: boolean;
  toggle: () => void;
  level: number;
  sectionId: string;
}
