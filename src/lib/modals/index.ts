/**
 * Svelte Garden - Modals Module
 */

// Components
export { default as Modal } from './Modal.svelte';
export { default as ModalHeader } from './ModalHeader.svelte';
export { default as ModalBody } from './ModalBody.svelte';
export { default as ModalFooter } from './ModalFooter.svelte';
export { default as ModalClose } from './ModalClose.svelte';
export { default as FooterItem } from './FooterItem.svelte';

// Context
export { setModalContext, getModalContext } from './context';

// Types
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseProps,
  DrawerProps,
  ModalContextValue
} from './types';
