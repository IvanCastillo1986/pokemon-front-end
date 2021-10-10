import React, { useState } from 'react'
import BattleCard from './BattleCard'
import { capitalize } from '../Helper/capitalize'

// Two Pokemon are battling each other side by side
    // When one pokemon has lost, flow goes to the next pair of pokemon to battle
// There is one attack button in the center
// The pokemon with the highest speed attacks first
    // The attack will be based on:    Player 1  -  Player 2
    // remaining_hp = remaining_hp - ((atk * 3) - (def * 2))
// handleClick() is wrapped in setTimeOut function


export default function BattleGrounds({ round, pokemonOne, pokemonTwo }) {

    const [pokemon1, setPokemon1] = useState(pokemonOne)
    const [pokemon2, setPokemon2] = useState(pokemonTwo)

    const pokemon1Attack = () => {
        setPokemon2(prevPokemon => {
            return {...prevPokemon, hp: pokemon2.hp - Math.round(pokemon1.atk / 3)}
        })
    }
    const pokemon2Attack = () => {
        setPokemon1(prevPokemon => {
            return {...prevPokemon, hp: pokemon1.hp - Math.round(pokemon2.atk / 3) }
        })
    }

    const handleClick = () => {
        if (pokemon1.spd > pokemon2.spd) {
            console.log('Pokemon 1 is faster')
            pokemon1Attack()
            pokemon2Attack()
        } else {
            console.log('pokemon2 is faster')
            pokemon2Attack()
            pokemon1Attack()
        }
    }


    return (
        <div className='BattleGrounds'>
            <h2>Round {round + 1}</h2>
            <div className='CardsDiv'>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon1} />
                    {/* <span>Name: {capitalize(pokemon1.name)}</span> */}
                    <span>HP: {pokemon1.hp}</span>
                </div>
                <h2>VS</h2>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon2} />
                    {/* <span>Name: {capitalize(pokemon2.name)}</span> */}
                    <span>HP: {pokemon2.hp}</span>
                </div>
            </div>
            <button onClick={handleClick}>Attack!</button>
            <hr />
        </div>
    )
}

// Player 1 attacks first!
// Zapdos uses Razor-Wind
// Poliwhirl loses * hp
// Poiwhirl attacks!
// Zapdos loses * hp