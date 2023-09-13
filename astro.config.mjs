import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // output: 'static',
  outDir: './docs',
  // site: 'https://jcarvajal1987.github.io',
  // base:'/apr',
  build: {
    format: 'file',
    assets: 'assets',
    assetsPrefix: '.'
  }
});
