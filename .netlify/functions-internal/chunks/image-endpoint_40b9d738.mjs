export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/image-endpoint_d4bfb3d1.mjs').then(n => n.i);

export { page };
