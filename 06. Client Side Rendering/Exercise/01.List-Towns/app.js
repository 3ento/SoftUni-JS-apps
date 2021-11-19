import { html, render } from './node_modules/lit-html/lit-html.js'

document.getElementById('btnLoadTowns').addEventListener('click', onLoad);

function onLoad(ev) {
    ev.preventDefault();

    const data = document.getElementById('towns').value.trim().split(', ');
    render(data.map((el) => html`<li>${el}</li>`), document.getElementById('root'));

    document.getElementById('towns').value = '';
}