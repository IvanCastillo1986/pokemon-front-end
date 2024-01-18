// This adds the remaining_hp property to every pokemon in an array
const addRemainingHp = (pokemonArr) => {
    return pokemonArr.map(pokemon => {
      pokemon.remaining_hp = pokemon.hp
      return pokemon
    })
}

export { addRemainingHp }
