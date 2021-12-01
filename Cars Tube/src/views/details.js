import { html } from "../lib.js";
import { getCarDetails, deleteCar } from "../api/data.js"
import { getUserData } from '../api/helper.js'

const template = (car, editDeleteBtn) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${editDeleteBtn}
    </div>
</section>`

export async function detailsPage(ctx) {
    const car = await getCarDetails(ctx.params.id);

    ctx.render(
        template(
            car,
            editDeleteBtn(onDelete)
        )
    )

    async function onDelete() {
        await deleteCar(ctx.params.id);

        ctx.page.redirect('/');
    }

    function editDeleteBtn(onDelete) {
        if (getUserData() == null || getUserData().id !== car._ownerId) {
            return html``
        } else if (getUserData().id == car._ownerId) {
            return html`
            <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
            </div>`
        }
    }
}