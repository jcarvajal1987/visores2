import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_64a8c014.mjs';
import './chunks/astro_f59ab796.mjs';
import './chunks/pages/image-endpoint_3ae90dc7.mjs';

const _page0  = () => import('./chunks/image-endpoint_d19a8e0a.mjs');
const _page1  = () => import('./chunks/_id__238aba7d.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.0.8/node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/[id].astro", _page1]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
