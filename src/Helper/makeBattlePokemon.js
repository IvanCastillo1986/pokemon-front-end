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
            move1: item.moves[0].move.name,
            move2: item.moves[3].move.name,
        }
        newArr.push(pokemon)
    }
    return newArr
}

module.exports = {makeBattlePokemon}