// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://idris-web.github.io',
  base: '/mulk-30',
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: true
    },
    server: {
      allowedHosts: true
    }
  }
});