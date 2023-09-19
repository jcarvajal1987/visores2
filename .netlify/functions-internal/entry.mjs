import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_98329b78.mjs';
import './chunks/astro_f59ab796.mjs';
import './chunks/pages/image-endpoint_03b0d1da.mjs';

const _page0  = () => import('./chunks/image-endpoint_e3bb8217.mjs');
const _page1  = () => import('./chunks/_id__217381f4.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.0.8/node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/[id].astro", _page1]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {"builders":true};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
