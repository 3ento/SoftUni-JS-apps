import { html } from "../lib.js"
import { createCarListing } from '../api/data.js'

const template = (onCreate) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onCreate} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`

export function carListingPage(ctx) {
    ctx.render(template(onCreate))

    function onCreate(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target);

        const brand = formData.get('brand')
        const model = formData.get('model')
        const description = formData.get('description')
        let year = Number(formData.get('year'))
        const imageUrl = formData.get('imageUrl')
        let price = Number(formData.get('price'))

        if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
            return alert('All fields are required!')
        }

        createCarListing({
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        })

        ctx.page.redirect('/')
    }
}