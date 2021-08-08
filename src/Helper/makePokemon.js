const makePokemon = (arr) => {
    let newArr = []
    for (let item of arr) {
        let pokemon = {
            name: item.name,
            type: item.types[0].type.name,
            hp: item.stats[0].base_stat,
            atk: item.stats[1].base_stat,
            def: item.stats[2].base_stat,
            spd: item.stats[5].base_stat
        }
        newArr.push(pokemon)
    }
    return newArr
}

module.exports = {makePokemon}