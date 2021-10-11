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

    const randomAttack = (min, max) => {
        min = .7
        max = 1.3
        return Math.random() * (max - min) + min
    }

    const pokemon1Attack = () => {
        let atkOutput = pokemon1.atk/2
        let defOutput = pokemon2.def/2
        setPokemon2(prevPokemon => {
            return {...prevPokemon, remaining_hp: Math.round(pokemon2.remaining_hp - ((atkOutput/defOutput) * randomAttack()))}
        })
    }
    const pokemon2Attack = () => {
        let atkOutput = pokemon2.atk
        let defOutput = pokemon1.def
        setPokemon1(prevPokemon => {
            return {...prevPokemon, remaining_hp: Math.round(pokemon1.remaining_hp - ((atkOutput/defOutput) * randomAttack()))}
        })
        console.log(randomAttack() * 10)
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
                    <span>Remaining HP: {pokemon1.remaining_hp}</span>
                </div>
                <h2>VS</h2>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon2} />
                    <span>Remaining HP: {pokemon2.remaining_hp}</span>
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