import { cats } from './catSeeder.js'
import { html, render } from './node_modules/lit-html/lit-html.js'

document.getElementById('allCats').appendChild(document.createElement('ul'));

function onClick(ev, id = this) {
    let btn = ev.target.textContent;
    let content = document.getElementById(id);

    if (btn == 'Hide status code') {
        ev.target.textContent = 'Show status code';
        content.style.display = 'none';
    } else if (btn == 'Show status code') {
        ev.target.textContent = 'Hide status code';
        content.style.display = 'block';
    }
}

const template = (data) => html`
<li>
    <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onClick.bind(data.id)} >Show status code</button>
            <div class="status" style="display: none" id="${data.id}">
                <h4>Status Code: ${data.statusCode}</h4>
                <p>${data.statusMessage}</p>
            </div>
        </div>
</li>`

render(cats.map(el => template(el)), document.querySelector('#allCats ul'));
