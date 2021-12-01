import { html } from "../lib.js";
import { search } from "../api/data.js"

const template = (onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    </div>
</section>
`


export async function searchPage(ctx) {

    ctx.render(template(onSearch))

    function loadCars(cars) {
        if (Object.values(cars).length !== 0) {
            return cars.map(e => html`
                    <div class="listing">
                    <div class="preview">
                    <img src="${e.imageUrl}">
                    </div>
                    <h2>${e.brand} ${e.model}</h2>
                    <div class="info">
                    <div class="data-info">
                    <h3>Year: ${e.year}</h3>
                    <h3>Price: ${e.price} $</h3>
                    </div>
                    <div class="data-buttons">
                    <a href="/details/${e._id}" class="button-carDetails">Details</a>
                    </div>
                    </div>
                    </div>`)
        } else {
            return html`<p class="no-cars"> No results.</p>`
        }
    }

    async function onSearch() {
        const query = document.getElementById('search-input').value
        const cars = await search(query)

        ctx.render(html`
        <section id="search-cars">
            <h1>Filter by year</h1>
        
            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>
        
            <h2>Results:</h2>
                ${loadCars(cars)}
            </div>
        </section>
        `)
    }
}