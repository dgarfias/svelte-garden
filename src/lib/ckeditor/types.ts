/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type { Editor, EditorConfig } from 'ckeditor5';

export interface GardenEditorProps {
  /** Editor configuration (optional - uses sensible defaults) */
  config?: Partial<EditorConfig>;
  /** Initial editor content */
  value?: string;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Minimum height of the editor */
  minHeight?: string;
  /** Additional CSS class */
  class?: string;
  /** Callback when content changes */
  onchange?: (data: string) => void;
  /** Callback when editor is ready */
  onready?: (editor: Editor) => void;
  /** Callback when editor loses focus */
  onblur?: (editor: Editor) => void;
  /** Callback when editor gains focus */
  onfocus?: (editor: Editor) => void;
  /** Callback on editor error */
  onerror?: (error: Error) => void;
}

export type { Editor, EditorConfig };
