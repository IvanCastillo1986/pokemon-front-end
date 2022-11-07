function listTypes(pokemonArr) {
    let typeArr = []

    for (const pokemon of pokemonArr) {
        for (const item of pokemon.types) {
            if (!typeArr.includes(item.type.name)) typeArr.push(item.type.name)
        }
    }

    return typeArr
}


export { listTypes }