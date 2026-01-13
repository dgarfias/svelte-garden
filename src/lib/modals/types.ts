/**
 * Svelte Garden - Modals Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  isOpen?: boolean;
  /** Callback when modal requests to be closed */
  onClose?: () => void;
  /** Whether to center the modal vertically */
  isCentered?: boolean;
  /** Use large modal size (768px vs 576px) */
  isLarge?: boolean;
  /** Whether modal animations are enabled */
  isAnimated?: boolean;
  /** Focus the modal on mount */
  focusOnMount?: boolean;
  /** Restore focus to trigger on close */
  restoreFocus?: boolean;
  /** Custom aria-label when no header */
  'aria-label'?: string;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Applies danger styling (red text, icon) */
  isDanger?: boolean;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalCloseProps extends HTMLAttributes<HTMLButtonElement> {
  /** Accessible label for the close button */
  'aria-label'?: string;
}

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is open */
  isOpen?: boolean;
  /** Callback when drawer requests to be closed */
  onClose?: () => void;
  /** Focus the drawer on mount */
  focusOnMount?: boolean;
  /** Restore focus to trigger on close */
  restoreFocus?: boolean;
}

export interface ModalContextValue {
  onClose?: () => void;
  titleId?: string;
}
