<script lang="ts">
	/**
	 * Base Icon component for Garden SVG icons
	 * All icons use currentColor for fills/strokes to inherit text color
	 */
	import type { HTMLAttributes } from 'svelte/elements';

	interface IconProps extends HTMLAttributes<SVGSVGElement> {
		/** Raw SVG string (imported with ?raw) */
		src: string;
		/** Icon size in pixels (default: 16) */
		size?: number | string;
		/** Accessible label for the icon */
		'aria-label'?: string;
	}

	let {
		src,
		size = 16,
		'aria-label': ariaLabel,
		class: className = '',
		...rest
	}: IconProps = $props();

	/**
	 * Extract the inner content from an SVG string
	 * Removes the outer <svg> wrapper and returns just the paths/shapes
	 */
	function extractSvgContent(svgString: string): string {
		// Remove the outer <svg> tag and get inner content
		const match = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
		return match ? match[1].trim() : svgString;
	}

	const innerContent = $derived(extractSvgContent(src));
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
	{@html innerContent}
</svg>

<style>
	.garden-icon {
		display: inline-block;
		vertical-align: middle;
		flex-shrink: 0;
	}
</style>
