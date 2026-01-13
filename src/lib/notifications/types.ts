/**
 * Svelte Garden - Notifications Types
 */

import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export type ToastPlacement = 
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end';

export interface AlertProps extends HTMLAttributes<HTMLElement> {
  /** Alert type determines color/icon */
  type?: AlertType;
  /** Alert title */
  title?: string;
  /** Whether alert can be dismissed */
  isDismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

export interface NotificationProps extends HTMLAttributes<HTMLElement> {
  /** Notification type */
  type?: AlertType;
  /** Notification title */
  title?: string;
  /** Whether notification can be dismissed */
  isDismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

export interface ToastProps extends HTMLAttributes<HTMLElement> {
  /** Toast type */
  type?: AlertType;
  /** Toast title */
  title?: string;
  /** Whether toast can be dismissed */
  isDismissible?: boolean;
  /** Auto-hide duration in ms (0 = no auto-hide) */
  duration?: number;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

export interface ToastCloseProps extends HTMLButtonAttributes {
  'aria-label'?: string;
}

export interface ToastItem {
  id: string;
  type?: AlertType;
  title?: string;
  content: string;
  duration?: number;
  isDismissible?: boolean;
}

export interface ToastContainerProps extends HTMLAttributes<HTMLElement> {
  /** Position of toast container */
  placement?: ToastPlacement;
  /** Maximum number of visible toasts */
  limit?: number;
}

export interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
  updateToast: (id: string, toast: Partial<Omit<ToastItem, 'id'>>) => void;
}
