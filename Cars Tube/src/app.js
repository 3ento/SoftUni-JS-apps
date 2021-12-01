import { decorateContext, updateUserNav } from './middlewares/middlewareFunctions.js'
import { page } from './lib.js'

import { loginPage } from './views/loginPage.js'
import { registerPage } from './views/registerPage.js'
import { homePage } from './views/homePage.js'
import { allListingsPage } from './views/allListings.js'
import { carListingPage } from './views/createCarListing.js'
import { detailsPage } from './views/details.js'
import { myListingsPage } from './views/myListing.js'
import { editPage } from './views/edit.js'
import { searchPage } from './views/search.js'

page(decorateContext);
page('/login', loginPage);
page('/register', registerPage);
page('/', homePage);
page('/listings', allListingsPage)
page('/create-listing', carListingPage)
page('/details/:id', detailsPage)
page('/my-listings', myListingsPage)
page('/edit/:id', editPage)
page('/search', searchPage)

page.start();
updateUserNav();

