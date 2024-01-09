function handleAddToSharedExp(deckId, expIdSet) {
    expIdSet.add(deckId)
    return expIdSet
}

function handleRemoveFromSharedExp(deckId, expIds) {
    const newSharedExpIds = [...expIds].filter(id => id !== deckId)
    return new Set(newSharedExpIds)
}

function calculateSharedExp(totExp, expIds) {
    return Math.floor(totExp / expIds.size)
}

function getPokeNamesFromId(expIds, playerDeck) {
    const namesArr = []
    expIds.forEach((id) => {
        playerDeck.forEach(pokemon => {
            if (pokemon.id === id) namesArr.push(pokemon.name)
        })
    })
    return namesArr
}

const lvl = 5
function expRequiredForLvlUp(lvl) {
  return Math.floor(Math.pow((lvl + 1), 3) / 5)
}

console.log(expRequiredForLvlUp(lvl))

module.exports = { 
    handleAddToSharedExp, handleRemoveFromSharedExp, calculateSharedExp, getPokeNamesFromId, 
    expRequiredForLvlUp 
}