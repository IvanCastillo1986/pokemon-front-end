// convertToBattlePokemon(), findFirstTwoLearnedMoves()

// const moves = require("./moves")
// const moves2 = require("./moves2")


// This function recieves an array of API pokemon, and returns battle-ready Pokemon
const convertToBattlePokemon = (pokemonArr) => {
    const battlePokemon = []
    
    // This loop iterates all pokemon in pokemonArr[] and converts them to battle-ready pokemon
    for (const mon of pokemonArr) {
        // const pokemoves = findFirstTwoLearnedMoves(mon)
        const pokemon = {
            name: mon.name,
            id: mon.id,
            type: mon.types[0].type.name,
            hp: mon.stats[0].base_stat,
            remaining_hp: mon.stats[0].base_stat,
            atk: mon.stats[1].base_stat,
            def: mon.stats[2].base_stat,
            spd: mon.stats[5].base_stat,
            image: mon.sprites.other["official-artwork"].front_default,
            move1: mon.twoMoves[0],
            move2: mon.twoMoves[1] || { name: "struggle", damage: 0, pp: 99, remaining_pp: 99 },
            // WHY ISN'T THIS METHOD WORKING IN REACT?
            pokemonDies: function() {
                return this.remaining_hp = 0
            }
        }
        battlePokemon.push(pokemon)

    }
    return battlePokemon
}

// This function will return array[] with first two moves that the pokemon learns past lvl 1
// (This is important because the moves array shows every move a Pokemon can possibly learn - unnecessary)
function findFirstTwoLearnedMoves(pokemon) {
    const pokemoves = []

    if (pokemon.name === 'ditto') {
        return [
            {"move": { "name": "tackle", "url": "https://pokeapi.co/api/v2/move/33/"}},
            pokemon.moves[0],
        ]
    }

    for (const pokemove of pokemon.moves) {
        if (pokemove.version_group_details[0].level_learned_at > 1) {
            pokemoves.push(pokemove)
        }
        if (pokemoves.length === 2) break
    }

    let i = 1
    while (pokemoves.length < 2) {
        for (const pokemove of pokemon.moves) {
            if (pokemove.version_group_details[0].level_learned_at === i && pokemoves.length < 2) {
                pokemoves.push(pokemove)
            }
        }
        i--
    }
    
    return pokemoves
}




export { convertToBattlePokemon, findFirstTwoLearnedMoves }



/*
Pokemon that have 0 moves:

Kakuna (bug-bite, harden)
Metapod (bug-bite, harden)
Raichu ()
Clefable
Abra

Pokemon that have 1 move:

Caterpie - Bug-bite
Weedle - Bug-bite
Wigglytuff
Ninetales - Fire-spin
Arcanine - Extreme-speed
Starmie - Psybeam
Ditto - Transform

*/