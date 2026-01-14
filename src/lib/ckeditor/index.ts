/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export { default as GardenEditor } from './GardenEditor.svelte';
export type { GardenEditorProps, Editor, EditorConfig } from './types.js';

// Export path to Garden icons file for bundler configuration
// Users can configure their bundler to alias @ckeditor/ckeditor5-icons to this file
export const GARDEN_CKEDITOR_ICONS_PATH = './garden-icons.js';
