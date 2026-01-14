import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  resolve: {
    alias: {
      '@ckeditor/ckeditor5-icons/dist/index.js': new URL('./src/lib/ckeditor/icons.js', import.meta.url).pathname
    }
  }
});
