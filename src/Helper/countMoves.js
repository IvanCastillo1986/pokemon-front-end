const listMoves = (pokemonArr) => {
    const movesArr = []

    for (const pokemon of pokemonArr) {
        for (const skill of pokemon.twoMoves) {
            if (!movesArr.includes(skill.move.name)) movesArr.push(skill.move.name)
        }
    }

    return movesArr
}

const countInstanceOfMove = (pokemonArr) => {
    const movesObj = {}

    // iterates through each pokemon
    for (const pokemon of pokemonArr) {
        // const arr = [move1.move.name, move2.move.name]
        // checks move1 and move2
        for (const skill of pokemon.twoMoves) {
            // if add 1 to move
            if (movesObj.hasOwnProperty(skill.move.name)) movesObj[skill.move.name]++
            // else a move doesn't exist in obj, create move with 1 count
            else movesObj[skill.move.name] = 1
        }
    }

    return movesObj
}



// This will break the build, because I was trying to mix Node.js style exports with ES6 exports (which is used by React)
// This is a Node.js export
// module.exports = { countSkill }
export { listMoves, countInstanceOfMove }