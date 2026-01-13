/**
 * Svelte Garden - Button Types
 */

import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

export const BUTTON_SIZES = ['small', 'medium', 'large'] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonProps extends Omit<HTMLButtonAttributes, 'size'> {
  /** Applies danger styling */
  isDanger?: boolean;
  /** Specifies the button size */
  size?: ButtonSize;
  /** Stretches the button fill to its container width */
  isStretched?: boolean;
  /** Applies neutral button styling */
  isNeutral?: boolean;
  /** Applies primary button styling */
  isPrimary?: boolean;
  /** Applies basic button styling */
  isBasic?: boolean;
  /** Applies link (anchor) button styling */
  isLink?: boolean;
  /** Applies pill button styling */
  isPill?: boolean;
  /** Applies inset box-shadow styling on focus */
  focusInset?: boolean;
}

export interface ToggleButtonProps extends ButtonProps {
  /**
   * Determines if the button is pressed. Use "mixed" to indicate that
   * the toggle controls other elements which do not share the same value.
   */
  isPressed?: boolean | 'mixed';
}

export interface IconButtonProps extends Omit<ButtonProps, 'isStretched' | 'isLink'> {
  /** Rotates icon 180 degrees */
  isRotated?: boolean;
}

export interface ToggleIconButtonProps extends IconButtonProps {
  isPressed?: boolean | 'mixed';
}

export interface AnchorProps extends HTMLAnchorAttributes {
  /** Applies danger styling */
  isDanger?: boolean;
  /**
   * Attaches target="_blank" and rel="noopener noreferrer" to an anchor that
   * navigates to an external resource.
   */
  isExternal?: boolean;
  /** Custom label for the external link icon (accessibility) */
  externalIconLabel?: string;
  /** Determines if the anchor has underline styling */
  isUnderlined?: boolean;
}
