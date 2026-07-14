// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { loadEnv } from 'vite';
import netlify from '@astrojs/netlify';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

const isNetlify = process.env.NETLIFY;
const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
  // output: 'static',
  output: isNetlify ? 'server' : 'static',
  site: isDev
    ? undefined
    : isNetlify
      ? undefined
      : 'https://neilmccracken-dev.github.io',
  base: isDev ? undefined : isNetlify ? undefined : '/astro-pt/',
  adapter: isNetlify ? netlify() : undefined,

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },

  integrations: [react(), markdoc(), ...(isNetlify ? [keystatic()] : [])],
});
