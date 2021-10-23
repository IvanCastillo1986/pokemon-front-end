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
    const [narration, setNarration] = useState('')
    

    const randomDamage = () => {
        let min = 7
        let max = 13
        return (Math.random() * (max - min) + min)
    }
    const randomSpeed = () => {
        let min = .6
        let max = 1.4
        return (Math.random() * (max - min) + min)
    }

    const pokemon1Attack = () => {
        let atkOutput = pokemon1.atk/2
        let defOutput = pokemon2.def/2
        let totalDamage = Math.round((atkOutput/defOutput) * randomDamage() + pokemon1.move1.damage)
        setPokemon2(prevPokemon => {
            return {...prevPokemon, 
                remaining_hp: pokemon2.remaining_hp - totalDamage
            }
        })
        setNarration('')
        console.log('Random Damage: ', randomDamage())
        console.log('Total damage: ', totalDamage)
    }
    const pokemon2Attack = () => {
        let atkOutput = pokemon2.atk
        let defOutput = pokemon1.def
        let totalDamage = Math.round((atkOutput/defOutput) * randomDamage() + pokemon2.move1.damage)
        setPokemon1(prevPokemon => {
            return {...prevPokemon, 
                remaining_hp: pokemon1.remaining_hp - totalDamage
            }
        })
        console.log('Random Damage: ', randomDamage())
        console.log('Total damage: ', totalDamage)
    }

    const handleClick = () => {
        let pokeAcc1 = pokemon1.spd * randomSpeed()
        let pokeAcc2 = pokemon2.spd * randomSpeed()
        if (pokeAcc1 > pokeAcc2) {
            console.log('Pokemon 1 is faster', randomSpeed())
            pokemon1Attack()
            pokemon2Attack()
        } else {
            console.log('pokemon2 is faster', randomSpeed())
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
                    <span>{capitalize(pokemon1.move1.name)}</span>
                </div>
                <h2>VS</h2>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon2} />
                    <span>Remaining HP: {pokemon2.remaining_hp}</span>
                </div>
            </div>
            <button onClick={handleClick}>Attack!</button>
            <p>{/* 
            Player 1 attacks first!
            Player 1 uses __
            Player 2 loses __ hp
            Player 2 uses __
            Player 1 loses __ hp
            */}</p>
            <hr />
        </div>
    )
}

// Player 1 attacks first!
// Zapdos uses Razor-Wind
// Poliwhirl loses * hp
// Poiwhirl attacks!
// Zapdos loses * hp