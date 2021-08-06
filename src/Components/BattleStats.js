import React, { useState, useEffect } from 'react'



export default function BattleStats({ battleDeck }) {

    const [ newPokemon, setNewPokemon ] = useState([])
    
    useEffect(() => {
        const arr = []
        if (battleDeck) {
            for (let item of battleDeck) {
                let pokemon = {
                    name: item.name,
                    hp: item.stats[0].base_stat,
                    type: item.types[0].type.name,
                    move: item.moves[0].move.name,
                    atk: item.stats[1].base_stat,
                    def: item.stats[2].base_stat,
                    spd: item.stats[5].base_stat
                }
                arr.push(pokemon)
                console.log(arr)
            }
        }
        setNewPokemon(arr)
    }, [battleDeck])


    return (
        <div>
            <p>Battle Stats</p>
            {/* <p>{pokeStats.hp}</p> */}
        </div>
    )
}



















// const [ pokeStats, setPokeStats ] = useState({
//     name: pokemon.name,
//     hp: pokemon.stats[0].base_stat,
//     type: pokemon.types[0].type.name,
//     atk: pokemon.stats[1].base_stat,
//     def: pokemon.stats[2].base_stat,
//     spd: pokemon.stats[5].base_stat
// })
// const [ remaining_hp, setRemaining_hp ] = useState(pokeStats.hp)