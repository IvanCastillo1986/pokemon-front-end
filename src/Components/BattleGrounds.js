import React, { useState, useEffect } from 'react'
import BattleCard from './BattleCard'
import { capitalize } from '../Helper/capitalize'


export default function BattleGrounds({ round, pokemonOne, pokemonTwo }) {

    const [pokemon1, setPokemon1] = useState(pokemonOne)
    const [pokemon2, setPokemon2] = useState(pokemonTwo)
    const [player1, setPlayer1] = useState({
        ready: false,
        move: null,
        moveSwitch: null,
    })
    const [player2, setPlayer2] = useState({
        ready: false,
        move: null,
        moveSwitch: null,
    })
    const [narration, setNarration] = useState({
        text1: ``,
        text2: ``,
        text3: ``,
    })
    
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
        // Decrements PP
        setPokemon1(prevPokemon => {
            return { ...prevPokemon, [player1.moveSwitch]: {...prevPokemon.move1, remaining_pp: pokemon1[player1.moveSwitch].remaining_pp - 1} }
        })
        // Stops HP at 0
        if (pokemon2.remaining_hp - totalDamage <= 0) {
            setPokemon2({ ...pokemon2, remaining_hp: 0 })
            return
        }
        setPokemon2(prevPokemon => {
            return {...prevPokemon, 
                remaining_hp: pokemon2.remaining_hp - totalDamage
            }
        })
    }
    const pokemon2Attack = () => {
        let atkOutput = pokemon2.atk
        let defOutput = pokemon1.def
        let totalDamage = Math.round((atkOutput/defOutput) * randomDamage() + pokemon2.move1.damage)
        let currentMove = player2.moveSwitch
        // Decrements PP
        // setPokemon2({...pokemon2, move1: {...pokemon2.move1, remaining_pp: pokemon2.move1.remaining_pp - 1}})
        setPokemon2(prevPokemon => {
            return {...prevPokemon, [currentMove]: {...pokemon2[currentMove], remaining_pp: pokemon2[currentMove].remaining_pp - 1}}
        })
        // Stops HP at 0
        if (pokemon1.remaining_hp - totalDamage <= 0) {
            setPokemon1({ ...pokemon1, remaining_hp: 0 })
            return
        }
        setPokemon1(prevPokemon => {
            return {...prevPokemon, 
                remaining_hp: pokemon1.remaining_hp - totalDamage
            }
        })
    }
    
    const executeAttacks = () => {
        let pokeSpd1 = pokemon1.spd * randomSpeed()
        let pokeSpd2 = pokemon2.spd * randomSpeed()
        if (pokeSpd1 > pokeSpd2) {
            console.log('Pokemon 1 is faster', randomSpeed())
            pokemon1Attack()
            setNarration(prevNarration => {return { ...prevNarration, text1: `${capitalize(pokemon1.name)} attacks first!` }})
            setNarration(prevNarration => {return { ...prevNarration, text2: `${capitalize(pokemon1.name)} uses ${capitalize(player1.move.name)}` }})
            // setNarration({ ...narration, text2: `${capitalize(pokemon1.name)} uses ${capitalize(pokemon1.move1.name)}` }) // why doesn't this work? Why does it delete the rest of narration object?
            pokemon2Attack()
            setNarration(prevNarration => {return { ...prevNarration, text3: `${capitalize(pokemon2.name)} uses ${capitalize(player2.move.name)}` }})
            setPlayer1({ ready: false, move: null })
            setPlayer2({ ready: false, move: null })
        } else {
            console.log('pokemon2 is faster', randomSpeed())
            pokemon2Attack()
            setNarration(prevNarration => {return { ...prevNarration, text1: `${capitalize(pokemon2.name)} attacks first!` }})
            setNarration(prevNarration => {return { ...prevNarration, text2: `${capitalize(pokemon2.name)} uses ${capitalize(player2.move.name)}` }})
            pokemon1Attack()
            setNarration(prevNarration => {return { ...prevNarration, text3: `${capitalize(pokemon1.name)} uses ${capitalize(player2.move.name)}` }})
            setPlayer1({ ready: false, move: null })
            setPlayer2({ ready: false, move: null })
        }

    }
    const setMove1 = (move, currentMove) => {
        setPlayer1({
            ready: true,
            move: move,
            moveSwitch: currentMove
        })
    }
    const setMove2 = (move, currentMove) => {
        setPlayer2({
            ready: true,
            move: move,
            moveSwitch: currentMove
        })
    }

    useEffect(() => {
        if (player1.ready && player2.ready) {
            executeAttacks()
        }
    }, [player1, player2])


    return (
        <div className='BattleGrounds'>
            <h2>Round {round}</h2>
            <div className='CardsDiv'>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon1} />
                    <span>Remaining HP: {pokemon1.remaining_hp}</span>
                    <button onClick={() => setMove1(pokemon1.move1, 'move1')}>
                        {capitalize(pokemon1.move1.name)} &nbsp; 
                        PP: {pokemon1.move1.remaining_pp}/{pokemon1.move1.pp}
                    </button>
                    <button onClick={() => setMove1(pokemon1.move2, 'move2')}>
                        {capitalize(pokemon1.move2.name)} &nbsp; 
                        PP: {pokemon1.move2.remaining_pp}/{pokemon1.move2.pp}
                    </button>
                </div>
                <h2>VS</h2>
                <div className='PlayerDiv'>
                    <BattleCard pokemon={pokemon2} />
                    <span>Remaining HP: {pokemon2.remaining_hp}</span>
                    <button onClick={() => setMove2(pokemon2.move1, 'move1')}>
                        {capitalize(pokemon2.move1.name)} &nbsp; 
                        PP: {pokemon2.move1.remaining_pp}/{pokemon2.move1.pp}
                    </button>
                    <button onClick={() => setMove2(pokemon2.move2, 'move2')}>
                        {capitalize(pokemon2.move2.name)} &nbsp; 
                        PP: {pokemon2.move2.remaining_pp}/{pokemon2.move2.pp}
                    </button>
                </div>
            </div>
            <div className='TextDiv'>
                <span>{narration.text1}</span>
                <span>{narration.text2}</span>
                <span>{narration.text3}</span>
                {/* 
                Player 1 attacks first!
                Player 1 uses __
                Player 2 loses __ hp
                Player 2 uses __
                Player 1 loses __ hp
                */}
            </div>
            <hr />
        </div>
    )
}

// Each player has a button to choose a move
// Both players choose a move
    // setMove()
    // This sets both players to be ready
// When both players are ready, both moves are executed
    // useEffect()
        // executeAttacks()
            // The fastest pokemon attacks first, and then the second Pokemon attacks
        // Both player objects are reset