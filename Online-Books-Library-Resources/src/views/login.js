import { html } from "../lib.js";
import { navigation } from './navBar.js'
import * as api from '../api/api.js'

const loginTemplate = (onSubmit) => html`
<section id="login-page" class="login">
<form @submit=${onSubmit} id="login-form" action="" method="">
    <fieldset>
        <legend>Login Form</legend>
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
        <input class="button submit" type="submit" value="Login">
    </fieldset>
</form>
</section>`;

// navBar and login render
export function loginPage(ctx) {
    navigation();
    ctx.render(loginTemplate(onSubmit));

    // functionality
    async function onSubmit(ev) {
        ev.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (email == '' || password == '') {
            return alert('Fill in all fields please!')
        }

        await api.login(email, password);
        ctx.page.redirect('/')
    }
}