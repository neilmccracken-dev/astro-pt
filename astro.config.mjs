// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { loadEnv } from 'vite';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
const isProd = process.env.NODE_ENV === 'production';
export default defineConfig({
  output: 'static',
  site: 'https://neilmccracken-dev.github.io',
  base: '/astro-pt',
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },

  integrations: [react(), markdoc(), keystatic()],
});
