import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    paths: {
      // For GitHub Pages deployment, set the base path to the repo name
      // Change this to your repo name when deploying
      base: process.env.NODE_ENV === 'production' ? '/svelte-garden' : ''
    }
  }
};

export default config;
