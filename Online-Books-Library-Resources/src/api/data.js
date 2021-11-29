import * as api from './api.js'

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

// get all the books in the repository
export async function getAllBooks() {
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

// get the details of a specific book via id to display in the "details" view
export async function getBookDetails(id) {
    return api.get(`/data/books/${id}`)
}

// adding a book, which automaticaly makes the logged in user its author, also yeah it requres an account, it won't work logged out
export async function addBook(data) {
    return api.post('/data/books', data)
}

// require the account that created the book, otherwise won't work
export async function editBookScreen(id, data) {
    return api.post(`/data/books/${id}`, data)
}

// same as ^^^^
export async function deleteBook(id) {
    return api.del(`/data/books/${id}`)
}

// gets all the current user's books to display in the "my-books" view
export async function myBooks(user_id) {
    return api.get(`/data/books?where=_ownerId%3D%22${user_id}%22&sortBy=_createdOn%20desc`)
}