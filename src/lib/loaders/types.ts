/**
 * Svelte Garden - Loaders Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export type LoaderSize = 'small' | 'medium' | 'large';

export interface SpinnerProps extends HTMLAttributes<SVGElement> {
  /** Spinner size */
  size?: LoaderSize | number;
  /** Custom color */
  color?: string;
  /** Duration of animation in ms */
  duration?: number;
  /** Accessible label */
  'aria-label'?: string;
}

export interface DotsProps extends HTMLAttributes<HTMLElement> {
  /** Dots size */
  size?: LoaderSize | number;
  /** Custom color */
  color?: string;
  /** Duration of animation in ms */
  duration?: number;
  /** Delay before showing in ms */
  delayMS?: number;
}

export interface SkeletonProps extends HTMLAttributes<HTMLElement> {
  /** Width of skeleton */
  width?: string | number;
  /** Height of skeleton */
  height?: string | number;
  /** Whether skeleton is circular */
  isRound?: boolean;
  /** Custom animation duration */
  duration?: number;
}

export interface ProgressProps extends HTMLAttributes<HTMLElement> {
  /** Current value (0-100) */
  value?: number;
  /** Size of progress bar */
  size?: LoaderSize;
  /** Custom color */
  color?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export interface InlineProps extends HTMLAttributes<HTMLElement> {
  /** Size of inline loader */
  size?: LoaderSize | number;
  /** Custom color */
  color?: string;
}
