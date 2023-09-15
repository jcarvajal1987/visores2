import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_fbce45e9.mjs';
import './chunks/astro_f59ab796.mjs';
import './chunks/pages/image-endpoint_dfdc4328.mjs';
import './chunks/pages/_id__d9b3c85e.mjs';
/* empty css                                */
const _page0  = () => import('./chunks/image-endpoint_54169d69.mjs');
const _page1  = () => import('./chunks/_id__9a911b33.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.0.8/node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/[id].astro", _page1]]);
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
