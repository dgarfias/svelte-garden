/**
 * Svelte Garden - Toast Store
 * 
 * A reactive store for managing toast notifications.
 * 
 * @example
 * import { toastStore } from '$lib/notifications';
 * 
 * // Add a toast
 * const id = toastStore.addToast({ content: 'Hello!', type: 'success' });
 * 
 * // Remove a toast
 * toastStore.removeToast(id);
 */

import { writable, get } from 'svelte/store';
import type { ToastItem, ToastStore } from './types';

function createToastStore(): ToastStore & { subscribe: typeof store.subscribe } {
  const store = writable<ToastItem[]>([]);

  function generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function addToast(toast: Omit<ToastItem, 'id'>): string {
    const id = generateId();
    const newToast: ToastItem = {
      id,
      duration: 5000,
      isDismissible: true,
      ...toast
    };

    store.update(toasts => [...toasts, newToast]);
    return id;
  }

  function removeToast(id: string): void {
    store.update(toasts => toasts.filter(t => t.id !== id));
  }

  function removeAllToasts(): void {
    store.set([]);
  }

  function updateToast(id: string, updates: Partial<Omit<ToastItem, 'id'>>): void {
    store.update(toasts => 
      toasts.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  }

  return {
    subscribe: store.subscribe,
    get toasts() {
      return get(store);
    },
    addToast,
    removeToast,
    removeAllToasts,
    updateToast
  };
}

export const toastStore = createToastStore();
