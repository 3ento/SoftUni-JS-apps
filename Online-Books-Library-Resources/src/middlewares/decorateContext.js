import { render } from '../lib.js'

const root = document.getElementById('site-content')

// stupid fucking function i dont understand fuck u Viktore
export default function decorateContext(ctx, next) {
    ctx.render = (ctx) => render(ctx, root);

    next();
}