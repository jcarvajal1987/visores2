import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
    output: 'server',
    adapter: netlify(),
  outDir: './docs',
  // site: 'https://jcarvajal1987.github.io',
  // base:'/apr',
  build: {
    client: './client',
    format: 'file',
    // assets: 'assets',
    assetsPrefix: '.'
  }
});
