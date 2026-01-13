/**
 * Svelte Garden - Tag Types
 */

import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type TagSize = 'small' | 'medium' | 'large';

export interface TagProps extends HTMLAttributes<HTMLElement> {
  /** Tag size */
  size?: TagSize;
  /** Visual hue color */
  hue?: string;
  /** Whether tag is pill shaped */
  isPill?: boolean;
  /** Whether tag is rounded */
  isRound?: boolean;
  /** Whether tag shows regular weight text */
  isRegular?: boolean;
}

export interface TagCloseProps extends HTMLButtonAttributes {
  /** Label for accessibility */
  'aria-label'?: string;
}
