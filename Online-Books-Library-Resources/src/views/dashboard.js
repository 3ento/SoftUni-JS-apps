import { render, html } from '../lib.js'
import * as api from '../api/data.js'
import { navigation } from './navBar.js'


// generate the book cards
export async function loadBooks() {
    const books = await api.getAllBooks();

    render(
        books.map(el => html`<li class="otherBooks">
    <h3>${el.title}</h3>
    <p>Type: ${el.type}</p>
    <p class="img"><img src="${el.imageUrl}"></p>
    <a class="button" href="/details/${el._id}">Details</a>
    </li>`),
        document.getElementsByClassName('other-books-list')[0]
    )
}
const template = () => html`<header id="site-header">
</header>
<!-- Main Content -->
<main id="site-content"></main>


<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>

<ul class="other-books-list">
    
</ul>
</section>`

export async function dashboard(ctx) {
    // render the dashboard base
    ctx.render(template())
    navigation();

    // render the books or render "No books in database" if there are no books
    const temp = await api.getAllBooks();
    if (Object.values(temp).length !== 0) {
        loadBooks();
    } else {
        ctx.render(html`<header id="site-header">
        </header>
        <!-- Main Content -->
        <main id="site-content"></main>
        
        <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        
        <ul class="other-books-list">   
        </ul>

        <p class="no-books">No books in database!</p>
        </section>`)
    }
}