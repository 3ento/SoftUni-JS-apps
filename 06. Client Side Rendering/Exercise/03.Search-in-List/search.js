//imports
import { towns } from './towns.js'
import { html, render } from './node_modules/lit-html/lit-html.js'

//create ul container for the town list
document.getElementById('towns').appendChild(document.createElement('ul'));
const container = document.querySelector('#towns ul');

//add event listener to the "Search" button
document.getElementsByTagName('button')[0].addEventListener('click', search)

// start
render(towns.map(el => html`<li>${el}</li>`), container);

//search through the list of towns
function search() {
   const search = document.getElementById("searchText").value;
   const list = document.querySelectorAll("#towns ul li");
   let count = 0;

   for (let i = 0; i < list.length; i++) {
      if (list[i].textContent.includes(search)) {
         list[i].classList.add('active');
         count++;
      } else {
         list[i].classList.remove('active');
      }
   }
   document.getElementById("result").textContent = `${count} matches found`
}
