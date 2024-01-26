// This adds the remaining_hp property to every pokemon in an array
const addRemainingHp = (pokemonArr, hpInput) => {
    return pokemonArr.map(pokemon => {
      pokemon.remaining_hp = hpInput ? hpInput : pokemon.hp
      return pokemon
    })
}

export { addRemainingHp }
