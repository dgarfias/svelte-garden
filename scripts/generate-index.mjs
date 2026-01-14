/**
 * Generate index.ts exports for all SVG icons
 */
import { readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../src/lib/icons/svg');
const indexPath = join(__dirname, '../src/lib/icons/index.ts');

// Get all SVG files
const svgFiles = readdirSync(iconsDir)
  .filter(f => f.endsWith('.svg'))
  .sort();

// Convert kebab-case to PascalCase
function toPascalCase(str) {
  let result = str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  // Prefix with 'N' if starts with a number (invalid JS identifier)
  if (/^\d/.test(result)) {
    result = 'N' + result;
  }
  
  return result;
}

// Generate exports
const exports = svgFiles.map(file => {
  const name = toPascalCase(file.replace('.svg', ''));
  return `export { default as ${name} } from './svg/${file}?raw';`;
});

// Generate Icons object for lazy loading
const iconsObject = svgFiles.map(file => {
  const name = toPascalCase(file.replace('.svg', ''));
  return `  ${name}: () => import('./svg/${file}?raw').then(m => m.default),`;
});

const content = `/**
 * Garden SVG Icons - Svelte
 * Ported from @zendeskgarden/svg-icons
 * 
 * Usage:
 * \`\`\`svelte
 * <script>
 *   import { Icon, BoldStroke } from '$lib/icons';
 * </script>
 * 
 * <Icon src={BoldStroke} size={16} />
 * \`\`\`
 */

// Base component
export { default as Icon } from './Icon.svelte';

// Icon SVG strings (imported with ?raw)
${exports.join('\n')}

// Export all icons as a record for iteration (useful for icon gallery)
export const Icons = {
${iconsObject.join('\n')}
} as const;
`;

writeFileSync(indexPath, content);
console.log(`Generated index.ts with ${svgFiles.length} icons`);
