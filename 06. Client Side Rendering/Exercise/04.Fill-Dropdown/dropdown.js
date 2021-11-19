//imports
import { render, html } from './node_modules/lit-html/lit-html.js'

//Add item event listener
document.querySelector('[type="submit"]').addEventListener('click', addItem)

//render initial options
onRender();

//GET request
async function dataReq() {
    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    return res.json();
}

//render options
async function onRender() {
    const data = await dataReq();

    render(Object.values(data).map(el => html`
    <option value=${el._id}>${el.text}</option>
    `), document.getElementById('menu'));
}

//add new options (POST request)
async function addItem(ev) {
    ev.preventDefault();

    const data = { "text": document.getElementById('itemText').value.trim() }
    await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    document.getElementById('itemText').value = '';

    onRender();
    render(html`<p>${data.text} added!</p>`, document.getElementsByTagName('article')[0])
}
