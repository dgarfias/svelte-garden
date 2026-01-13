/**
 * Svelte Garden - Tooltips Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export type TooltipPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type TooltipSize = 'small' | 'medium' | 'large' | 'extra-large';

export type TooltipType = 'light' | 'dark';

export interface TooltipProps extends HTMLAttributes<HTMLElement> {
  /** Tooltip content text */
  content: string;
  /** Placement of tooltip */
  placement?: TooltipPlacement;
  /** Size of tooltip */
  size?: TooltipSize;
  /** Type (light or dark) */
  type?: TooltipType;
  /** Delay before showing (ms) */
  delayShow?: number;
  /** Delay before hiding (ms) */
  delayHide?: number;
  /** Whether tooltip has arrow */
  hasArrow?: boolean;
  /** Whether tooltip is always visible */
  isVisible?: boolean;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  /** Element that triggers tooltip */
}
