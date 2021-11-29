import { html } from "../lib.js";
import { navigation } from './navBar.js'
import * as data from '../api/data.js'
import * as helper from '../api/helper.js'

const template_author = (book_data, onDelete) => html`
<section id="details-page" class="details">
<div class="book-information">
<h3>${book_data.title}</h3>
<p class="type">Type: ${book_data.type}</p>
<p class="img"><img src="${book_data.imageUrl}"></p>
<div class="actions">
<!-- Edit/Delete buttons ( Only for creator of this book )  -->
<a class="button" href="/edit-book/${book_data._id}">Edit</a>
<a @click=${onDelete.bind(book_data)} class="button" href="/">Delete</a>
<div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
</div>
</div>
<div class="book-description">
<h3>Description:</h3>
<p>${book_data.description}</p>
</div>
</section>`

const template_guest = (book_data) => html`
<section id="details-page" class="details">
<div class="book-information">
<h3>${book_data.title}</h3>
<p class="type">Type: ${book_data.type}</p>
<p class="img"><img src="${book_data.imageUrl}"></p>
<div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
</div>
<div class="book-description">
<h3>Description:</h3>
<p>${book_data.description}</p>
</div>
</section>`

const template_user = (book_data) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book_data.title}</h3>
        <p class="type">Type: ${book_data.type}</p>
        <p class="img"><img src="${book_data.imageUrl}"></p>
        <div class="actions">
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            <a class="button" href=javascript:void(0)>Like</a>

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book_data.description}</p>
    </div>
</section>`

async function onDelete(ev) {
    ev.preventDefault();

    data.deleteBook(this._id);
    window.location = '/';
}

export async function onDetailsPage(ctx) {
    const book = await data.getBookDetails(ctx.params.id)

    navigation();
    if (helper.getUserData() == null) {
        ctx.render(template_guest(book))
    } else if (helper.getUserData().id == book._ownerId) {
        ctx.render(template_author(book, onDelete))
    } else {
        ctx.render(template_user(book))
    }
}
