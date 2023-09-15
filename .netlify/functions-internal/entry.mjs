import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_c1767687.mjs';
import './chunks/astro_2a5abb0d.mjs';
import './chunks/pages/image-endpoint_0acf0e24.mjs';
import './chunks/pages/_id__3b074033.mjs';
/* empty css                                */
const _page0  = () => import('./chunks/image-endpoint_536e1900.mjs');
const _page1  = () => import('./chunks/_id__9d43c846.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.0.8/node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/[id].astro", _page1]]);
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
