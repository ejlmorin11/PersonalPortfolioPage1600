import {films} from '../data/films.js'

let filmlist = document.querySelector('#filmlist')

let titleList = document.createElement('ol')

filmlist.appendChild(titleList)

let poster = document.createElement('img')

poster.src = 'https://starwars-visualguide.com/assets/img/films/2.jpg'

filmlist.appendChild(poster)

for (let i = 0; i < films.length; i++) {
    let titleItem = document.createElement('li')
    titleItem.textContent = films[i].title
    titleList.appendChild(titleItem);
}