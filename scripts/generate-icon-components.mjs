/**
 * Generate individual Svelte icon components that reference SVG files
 * This enables Lucide-style imports: import { GearStroke } from '$lib/icons';
 */
import { readdirSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgDir = join(__dirname, '../src/lib/icons/svg');
const componentsDir = join(__dirname, '../src/lib/icons/components');
const indexPath = join(__dirname, '../src/lib/icons/index.ts');

// Ensure components directory exists
mkdirSync(componentsDir, { recursive: true });

// Get all SVG files
const svgFiles = readdirSync(svgDir)
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

// Generate a Svelte component for each icon that imports the SVG
const componentNames = [];

for (const file of svgFiles) {
  const name = toPascalCase(file.replace('.svg', ''));
  componentNames.push(name);
  
  // Create Svelte component that imports the SVG
  const component = `<script lang="ts">
  import svgContent from '../svg/${file}?raw';

  interface Props {
    size?: number | string;
    'aria-label'?: string;
    class?: string;
    [key: string]: unknown;
  }

  let {
    size = 16,
    'aria-label': ariaLabel,
    class: className = '',
    ...rest
  }: Props = $props();

  // Extract inner content from SVG
  function getInnerContent(svg: string): string {
    const match = svg.match(/<svg[^>]*>([\\s\\S]*)<\\/svg>/i);
    return match ? match[1] : '';
  }

  const inner = getInnerContent(svgContent);
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 16 16"
  focusable="false"
  role={ariaLabel ? 'img' : 'presentation'}
  aria-label={ariaLabel}
  aria-hidden={!ariaLabel}
  class="garden-icon {className}"
  {...rest}
>
  {@html inner}
</svg>

<style>
  .garden-icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
  }
</style>
`;

  writeFileSync(join(componentsDir, `${name}.svelte`), component);
}

console.log(`Generated ${componentNames.length} icon components`);

// Generate index.ts that exports all components
const exports = componentNames.map(name => 
  `export { default as ${name} } from './components/${name}.svelte';`
);

const indexContent = `/**
 * Garden SVG Icons - Svelte
 * Ported from @zendeskgarden/svg-icons
 * 
 * Usage:
 * \`\`\`svelte
 * <script>
 *   import { GearStroke, StarFill } from '$lib/icons';
 * </script>
 * 
 * <GearStroke />
 * <StarFill size={24} />
 * <GearStroke aria-label="Settings" />
 * \`\`\`
 */

// Individual icon components (Lucide-style)
${exports.join('\n')}

// Also export the base Icon component for raw SVG strings
export { default as Icon } from './Icon.svelte';

// Export all icons as a record for iteration (useful for icon gallery)
export const Icons = {
${componentNames.map(name => `  ${name}: () => import('./components/${name}.svelte'),`).join('\n')}
} as const;

// List of all icon names
export const iconNames = [
${componentNames.map(name => `  '${name}',`).join('\n')}
] as const;

export type IconName = typeof iconNames[number];
`;

writeFileSync(indexPath, indexContent);
console.log('Generated index.ts');
