import React, { useState, useEffect } from 'react'

// Two Pokemon are battling each other side by side
    // When one pokemon has lost, flow goes to the next pair of pokemon to battle
// There is one attack button in the center
// The pokemon with the highest speed attacks first
    // The attack will be based on:    Player 1  -  Player 2
    //  remaining_hp = remaining_hp - ((atk * 3) - (def * 2))
// handleClick() is wrapped in setTimeOut function
// 


export default function BattleStats({ battleDeck }) {

    const [ pokemon, setPokemon ] = useState([])
    const [ remaining_hp, setRemaining_hp ] = useState(0)
    
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
        setPokemon(arr)
    }, [battleDeck])

    const handleAttack = () => {
        
    }

    return (
        <div>
            {pokemon[0] ? <h3>{pokemon[0].hp}hp - {pokemon[7].hp}hp</h3> : null}
            <button>Attack</button>
        </div>
    )
}
