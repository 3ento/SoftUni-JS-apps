import { html } from "../lib.js";
import { navigation } from './navBar.js'
import * as helper from '../api/helper.js'
import * as data from '../api/data.js'
import { render } from "../lib.js";

async function loadBooks() {
    const books = await data.myBooks(helper.getUserData().id);

    render(
        books.map(el => html`
    <li class="otherBooks">
    <h3>${el.title}</h3>
    <p>Type: ${el.type}</p>
    <p class="img"><img src="${el.imageUrl}"></p>
    <a class="button" href="/details/${el._id}">Details</a>
    </li>`),
        document.getElementsByClassName('my-books-list')[0]
    )
}

const template_with_books = (loadBooks) => html`
<section id="my-books-page" class="my-books">
<h1>My Books</h1>

<ul class="my-books-list">
    ${loadBooks()}
</ul>`



export async function myBooksPage(ctx) {
    const books = await data.myBooks(helper.getUserData().id)

    navigation();
    if (Object.values(books).length !== 0) {
        ctx.render(template_with_books(loadBooks));
    } else {
        ctx.render(html`
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
        
            <p class="no-books">No books in database!</p>
        </section>`)
    }
}