import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://github.io',
  base: '/ALGO-/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});