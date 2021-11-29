import { html } from "../lib.js";
import { navigation } from './navBar.js'
import * as data from '../api/data.js'

const template = (book_data, onSubmit) => html`
<section id="edit-page" class="edit">
    <form id="edit-form">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" value="${book_data.title}">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">${book_data.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" value="${book_data.imageUrl}">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value="${book_data.type}">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input @submit=${onSubmit.bind(book_data)} class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`


export async function onEditPage(ctx) {
    const book = await data.getBookDetails(ctx.params.id)

    navigation();
    ctx.render(template(book, onSubmit))

    async function onSubmit(ev) {
        ev.preventDefault();

        const title = document.getElementById('title').value.trim()
        const description = document.getElementById('description').value.trim()
        const imageUrl = document.getElementById('image').value
        const type = document.getElementById('type').value

        if (title == '' || description == '' || imageUrl == '') {
            return alert('Please fill in all fields')
        }

        const edit = {
            title: title,
            description: description,
            imageUrl: imageUrl,
            type: type
        }

        data.editBookScreen(this._id, edit);
        ctx.page.redirect('/')
    }
}