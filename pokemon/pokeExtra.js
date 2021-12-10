import { removeChildren } from '../utils/index.js'

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json())
  } catch (error) {
    console.error(error)
  }
}

function loadPokemon(offset = 0, limit = 25) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData),
      )
    }
  })
}

function getRandomPokemon() {
  const offset = Math.floor(Math.random() * 1118) + 1 
  const limit = 1
  console.log(offset)
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData),
      )
    }
  })
}  

const randomPokemon = document.querySelector('.randomPokemon')
randomPokemon.addEventListener('click', getRandomPokemon)

const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
loadButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(100, 6)
})

const moreButton = document.querySelector('.morePokemon')
moreButton.addEventListener('click', () => {
  let limit = prompt('How many more Poke do you want?')
  let offset = prompt('At which PokeID should I start loading?')
  loadPokemon(offset, limit)
})

const newButton = document.querySelector('.newPokemon')
newButton.addEventListener('click', () => {
  let pokeName = prompt('What is your Pokename?')
  let pokeHeight = prompt("What is your height in PokeInches?")
  let pokeWeight = prompt("What is your height in Pokelograms?")
  let pokeAbilities = prompt(
    'What are your PokeAbilities? (seperate abilites by commas)',
  )

  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities),
  )
  populatePokeCard(newPokemon)
})


function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    }
  })
}

class Pokemon {
  constructor(name, height, weight, abilities, HP) {
    ;(this.id = 9999),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities)
  }
}

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  const pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () =>
    pokeCard.classList.toggle('is-flipped'),
  )

  const front = populateCardFront(singlePokemon)
  const back = populateCardBack(singlePokemon)

  pokeCard.appendChild(front)
  pokeCard.appendChild(back)
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement('figure')
  pokeFront.className = 'cardFace front'
  const pokeImg = document.createElement('img')
  if(pokemon.id === 9999) {
    pokeImg.src= '../images/pokeball.png'
  } else {
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  }

  const pokeCaption = document.createElement('figcaption')
  pokeCaption.textContent = pokemon.name
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)

  //typesBackground(pokemon, pokeFront)
  return pokeFront
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  console.log(pokeType1, pokeType2)
  card.style.setProperty(
    'background',
    `linear-gradient(${getPokeTypeColor(pokeType1)}, #FFF})`,
  )
}

function getPokeTypeColor(pokeType) {
  let color
  switch (pokeType) {
    case 'grass':
      color = '#00FF00'
      break
    case 'fire':
      color = '#FF0000'
      break
    case 'water':
      color = '#0000FF'
      break
    case 'bug':
      color = '#7FFF00'
      break
    case 'normal':
      color = '#F5F5DC'
      break
    case 'flying':
      color = '#00FFFF'
      break
    case 'poison':
      color = '#C300FF'
      break
    case 'electric':
      color = '#C8FF00'
      break
      case 'psychic':
        color = '#333333'
        break
    default:
      color = '#888888'
  }
}

function populateCardBack(pokemon) {
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    const label = document.createElement('h4')
    label.textContent = 'Abilities:'
    
    const abilityList = document.createElement('ul')
    pokemon.abilities.forEach((abilityItem) => {
      let listItem = document.createElement('li')
      listItem.textContent = abilityItem.ability.name
      abilityList.appendChild(listItem)
    })
    
    

    const label2 = document.createElement('h4')
    label2.textContent = 'Weight:'
    
    const label2Content = document.createElement('p')
    label2Content.textContent = `${pokemon.weight} kgs`
    
    

    const label3 = document.createElement('h4')
    label3.textContent = 'Height:'
    
    const label3Content = document.createElement('p')
    label3Content.textContent =  `${pokemon.height} inches`
    
    pokeBack.appendChild(label)
    pokeBack.appendChild(abilityList)
    pokeBack.appendChild(label2)
    pokeBack.appendChild(label2Content)

    if(pokemon.stats) {
      const pokeHP = document.createElement('h4')
      pokeHP.textContent = `HP:`
      pokeBack.appendChild(pokeHP)
      const pokeHPContent = document.createElement('p')
      pokeHPContent.textContent = `${pokemon.stats[0].base_stat}`
      pokeBack.appendChild(pokeHPContent)
    }

  // add HP and height and weight

    pokeBack.appendChild(label3)
    pokeBack.appendChild(label3Content)

    return pokeBack
    

}