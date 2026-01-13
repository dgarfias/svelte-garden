/**
 * Svelte Garden - Avatar Types
 */

import type { HTMLAttributes } from 'svelte/elements';

export type AvatarSize = 'extraextrasmall' | 'extrasmall' | 'small' | 'medium' | 'large';
export type AvatarStatus = 'available' | 'away' | 'transfers' | 'offline' | 'active';

export interface AvatarProps extends HTMLAttributes<HTMLElement> {
  /** Avatar size */
  size?: AvatarSize;
  /** Show status indicator */
  status?: AvatarStatus;
  /** Whether the avatar is for a system/bot */
  isSystem?: boolean;
  /** Background color for text avatars */
  backgroundColor?: string;
  /** Foreground color for text avatars */
  foregroundColor?: string;
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Text to display (initials) */
  text?: string;
  /** Whether the avatar represents a badge */
  badge?: string | number;
  /** Surface color for status badge */
  surfaceColor?: string;
}

export interface StatusIndicatorProps extends HTMLAttributes<HTMLElement> {
  /** Status type */
  type: AvatarStatus;
  /** Size of the indicator */
  size?: AvatarSize;
}
