import { page } from './lib.js'
import decorateContext from './middlewares/decorateContext.js'
import { dashboard } from './views/dashboard.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js';
import { addBookPage } from './views/add_book.js'
import { myBooksPage } from './views/my_books.js'
import { onDetailsPage } from './views/onDetails.js'
import { onEditPage } from './views/onEdit.js'


page(decorateContext); // tupa wrapper funkiq deto viktor polzva i ne moga da izmislq kak da ne q
page('/', dashboard);
page('/login', loginPage)
page('/register', registerPage)
page('/add-book', addBookPage)
page('/my-books', myBooksPage)
page('/details/:id', onDetailsPage)
page('/edit-book/:id', onEditPage)

page.start();