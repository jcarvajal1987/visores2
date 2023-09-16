import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_fc9df558.mjs';
import './chunks/astro_f59ab796.mjs';
import './chunks/pages/image-endpoint_dfd9baeb.mjs';
import './chunks/pages/_id__34957442.mjs';
/* empty css                                */
const _page0  = () => import('./chunks/image-endpoint_f2c0b6c7.mjs');
const _page1  = () => import('./chunks/_id__e9771762.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.0.8/node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/[id].astro", _page1]]);
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
