import React, { useState, useEffect } from 'react'

// Two Pokemon are battling each other side by side
    // When one pokemon has lost, flow goes to the next pair of pokemon to battle
// There is one attack button in the center
// The pokemon with the highest speed attacks first
    // The attack will be based on:    Player 1  -  Player 2
    //  remaining_hp = remaining_hp - ((atk * 3) - (def * 2))
// handleClick() is wrapped in setTimeOut function


export default function Battle({ deck1, deck2 }) {

    // const [pokemon1, setPokemon1] = useState([])
    
    // useEffect(() => {
    //     const arr1 = []
    //     const arr2 = []
    //     if (deck1) {
    //         for (let item of deck1) {
    //             let pokemon = {
    //                 name: item.name,
    //                 hp: item.stats[0].base_stat,
    //                 type: item.types[0].type.name,
    //                 move: item.moves[0].move.name,
    //                 atk: item.stats[1].base_stat,
    //                 def: item.stats[2].base_stat,
    //                 spd: item.stats[5].base_stat
    //             }
    //             arr1.push(pokemon)
    //         }
    //     }
    //     setPokemon1(arr1)
    // }, [])


    return (
        <div>
            <h1>Battle component</h1>
        </div>
    )
}

// Player 1 attacks first!
// Zapdos uses Razor-Wind
// Poliwhirl loses * hp
