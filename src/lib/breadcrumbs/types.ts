/**
 * Svelte Garden - Breadcrumbs Types
 */

import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label */
  'aria-label'?: string;
}

export interface BreadcrumbItemProps extends HTMLAnchorAttributes {
  /** Whether this is the current page */
  isCurrent?: boolean;
}
