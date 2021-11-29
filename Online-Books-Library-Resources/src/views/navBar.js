import { render, html } from '../lib.js'
import { getUserData } from '../api/helper.js'
import { logout } from '../api/data.js'

// navigation bar when logged in
function navBarUser(email) {
    render(
        html`<nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
            <!-- Logged-in users -->
            <div id="user">
                <span>Welcome, ${email}</span>
                <a class="button" href="/my-books">My Books</a>
                <a class="button" href="/add-book">Add Book</a>
                <a @click=${logout_func} class="button" href="javascript:void(0)">Logout</a>
            </div>
        </section>
    </nav>`,
        document.getElementById('site-header')
    )
}

// navigation bar when a guest
function navBarGuest() {
    render(
        html`
        <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    <!-- Guest users -->
                    <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>`,
        document.getElementById('site-header')
    )
}

// logout function to prevent autoSubmit and redirect back to home
async function logout_func(ev) {
    ev.preventDefault();
    logout();

    window.location = '/'
}

// exporting the swtich that checks if user is logged in and renders the correct navBar
export async function navigation() {
    if (getUserData() !== null) {
        navBarUser(getUserData().email);
    } else {
        navBarGuest();
    }
}
