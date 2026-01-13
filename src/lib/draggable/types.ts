/**
 * Svelte Garden - Draggable Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  /** Applies inset box-shadow styling on focus */
  focusInset?: boolean;
  /** Removes borders */
  isBare?: boolean;
  /** Applies compact spacing */
  isCompact?: boolean;
  /** Disables the draggable */
  isDisabled?: boolean;
  /** Applies grab styling (currently being dragged) */
  isGrabbed?: boolean;
  /** Hides content and applies placeholder background styling */
  isPlaceholder?: boolean;
}

export interface DraggableGripProps extends HTMLAttributes<HTMLDivElement> {}

export interface DraggableContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface DraggableListProps extends HTMLAttributes<HTMLUListElement> {
  /** Flows list items inline */
  isHorizontal?: boolean;
}

export interface DraggableItemProps extends HTMLAttributes<HTMLLIElement> {
  /** The unique identifier for this item */
  id: string;
  /** Applies compact spacing */
  isCompact?: boolean;
  /** Disables the item */
  isDisabled?: boolean;
}

export interface DropzoneProps extends HTMLAttributes<HTMLDivElement> {
  /** Indicates a drop is possible during a drag */
  isActive?: boolean;
  /** Aligns dropzone message content vertically */
  isVertical?: boolean;
  /** Applies danger styling */
  isDanger?: boolean;
  /** Disables the dropzone */
  isDisabled?: boolean;
  /** Indicates a draggable is on a droppable area */
  isHighlighted?: boolean;
}
