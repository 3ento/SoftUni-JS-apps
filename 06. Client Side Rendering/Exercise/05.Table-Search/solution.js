//imports
import { html, render } from './node_modules/lit-html/lit-html.js'

//search button event listener
document.getElementById('searchBtn').addEventListener('click', search);

//render DOM elements
start();

//render DOM elements function
async function start() {
   const data = await req();

   render(Object.values(data).map(el => template(el)), document.getElementsByTagName('tbody')[0]);
}

//search function (from ./JS Advanced/DOM Introduction)
function search() {
   let search = document.getElementById("searchField").value.toLowerCase();
   const box = document.querySelectorAll(".container tbody tr");

   for (let i = 0; i < box.length; i++) {
      document.querySelectorAll(".container tbody tr")[i].classList.remove("select")
   }

   for (let i = 0; i < box.length; i++) {
      for (let j = 0; j < 3; j++) {
         let el = document.querySelectorAll(".container tbody tr")[i].querySelectorAll("td")[j].textContent
         if (el.toLowerCase().includes(search)) {
            document.querySelectorAll(".container tbody tr")[i].classList.add("select")
            console.log("highlight")
         }
      }
   }
}

//individial element generation
function template(data) {
   return html`
   <tr>
      <td>${data.firstName} ${data.lastName}</td>
      <td>${data.email}</td>
      <td>${data.course}</td>
   </tr>`
}

//GET request
async function req() {
   const res = await fetch('http://localhost:3030/jsonstore/advanced/table')
   return res.json();
}