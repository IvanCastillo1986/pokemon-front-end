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


export default function BattleGrounds({ round, pokemon1, pokemon2 }) {



    return (
        <div className='BattleGrounds'>
            <h2>Round {round + 1}</h2>
            <div className='CardsDiv'>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon1} />
                    <span>Name: {capitalize(pokemon1.name)}</span>
                    <span>Remaining HP: {pokemon1.hp}</span>
                </div>
                <h2>VS</h2>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon2} />
                    <span>Name: {capitalize(pokemon2.name)}</span>
                    <span>Remaining HP: {pokemon2.hp}</span>
                </div>
            </div>
            <button>Attack!</button>
            <hr />
        </div>
    )
}

// Player 1 attacks first!
// Zapdos uses Razor-Wind
// Poliwhirl loses * hp
// Poiwhirl attacks!
// Zapdos loses * hp