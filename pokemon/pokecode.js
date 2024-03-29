import { removeChildren } from '../utils/index.js'

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json())
  } catch (error) {
    console.error(error)
  }
}

function loadPokemon(offset = 1, limit = 25) {
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

// random pokemon code

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
  loadPokemon(0, 50)
  setTimeout(() => loadPokemon(51, 50), 1000)
})

// How to get all

const allPokemon = await getAllSimplePokemon()

async function getAllSimplePokemon() {
  const allPokemon = []
  await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`,
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) => {
        const mappedPokemon = {
          abilities: pokeData.abilities,
          height: pokeData.height,
          id: pokeData.id,
          name: pokeData.name,
          types: pokeData.types,
          weight: pokeData.weight,
        }
        allPokemon.push(mappedPokemon)
      })
    }
  })
  return allPokemon
}

function getAllPokemonByType(type) {
  return allPokemon.filter((pokemon) => pokemon.types[0].type.name == type)
}

const sortButton = document.querySelector('.sortButton')
sortButton.addEventListener('click', () => {
  const allByType = getAllPokemonByType('water')
  allByType.forEach((item) => populatePokeCard(item))
})


const typeSelector = document.querySelector('#typeSelector')
typeSelector.addEventListener('change', (event) => {
  const usersTypeChoice = event.target.value.toLowerCase()
  const allByType = getAllPokemonByType(usersTypeChoice)
  removeChildren(pokeGrid)
  allByType.forEach((item) => populatePokeCard(item))
})

/* First, get a reference to the pokemon choice button
Second, add an event listener on click
Third, use getAPIData with a URL like this https://pokeapi.co/api/v2/${promptedNameOrId}
Fourth, populatePokeCard with the pokemon data retrieved */

const moreButton = document.querySelector('.morePokemon')
moreButton.addEventListener('click', () => {
  let limit = prompt('How many more Pokemon should I load?')
  let offset = prompt('At which Pokemon ID should I start loading?')
  loadPokemon(offset, limit)
})

const newButton = document.querySelector('.newPokemon')
newButton.addEventListener('click', () => {
  let pokeName = prompt('What is the Pokename?')
  let pokeHeight = prompt("What is the height in PokeInches?")
  let pokeWeight = prompt("What is the weight in Pokelograms?")
  let pokeAbilities = prompt(
    'What are your Pokabilities? (separate abilities by commas)',
  )
  let pokeTypes = prompt(
    "What are your Poketypes? (up to 2 types separated by a space)",
  )
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities),
    getTypesArray(pokeTypes),
  )
  removeChildren(pokeGrid)
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

function getTypesArray(spacedString) {
  let tempArray = spacedString.split(' ')
  return tempArray.map((typeName) => {
    return {
      type: {
        name: typeName,
      },
    }
  })
}

class Pokemon {
  constructor(name, height, weight, abilities, types) {
    ;(this.id = 9999),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types)
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
  if (pokemon.id === 9999) {
    pokeImg.src = '../images/blobFishPokemon.png'
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  }

  const pokeCaption = document.createElement('figcaption')

  //pokeCaption.textContent = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
  pokeCaption.textContent = pokemon.name
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)

  return pokeFront
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  console.log(pokeType1, pokeType2)
  if (!pokeType2) {
    card.style.setProperty('background', getPokeTypeColor(pokeType1))
  } else {
    card.style.setProperty(
      'background',
      `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(
        pokeType2,
      )})`,
    )
  }
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
      color = '#B7DD00'
      break
    case 'psychic':
      color = 'pink'
      break
    case 'ground':
      color = 'brown'
      break
    default:
      color = '#888888'
  }
  return color
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

  const typeslist = document.createElement('h4')
  typeslist.textContent = 'Type'
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement('p')
    typeItem.textContent = pokeType.type.name
    typeslist.appendChild(typeItem)
  })
  pokeBack.appendChild(typeslist)

  typesBackground(pokemon, pokeBack)

  return pokeBack
  

}