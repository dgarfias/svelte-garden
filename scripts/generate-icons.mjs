/**
 * Script to generate SVG icon files from paths.ts definitions
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../src/lib/icons/svg');

// Ensure directory exists
mkdirSync(iconsDir, { recursive: true });

// All icon definitions from paths.ts
const icons = {
  // Text Formatting
  BoldStroke: `<path fill="currentColor" d="M7 1c2.176 0 4 1.824 4 4 0 1.315-.666 2.501-1.673 3.234C10.869 8.792 12 10.287 12 12c0 2.176-1.824 4-4 4H3.5a.5.5 0 01-.5-.5v-14a.5.5 0 01.5-.5H7zM4 15h4c1.624 0 3-1.376 3-3S9.624 9 8 9H4v6zM7 2H4v6h3c1.624 0 3-1.376 3-3S8.624 2 7 2z"/>`,
  ItalicStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M7.5 1.5h3M9 1.5l-3 14m-1.5 0h3"/>`,
  UnderlineStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M2.5 15.5h10m-9-14v8c0 2.2 1.8 4 4 4s4-1.8 4-4v-8"/>`,
  MarkupStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M12 5.5l2.1 2.1c.2.2.2.5 0 .7L12 10.5m-8-5L1.9 7.6c-.2.2-.2.5 0 .7L4 10.5M10 3L6 13"/>`,
  
  // Links
  LinkStroke: `<path fill="currentColor" d="M4.441 7.38l.095.083.939.939-.708.707-.939-.939-2 2-.132.142a2.829 2.829 0 003.99 3.99l.142-.132 2-2-.939-.939.707-.708.94.94a1 1 0 01.083 1.32l-.083.094-2 2A3.828 3.828 0 01.972 9.621l.15-.158 2-2A1 1 0 014.34 7.31l.101.07zm7.413-3.234a.5.5 0 01.057.638l-.057.07-7 7a.5.5 0 01-.765-.638l.057-.07 7-7a.5.5 0 01.708 0zm3.023-3.025a3.829 3.829 0 01.15 5.257l-.15.158-2 2a1 1 0 01-1.32.083l-.094-.083-.94-.94.708-.707.939.94 2-2 .132-.142a2.829 2.829 0 00-3.99-3.99l-.142.131-2 2 .939.939-.707.708-.94-.94a1 1 0 01-.082-1.32l.083-.094 2-2a3.828 3.828 0 015.414 0z"/>`,
  LinkRemoveStroke: `<path fill="currentColor" d="M.784 2.089l.07.057L7 8.293l4.146-4.147.07-.057a.5.5 0 01.695.695l-.057.07L7.707 9l6.147 6.146a.5.5 0 01-.638.765l-.07-.057-3.795-3.796-2.815 2.816a3.829 3.829 0 01-5.257.15l-.158-.15a3.829 3.829 0 01-.149-5.256l.15-.158 2.815-2.816-3.79-3.79a.5.5 0 01.637-.765zm3.86 5.262l-2.816 2.816-.132.142a2.829 2.829 0 003.99 3.99l.142-.132 2.816-2.816L7 9.707l-2.146 2.147-.07.057a.5.5 0 01-.695-.695l.057-.07L6.293 9 4.644 7.351zm10.233-6.23a3.829 3.829 0 01.15 5.257l-.15.158-2 2a1 1 0 01-1.32.083l-.094-.083-.94-.94.708-.707.939.94 2-2 .132-.142a2.829 2.829 0 00-3.99-3.99l-.142.131-2 2 .939.939-.707.708-.94-.94a1 1 0 01-.082-1.32l.083-.094 2-2a3.828 3.828 0 015.414 0z"/>`,
  
  // Lists
  ListBulletStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M5.5 2.5h9m-9 5h9m-9 5h9"/><g fill="currentColor"><circle cx="2.5" cy="2.5" r="1.5"/><circle cx="2.5" cy="7.5" r="1.5"/><circle cx="2.5" cy="12.5" r="1.5"/></g>`,
  ListNumberStroke: `<path fill="currentColor" d="M5.5 3a.5.5 0 010-1h9a.5.5 0 110 1h-9zm0 5a.5.5 0 010-1h9a.5.5 0 110 1h-9zm0 5a.5.5 0 110-1h9a.5.5 0 110 1h-9zM1.61 4.8c-.2 0-.33-.13-.33-.34v-.14c0-.2.13-.33.33-.33h.44V2.25l-.08.08c-.08.07-.15.1-.23.1-.06 0-.15-.02-.24-.12l-.1-.09a.364.364 0 01-.1-.24c0-.06.02-.14.11-.23l.63-.61c.11-.1.22-.14.35-.14h.21c.2 0 .33.13.33.34V4h.43c.21 0 .33.13.33.33v.14c0 .21-.13.34-.33.34H1.61V4.8zm0 5.05c-.21 0-.35-.13-.35-.33 0-.9.59-1.32 1.07-1.65.32-.22.59-.41.59-.65 0-.27-.22-.37-.41-.37-.22 0-.37.15-.43.22-.1.1-.19.14-.28.14-.07 0-.14-.03-.2-.08l-.13-.1c-.16-.12-.19-.29-.08-.45.2-.27.57-.59 1.17-.59.75 0 1.28.48 1.28 1.17 0 .72-.57 1.09-1.02 1.39-.26.18-.48.33-.57.5h1.3c.21 0 .34.13.34.33v.14c0 .21-.13.33-.34.33H1.61zm.86 5c-.5 0-.87-.2-1.1-.37-.16-.12-.18-.3-.07-.46l.1-.15c.08-.13.18-.15.25-.15s.13.02.21.07c.13.09.32.21.57.21.3 0 .51-.17.51-.41 0-.39-.49-.43-.63-.43-.24 0-.35-.07-.42-.21-.09-.18-.06-.32.04-.45 0 0 .58-.68.59-.7h-.87c-.2 0-.33-.13-.33-.33v-.14c0-.21.13-.33.33-.33H3.4c.21 0 .34.13.34.33s-.04.3-.13.4l-.63.73c.46.14.86.51.86 1.11.01.63-.47 1.28-1.37 1.28z"/>`,
  
  // Indentation
  IndentIncreaseStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M1.5 1.5h13m-7 4h7m-7 4h7m-13 4h13m-13-9l2.6 2.6c.2.2.2.5 0 .7l-2.6 2.6"/>`,
  IndentDecreaseStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M1.5 1.5h13m-7 4h7m-7 4h7m-13 4h13M4 4.5L1.4 7.1c-.2.2-.2.5 0 .7L4 10.5"/>`,
  
  // Headings
  HeadingStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M2.5 1.5v14m10-14v14m-10-7h10"/>`,
  
  // Quote
  QuoteStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M7 7.5H4c-.3 0-.5-.2-.5-.5V4c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5zm6 0h-3c-.3 0-.5-.2-.5-.5V4c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5zM12 12c1-1 1.5-2.5 1.5-4V6M6 12c1-1 1.5-2.5 1.5-4V6"/>`,
  
  // Undo/Redo
  EditUndoStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M15.5 11.2c0-4.3-3.5-7.8-7.8-7.8-2.6.1-5.2 1.5-6.7 3.7M.5 3v4c0 .3.2.5.5.5h4"/>`,
  EditRedoStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M.5 11.2C.5 7 4 3.5 8.2 3.5c2.7 0 5.2 1.4 6.8 3.6m.5-4.1v4c0 .3-.2.5-.5.5h-4"/>`,
  
  // Horizontal Rule
  HorizontalRuleStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M.5 8.5h15"/>`,
  
  // Table
  TableStroke: `<path fill="none" stroke="currentColor" d="M.5 3.5c0-.6.4-1 1-1h13c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-13c-.6 0-1-.4-1-1v-10zm0 3h15m-15 4h15m-10-7v10m5-10v10"/>`,
  
  // Pencil/Edit
  PencilStroke: `<path fill="none" stroke="currentColor" stroke-linejoin="round" d="M.5 15.5V13L12.6.9c.2-.2.5-.2.7 0l1.8 1.8c.2.2.2.5 0 .7L3 15.5H.5zM11 3l2 2"/>`,
  
  // Chevrons
  ChevronDownStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6l4 4 4-4"/>`,
  ChevronDownFill: `<path fill="currentColor" d="M12.375 5.22a1 1 0 011.343 1.476l-.093.085-5 4a1 1 0 01-1.147.072l-.103-.072-5-4a1 1 0 011.147-1.634l.103.072L8 8.72l4.375-3.5z"/>`,
  ChevronUpStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 10l4-4 4 4"/>`,
  ChevronLeftStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 4l-4 4 4 4"/>`,
  ChevronRightStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 4l4 4-4 4"/>`,
  
  // Checkmarks
  CheckLgStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M1 9l4 4L15 3"/>`,
  CheckSmStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M3 8l3 3 7-7"/>`,
  
  // Alignment
  AlignLeftStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M.5 2.5h15m-15 4h10m-10 4h13m-13 4h8"/>`,
  AlignCenterStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M.5 2.5h15m-12 4h9m-11 4h13m-10 4h7"/>`,
  AlignRightStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M.5 2.5h15m-10 4h10m-13 4h13m-8 4h8"/>`,
  AlignJustifyStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M.5 2.5h15m-15 4h15m-15 4h15m-15 4h15"/>`,
  
  // Close/X
  XStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M3 13L13 3m0 10L3 3"/>`,
  XCircleStroke: `<circle cx="8" cy="8" r="7.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M5 11l6-6m0 6L5 5"/>`,
  
  // Plus
  PlusStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 1.5v13m-6.5-6.5h13"/>`,
  PlusCircleStroke: `<circle cx="8" cy="8" r="7.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 4.5v7m-3.5-3.5h7"/>`,
  
  // Trash
  TrashStroke: `<path fill="none" stroke="currentColor" d="M5.5 2.5v-1c0-.6.4-1 1-1h3c.6 0 1 .4 1 1v1m-9 1h13m-11 0v10c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-10"/>`,
  
  // Settings/Gear
  GearStroke: `<path fill="none" stroke="currentColor" d="M13.17 3.07l-1.64.71c-.48-.4-1.03-.72-1.63-.94l-.22-1.79a.511.511 0 00-.4-.44C8.86.54 8.44.5 8 .5c-.44 0-.86.04-1.28.11-.22.04-.38.22-.4.44l-.21 1.79c-.6.22-1.15.54-1.63.94l-1.65-.71a.491.491 0 00-.58.13c-.55.65-.99 1.4-1.29 2.21-.08.21 0 .44.18.58l1.45 1.08a4.91 4.91 0 000 1.87l-1.45 1.08c-.18.13-.25.37-.18.58.3.81.74 1.55 1.28 2.2.14.17.38.22.58.13l1.65-.71c.48.4 1.03.72 1.63.94l.21 1.79c.03.22.19.4.4.44.43.07.85.11 1.29.11.44 0 .86-.04 1.28-.11.22-.04.38-.22.4-.44l.21-1.79c.6-.22 1.15-.54 1.63-.94l1.65.71c.2.09.44.04.58-.13.54-.65.98-1.39 1.28-2.2.08-.21 0-.44-.18-.57L13.4 8.95c.07-.32.1-.63.1-.95s-.03-.63-.09-.94l1.45-1.08c.18-.13.25-.37.18-.58-.3-.81-.74-1.55-1.28-2.2a.51.51 0 00-.59-.13z"/><circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor"/>`,
  
  // Search
  SearchStroke: `<circle cx="6" cy="6" r="5.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M15.5 15.5l-5-5"/>`,
  
  // User
  UserSoloStroke: `<circle cx="8" cy="4.5" r="3" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" d="M.5 15.5c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5"/>`,
  
  // Mail/Email
  EmailStroke: `<path fill="none" stroke="currentColor" d="M.5 3.5c0-.6.4-1 1-1h13c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-13c-.6 0-1-.4-1-1v-10zm0 0l7.5 6 7.5-6"/>`,
  
  // Phone
  PhoneStroke: `<path fill="none" stroke="currentColor" d="M10.94 15.5c-1.82 0-4.93-1.36-7.3-3.74C1.34 9.46-.22 5.79.64 4.06c.5-1.01 1.66-1.79 2.73-2.42a1 1 0 011.13.07l2.44 2c.35.28.42.78.17 1.15l-1.28 1.88a.5.5 0 00.04.61l2.78 2.78a.5.5 0 00.61.04l1.88-1.28c.37-.25.87-.18 1.15.17l2 2.44a1 1 0 01.07 1.13c-.63 1.07-1.41 2.23-2.42 2.73-.33.1-.66.14-1 .14z"/>`,
  
  // Document/File
  FileDocumentStroke: `<path fill="none" stroke="currentColor" d="M9.5.5h-7c-.6 0-1 .4-1 1v13c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-10l-5-4zm0 0v4h5m-9 3h7m-7 3h7"/>`,
  
  // Image
  ImageStroke: `<rect x=".5" y=".5" width="15" height="15" rx="1" fill="none" stroke="currentColor"/><circle cx="5" cy="5" r="1.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" d="M.5 12.5l4-4 2 2 5-5 4 4"/>`,
  
  // Star
  StarStroke: `<path fill="none" stroke="currentColor" stroke-linejoin="round" d="M8 1.5l2 4.3 4.7.6-3.4 3.2.8 4.6L8 12.1l-4.1 2.1.8-4.6-3.4-3.2 4.7-.6 2-4.3z"/>`,
  StarFill: `<path fill="currentColor" d="M8 0l2.47 5.01L16 5.82l-4 3.9.94 5.5L8 12.77l-4.94 2.45.94-5.5-4-3.9 5.53-.81L8 0z"/>`,
  
  // Alert/Warning
  AlertWarningStroke: `<path fill="none" stroke="currentColor" d="M.88 13.77L7.06 1.4c.38-.75 1.5-.75 1.88 0l6.18 12.37c.34.68-.15 1.48-.94 1.48H1.82c-.79 0-1.28-.8-.94-1.48zM8 6v3.5m0 2.5v.5"/>`,
  AlertErrorStroke: `<circle cx="8" cy="8" r="7.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 4v5m0 3v.5"/>`,
  
  // Info
  InfoStroke: `<circle cx="8" cy="8" r="7.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 7v5m0-8.5V4"/>`,
  
  // Check Circle (Success)
  CheckCircleStroke: `<circle cx="8" cy="8" r="7.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4.5 8l2.5 2.5L12 5"/>`,
  
  // Copy
  CopyStroke: `<path fill="none" stroke="currentColor" d="M5.5 5.5v-4c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-4m-5-5h-4c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1z"/>`,
  
  // Download/Upload
  DownloadStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 1v10m-4-4l4 4 4-4m-10.5 7h13"/>`,
  UploadStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 11V1m-4 4l4-4 4 4m-10.5 7h13"/>`,
  
  // Eye
  EyeStroke: `<path fill="none" stroke="currentColor" d="M.5 8s3-6 7.5-6 7.5 6 7.5 6-3 6-7.5 6S.5 8 .5 8z"/><circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor"/>`,
  EyeHideStroke: `<path fill="none" stroke="currentColor" d="M10.79 5.21c.94.58 1.75 1.34 2.43 2.1.17.2.28.44.28.69s-.11.49-.28.69c-.02.02-.77.87-1.92 1.69M5.21 10.79a7.46 7.46 0 01-2.43-2.1c-.17-.2-.28-.44-.28-.69s.11-.49.28-.69c.02-.02.77-.87 1.92-1.69"/><circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M2 14L14 2"/>`,
  
  // Calendar/Clock
  CalendarStroke: `<path fill="none" stroke="currentColor" d="M.5 5.5v9c0 .6.4 1 1 1h13c.6 0 1-.4 1-1v-9m-15 0v-3c0-.6.4-1 1-1h13c.6 0 1 .4 1 1v3m-15 0h15m-11-4v2m7-2v2"/>`,
  ClockStroke: `<circle cx="8" cy="8" r="7.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 3.5V8l2.5 2.5"/>`,
  
  // Arrows
  ArrowLeftStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M15.5 8H.5m5-5L.5 8l5 5"/>`,
  ArrowRightStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M.5 8h15m-5-5l5 5-5 5"/>`,
  
  // Menu/Navigation
  MenuStroke: `<path fill="none" stroke="currentColor" stroke-linecap="round" d="M1 3h14M1 8h14M1 13h14"/>`,
  OverflowStroke: `<circle cx="2" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="14" cy="8" r="1.5" fill="currentColor"/>`,
  OverflowVerticalStroke: `<circle cx="8" cy="2" r="1.5" fill="currentColor"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="14" r="1.5" fill="currentColor"/>`,
  
  // Grip for draggable
  GripStroke: `<circle cx="5.5" cy="3" r="1" fill="currentColor"/><circle cx="10.5" cy="3" r="1" fill="currentColor"/><circle cx="5.5" cy="8" r="1" fill="currentColor"/><circle cx="10.5" cy="8" r="1" fill="currentColor"/><circle cx="5.5" cy="13" r="1" fill="currentColor"/><circle cx="10.5" cy="13" r="1" fill="currentColor"/>`,
  
  // Sun/Moon for theme
  SunStroke: `<circle cx="8" cy="8" r="3.5" fill="none" stroke="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M8 .5v2m0 11v2m7.5-7.5h-2m-11 0h-2m12.02-5.02l-1.41 1.41M4.39 11.61l-1.41 1.41m10.04 0l-1.41-1.41M4.39 4.39L2.98 2.98"/>`,
  MoonStroke: `<path fill="none" stroke="currentColor" d="M14.5 10.29A6.95 6.95 0 0110.06 12c-3.87 0-7-3.13-7-7 0-1.68.59-3.22 1.58-4.44A7.5 7.5 0 003.26 8c0 4.14 3.36 7.5 7.5 7.5 1.54 0 2.97-.47 4.16-1.26-.13.02-.27.05-.42.05z"/>`,
};

// Convert PascalCase to kebab-case for filenames
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Generate SVG files
for (const [name, content] of Object.entries(icons)) {
  const filename = toKebabCase(name) + '.svg';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">${content}</svg>`;
  const filepath = join(iconsDir, filename);
  writeFileSync(filepath, svg);
  console.log(`Created: ${filename}`);
}

console.log(`\nGenerated ${Object.keys(icons).length} icon files`);
