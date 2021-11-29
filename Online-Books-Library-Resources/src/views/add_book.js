import { html } from "../lib.js";
import { navigation } from './navBar.js'
import * as data from '../api/data.js'

const template = (onClick) => html`
<section id="create-page" class="create">
<form id="create-form" action="" method="">
    <fieldset>
        <legend>Add new Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" placeholder="Title">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description" id="description" placeholder="Description"></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" placeholder="Image">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type">
                    <option value="Fiction">Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input @click=${onClick}  class="button submit" type="submit" value="Add Book">
    </fieldset>
</form>
</section>`

export function addBookPage(ctx) {
    navigation();
    ctx.render(template(onClick));

    async function onClick(ev) {
        ev.preventDefault();

        const title = document.getElementById('title').value.trim();
        const desc = document.getElementById('description').value.trim();
        const image = document.getElementById('image').value;
        const type = document.getElementById('type').value;

        if (title == '' || desc == '' || image == '') {
            return alert('Fill all fields.')
        }

        await data.addBook({
            title: title,
            description: desc,
            imageUrl: image,
            type: type
        })

        ctx.page.redirect('/')
    }
}