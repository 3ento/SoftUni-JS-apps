import { html } from '../lib.js'
import { getAllCars } from '../api/data.js'

const template = (cars) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${loadCars(cars)}
    </div>
</section>`

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
        return html`<p class="no-cars">No cars in database.</p>`
    }
}

export async function allListingsPage(ctx) {
    const allCars = await getAllCars();

    ctx.render(template(allCars));
}