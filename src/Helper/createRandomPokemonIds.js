const basicPokemonIds = [10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,
60,63,66,69,72,74,77,79,81,84,86,88,90,92,96,98,100,102,104,109,111,116,118,120,129,133,138,140,147]

// This function creates an array of random basic pokemon ids with no duplicates
const createRandomPokemonIds = (numOfPokemon) => {
    const randomPokeSet = new Set()

    while (randomPokeSet.size < numOfPokemon) {
        const randomNum = Math.floor(Math.random() * (basicPokemonIds.length))

        randomPokeSet.add(basicPokemonIds[randomNum])
    }

    return [...randomPokeSet]
}


module.exports = { createRandomPokemonIds }