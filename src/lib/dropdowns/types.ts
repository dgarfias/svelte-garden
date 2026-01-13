/**
 * Svelte Garden - Dropdowns Types
 */

import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type MenuPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
  | 'auto';

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the menu is expanded */
  isExpanded?: boolean;
  /** Placement of the menu relative to trigger */
  placement?: MenuPlacement;
  /** Callback when menu should close */
  onClose?: () => void;
  /** Whether to show an arrow */
  hasArrow?: boolean;
  /** Max height of menu */
  maxHeight?: string;
}

export interface MenuTriggerProps extends HTMLButtonAttributes {
  /** Reference to the button element for positioning */
}

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Value for the menu item */
  value?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Type of menu item */
  type?: 'default' | 'danger' | 'add' | 'next' | 'previous' | 'header';
  /** Whether the item is selected/active */
  isSelected?: boolean;
  /** Callback when item is selected */
  onSelect?: (value: string) => void;
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLLIElement> {}

export interface MenuGroupProps extends HTMLAttributes<HTMLUListElement> {
  /** Label for the group */
  label?: string;
  /** Type of group for checkbox/radio behavior */
  type?: 'checkbox' | 'radio';
}

export interface MenuContextValue {
  onClose?: () => void;
  onSelect?: (value: string) => void;
  focusedValue?: string;
  selectedValues?: string[];
}

export interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the listbox is expanded */
  isExpanded?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Whether multiple selection is allowed */
  isMultiselectable?: boolean;
  /** Whether the combobox is editable (autocomplete) */
  isEditable?: boolean;
  /** Whether to show autocomplete */
  isAutocomplete?: boolean;
  /** Validation state */
  validation?: 'success' | 'warning' | 'error';
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Compact size */
  isCompact?: boolean;
}

export interface OptionProps extends HTMLAttributes<HTMLLIElement> {
  /** Value for the option */
  value: string;
  /** Display label (if different from children) */
  label?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Whether the option is selected */
  isSelected?: boolean;
  /** Type of option for special rendering */
  type?: 'default' | 'add' | 'danger' | 'header' | 'next' | 'previous';
}
