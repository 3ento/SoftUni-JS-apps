import { page, render } from '../lib.js'
import { logout } from '../api/data.js'
import { getUserData } from '../api/helper.js'

const root = document.querySelector('main');

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

export async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}

export function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('logoutBtn').addEventListener('click', onLogout);

        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }
}
