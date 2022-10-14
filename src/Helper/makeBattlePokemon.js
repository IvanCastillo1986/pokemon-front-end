const moves = require("./moves")
const moves2 = require("./moves2")
// import { moves } from "./moves.js"
// import { moves2 } from "./moves2.js"


const makeBattlePokemon = (arr) => {
    let newArr = []
    for (let item of arr) {
        let pokemon = {
            name: item.name,
            type: item.types[0].type.name,
            hp: item.stats[0].base_stat,
            remaining_hp: item.stats[0].base_stat,
            atk: item.stats[1].base_stat,
            def: item.stats[2].base_stat,
            spd: item.stats[5].base_stat,
            image: item.sprites.other.dream_world.front_default,
            move1: moves.moves[item.moves[0].move.name],
            move2: item.moves[1] ? moves2.moves2[item.moves[1].move.name] : { name: "struggle", damage: 0, pp: 99, remaining_pp: 99 },
            // WHY ISN'T THIS METHOD WORKING IN REACT?
            pokemonDies: function() {
                return this.remaining_hp = 0
            },
            reduceHP: function() {
                return this.remaining_hp = this.remaining_hp - 20
            }
        }
        newArr.push(pokemon)
    }
    return newArr
}


export { makeBattlePokemon }
// module.exports = {makeBattlePokemon}