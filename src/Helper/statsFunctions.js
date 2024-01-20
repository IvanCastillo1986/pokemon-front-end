const randomNum = (minVal, maxVal) => {
    // NOTE: maxVal is exclusive. So whichever maxVal you'd like to include, add 1 to argument
    return Math.floor(Math.random() * (maxVal - minVal) + minVal)
}

const statFluctuation = (stat, minVal, maxVal) => {
    // randomize the stat between two different values 
    // (ex: speed = spd * .7 and 1.3)
    return randomNum(minVal, maxVal) * stat
}

// This is used for the opponent's Pokemon. It's used for user's Pokemon in back-end separately.
const assignDVs = (pokemon) => {
    // returns DVs object with random DV values from 0-15
    const pokemonDVs = {
        deckId: pokemon.id,
        atkDV: randomNum(0, 16),
        defDV: randomNum(0, 16),
        special_atkDV: randomNum(0, 16),
        special_defDV: randomNum(0, 16),
        speedDV: randomNum(0, 16)
    }
    pokemonDVs.hpDV = assignHpDV(pokemonDVs.atkDV, pokemonDVs.defDV)
    
    return pokemonDVs
}

const assignHpDV = (atkDV, defDV) => {
    return (atkDV % 8) * 2 + (defDV % 8)
}

const raiseStat = (baseStat, dv, level) => {
    const raisedStat = Math.ceil((2 * baseStat + dv) * level / 100 + 5)
    return raisedStat
}

// This gets called upon refresh, because it uses persisted DVs that will not changed.
// To implement this function, first call the DVs for corresponding decks from database.
const calculateRaisedStats = (pokemon, dvs) => {
    /*
        The original formula is:
        Stat = (2 * BaseStat + DV + StatExp) * Level / 100 + 5
        BUT let's do it without StatExp for now. We can add this later if anything:
        Stat = (2 * BaseStat + DV) * Level / 100 + 5
    */
    pokemon.hp = raiseStat(pokemon.hp, dvs.hp_dv, pokemon.lvl)
    pokemon.atk = raiseStat(pokemon.atk, dvs.atk_dv, pokemon.lvl)
    pokemon.def = raiseStat(pokemon.def, dvs.def_dv, pokemon.lvl)
    pokemon.special_atk = raiseStat(pokemon.special_atk, dvs.special_atk_dv, pokemon.lvl)
    pokemon.special_def = raiseStat(pokemon.special_def, dvs.special_def_dv, pokemon.lvl)
    pokemon.speed = raiseStat(pokemon.speed, dvs.speed_dv, pokemon.lvl)
}

// takes in myDeck and pokemonDV or creates opponentDVs here
function raisePokemonStats(deck, pokemonDVs) {

    if (deck[0].pokemonDVs) {
        deck.forEach((pokemon) => {
            calculateRaisedStats(pokemon, pokemon.pokemonDVs)
        })
    } else {
        const opponentDVs = deck.map(pokemon => assignDVs(pokemon))
        deck.forEach((pokemon) => {
            const matchingDvObj = opponentDVs.find(dvObj => dvObj.deckId === pokemon.id)
            calculateRaisedStats(pokemon, matchingDvObj)
        })
    }

    return pokemonDVs
}


// function raisePokemonStats(deck, pokemonDVs) {
//  **old stats raise function    
//     if (pokemonDVs) {
//         deck.forEach((pokemon) => {
//             const matchingDvObj = pokemonDVs.find(dvObj => dvObj.deckId === pokemon.id)
//             calculateRaisedStats(pokemon, matchingDvObj)
//         })
//     } else {
//         const opponentDVs = deck.map(pokemon => assignDVs(pokemon))
//         deck.forEach((pokemon) => {
//             const matchingDvObj = opponentDVs.find(dvObj => dvObj.deckId === pokemon.id)
//             calculateRaisedStats(pokemon, matchingDvObj)
//         })
//     }

//     return pokemonDVs
// }

// When a Pokemon is first assigned when the player registers, a DV is created for each stat.
// This DV (random val from 0-15) is then saved in the back-end.
// The statRaise is based on that stat's hard-coded DV.

module.exports = { randomNum, statFluctuation, assignDVs, assignHpDV, calculateRaisedStats, raisePokemonStats }