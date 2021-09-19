import React from 'react'
import BattleCard from './BattleCard'
import { capitalize } from '../Helper/capitalize'

// Two Pokemon are battling each other side by side
    // When one pokemon has lost, flow goes to the next pair of pokemon to battle
// There is one attack button in the center
// The pokemon with the highest speed attacks first
    // The attack will be based on:    Player 1  -  Player 2
    // remaining_hp = remaining_hp - ((atk * 3) - (def * 2))
// handleClick() is wrapped in setTimeOut function


export default function Battle({ round, pokemon1, pokemon2 }) {



    return (
        <div>
            <h3>Round {round + 1}</h3>
            <BattleCard pokemon={pokemon1} />
            <span>Name: {capitalize(pokemon1.name)}</span> VS <span>Name: {capitalize(pokemon2.name)}</span><br />
            <span>HP: {pokemon1.hp}</span> - <span>HP: {pokemon2.hp}</span><br />
            <button>Attack!</button>
        </div>
    )
}

// Player 1 attacks first!
// Zapdos uses Razor-Wind
// Poliwhirl loses * hp
// Poiwhirl attacks!
// Zapdos loses * hp