<script lang="ts">
  import svgContent from '../svg/play-fill.svg?raw';

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
    const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
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
