const basicPokemonIds = [10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,
60,63,66,69,72,74,77,79,81,84,86,88,90,92,96,98,100,102,104,109,111,116,118,120,129,133,138,140,147]

// This function creates an array of random basic pokemon ids
const createRandomPokemonIds = (numOfPokemon) => {
    const randomPokemonArr = []
    const eliminationArr = [...basicPokemonIds]

    for (let i = 0; i < numOfPokemon; i++) {
        const randomNum = eliminationArr[Math.floor(Math.random() * (eliminationArr.length))]

        randomPokemonArr.push(randomNum)
        eliminationArr.splice(randomNum, 1)
    }
    
    return randomPokemonArr
}


module.exports = { createRandomPokemonIds }