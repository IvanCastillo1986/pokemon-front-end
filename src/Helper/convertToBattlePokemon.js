const moves = require("./moves")
const moves2 = require("./moves2")


// This function recieves an array of API pokemon, and returns battle-ready Pokemon
const convertToBattlePokemon = (pokemonArr) => {
    const battlePokemon = []

    // This function will return array[] with first two moves that the pokemon learns past lvl 1
    function findFirstTwoLearnedMoves(pokemon) {
        const pokemoves = []
        for (const pokemove of pokemon.moves) {
            if (pokemove.version_group_details[0].level_learned_at > 1) {
                pokemoves.push(pokemove)
            }
            if (pokemoves.length == 2) break
        }
        return pokemoves
    }

    // This loop iterates all pokemon in pokemonArr[] and converts them to battle-ready pokemon
    for (const mon of pokemonArr) {
        const pokemoves = findFirstTwoLearnedMoves(mon)
        
        const pokemon = {
            name: mon.name,
            type: mon.types[0].type.name,
            hp: mon.stats[0].base_stat,
            remaining_hp: mon.stats[0].base_stat,
            atk: mon.stats[1].base_stat,
            def: mon.stats[2].base_stat,
            spd: mon.stats[5].base_stat,
            image: mon.sprites.other.dream_world.front_default,
            move1: pokemoves[0],
            move2: pokemoves[1] ? pokemoves[1] : { name: "struggle", damage: 0, pp: 99, remaining_pp: 99 },
            // WHY ISN'T THIS METHOD WORKING IN REACT?
            pokemonDies: function() {
                return this.remaining_hp = 0
            }
        }
        battlePokemon.push(pokemon)
    }
    return battlePokemon
}


export { convertToBattlePokemon }
// module.exports = {makeBattlePokemon}