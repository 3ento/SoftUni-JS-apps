import { html } from "../lib.js";
import { getMyListing } from '../api/data.js'
import { getUserData } from '../api/helper.js'

const template = (cars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
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
        return html`<p class="no-cars"> You haven't listed any cars yet.</p>`
    }
}

export async function myListingsPage(ctx) {
    const myCars = await getMyListing(getUserData().id);

    ctx.render(template(myCars))
}