const randomPokemon = document.querySelector('.randomPokemon')
randomPokemon.addEventListener('click', getRandomPokemon)

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


  const pokeHP = document.createElement('h4')
  pokeHP.textContent = `HP: ${pokemon.stats[0].base_stat}`
  pokeBack.appendChild(pokeHP)
  const pokeHPContent = document.createElement('p')
  pokeHPContent.textContent = `${pokemon.stats[0].base_stat}`
  return pokeBack