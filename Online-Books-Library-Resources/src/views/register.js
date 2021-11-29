import { html } from "../lib.js";
import { navigation } from './navBar.js'
import * as api from '../api/api.js'

// template with attached event to prevent autoSubmit and do funcionality
const registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>`;

// render the navigation and render the template with ctx
export function registerPage(ctx) {
    navigation();
    ctx.render(registerTemplate(onSubmit));

    // register the user under the right conditions then redirect back to home
    async function onSubmit(ev) {
        ev.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const password_rep = document.getElementById('password').value.trim();

        if (email == '' || password == '' || password_rep == '') {
            return alert('Fill in all fields please!')
        } else if (password !== password_rep) {
            return alert('Passwords dont match')
        }

        await api.register(email, password);
        ctx.page.redirect('/')
    }
}