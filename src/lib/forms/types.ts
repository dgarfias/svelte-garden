/**
 * Svelte Garden - Forms Types
 */

import type { HTMLInputAttributes, HTMLTextareaAttributes, HTMLSelectAttributes } from 'svelte/elements';

export type ValidationState = 'success' | 'warning' | 'error';
export type InputSize = 'small' | 'medium' | 'large';

export interface FieldContextValue {
  fieldId: string;
  labelId: string;
  hintId: string;
  messageId: string;
  hasHint: boolean;
  hasMessage: boolean;
  validation?: ValidationState;
  isCompact: boolean;
}

export interface FieldProps {
  /** Unique identifier for the field */
  id?: string;
  /** Whether to use compact spacing */
  isCompact?: boolean;
  class?: string;
}

export interface LabelProps {
  /** Whether the field is required */
  isRequired?: boolean;
  /** Use regular font weight instead of semibold */
  isRegular?: boolean;
  /** Hide the label visually but keep it accessible */
  hidden?: boolean;
  class?: string;
}

export interface HintProps {
  class?: string;
}

export interface MessageProps {
  /** Validation state determines the icon and color */
  validation?: ValidationState;
  /** Custom validation label for screen readers */
  validationLabel?: string;
  class?: string;
}

export interface InputProps extends Omit<HTMLInputAttributes, 'size'> {
  /** Validation state */
  validation?: ValidationState;
  /** Makes the input smaller */
  isCompact?: boolean;
  /** Removes the border and background */
  isBare?: boolean;
  /** Applies focus styling inset */
  focusInset?: boolean;
}

export interface TextareaProps extends HTMLTextareaAttributes {
  /** Validation state */
  validation?: ValidationState;
  /** Makes the textarea smaller */
  isCompact?: boolean;
  /** Allows manual resizing */
  isResizable?: boolean;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows */
  maxRows?: number;
}

export interface CheckboxProps extends Omit<HTMLInputAttributes, 'type'> {
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Validation state */
  validation?: ValidationState;
  /** Compact spacing */
  isCompact?: boolean;
}

export interface RadioProps extends Omit<HTMLInputAttributes, 'type'> {
  /** Validation state */
  validation?: ValidationState;
  /** Compact spacing */
  isCompact?: boolean;
}

export interface ToggleProps extends Omit<HTMLInputAttributes, 'type'> {
  /** Validation state */
  validation?: ValidationState;
  /** Compact spacing */
  isCompact?: boolean;
}

export interface SelectProps extends Omit<HTMLSelectAttributes, 'size'> {
  /** Validation state */
  validation?: ValidationState;
  /** Makes the select smaller */
  isCompact?: boolean;
  /** Removes the border and background */
  isBare?: boolean;
  /** Applies focus styling inset */
  focusInset?: boolean;
}

export interface RangeProps extends Omit<HTMLInputAttributes, 'type'> {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
  /** Whether to show a background progress track */
  hasLowerTrack?: boolean;
}

export interface FileUploadProps {
  /** Whether the upload is disabled */
  disabled?: boolean;
  /** Whether the upload is in a dragging state */
  isDragging?: boolean;
  /** Compact size */
  isCompact?: boolean;
  /** Accepted file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  class?: string;
}

export interface FileListProps {
  class?: string;
}

export interface FileProps {
  /** File type for icon display */
  type?: 'generic' | 'document' | 'spreadsheet' | 'presentation' | 'image' | 'video' | 'zip' | 'pdf';
  /** Whether the file is being uploaded */
  isCompact?: boolean;
  /** Validation state */
  validation?: ValidationState;
  class?: string;
}

export interface InputGroupProps {
  /** Compact size */
  isCompact?: boolean;
  class?: string;
}

export interface MediaInputProps extends InputProps {
  /** Whether the input has a start icon */
  hasStartIcon?: boolean;
  /** Whether the input has an end icon */
  hasEndIcon?: boolean;
}

export interface TilesProps {
  /** Name for radio group behavior */
  name?: string;
  /** Whether centered layout */
  isCentered?: boolean;
  class?: string;
}

export interface TileProps {
  /** Value for the tile */
  value?: string;
  /** Whether the tile is selected */
  isSelected?: boolean;
  /** Whether the tile is disabled */
  disabled?: boolean;
  class?: string;
}
