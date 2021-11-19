//imports
import { render, html } from './node_modules/lit-html/lit-html.js'

//gloabl container to render DOM in
const container = document.getElementsByTagName('body')[0];

//temporary variable because I couldn't get a bind to work for the onEdit function
let id = '';

//initial render
start();

//adding a book
async function onCreate(ev) {
    ev.preventDefault();

    const book_info = {
        "author": document.getElementsByName('author')[0].value.trim(),
        "title": document.getElementsByName('title')[0].value.trim()
    }

    await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book_info)
    })

    loadBooks();
    document.getElementsByName('author')[0].value = '';
    document.getElementsByName('title')[0].value = '';

    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('add-form').style.display = 'block';
}

//deleting a book and re-rendering the DOM
async function onDelete() {
    await request('http://localhost:3030/jsonstore/collections/books/' + this._id, {
        method: 'DELETE'
    });

    loadBooks();
}

//switiching out the "Add book" inputs for the "Edit book" ones
//taking the book id from the bind into the global variable
async function enableEdit() {
    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('add-form').style.display = 'none';

    id = this._id;
}

//taking the edit inputs and calling a PUT request
async function onEdit(ev) {
    ev.preventDefault();

    const body = {
        'author': document.getElementsByName('author')[1].value.trim(),
        'title': document.getElementsByName('title')[1].value.trim(),
        "_id": id
    }

    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body)
    })

    loadBooks();

    document.getElementsByName('author')[1].value = '';
    document.getElementsByName('title')[1].value = '';
}

//load the book table
async function loadBooks() {
    const data = await request('http://localhost:3030/jsonstore/collections/books');

    if (Object.values(data).length == 0) {
        document.getElementById('fail').style.display = 'block';
    } else {
        document.getElementById('fail').style.display = 'none';
    }

    render(Object.values(data).map(el => html`
    <tr>
                <td>${el.title}</td>
                <td>${el.author}</td>
                <td>
                    <button @click=${enableEdit.bind(el)}>Edit</button>
                    <button @click=${onDelete.bind(el)}>Delete</button>
                </td>
            </tr>
    `), document.getElementsByTagName('tbody')[0]);
}

//general request function
async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    const response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}

//initial render function
function start() {
    render(html`
<button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
<p style="text-align:center; display: none;" id="fail">The library is currently empty, please add a book using the input fields below.</p>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>

    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit" @click=${onCreate}>
    </form>

    <form id="edit-form" style="display: none;">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save" @click=${onEdit}>
    </form>
`, container)
}
