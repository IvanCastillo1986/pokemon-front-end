import React, { useState, useEffect } from 'react'
import BattleCard from '../Components/BattleCard'
import { capitalize } from '../Helper/capitalize'


export default function BattleGrounds({ round, pokemonOne, pokemonTwo }) {

    const [pokemon1, setPokemon1] = useState(pokemonOne)
    const [pokemon2, setPokemon2] = useState(pokemonTwo)
    const [winner, setWinner] = useState([])
    
    const [player1, setPlayer1] = useState({
        ready: false, move: null, moveSwitch: null,
    })
    const [player2, setPlayer2] = useState({
        ready: false, move: null, moveSwitch: null,
    })

    const [narration, setNarration] = useState({
        text1: ``, text2: ``, text3: ``, text4: ``
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
    const decrementPP1 = (move) => {
        setPokemon1(prevPokemon => {
            return { ...prevPokemon, [move]: {...prevPokemon[move], remaining_pp: pokemon1[move].remaining_pp - 1} }
        })
    }
    const decrementPP2 = (move) => {
        setPokemon2(prevPokemon => {
            return { ...prevPokemon, [move]: {...prevPokemon[move], remaining_pp: pokemon2[move].remaining_pp - 1} }
        })
    }

    // if pokemon.hp <= 0
    const pokemonDies = (pokemon) => {

        if (pokemon.name === pokemon1.name) {
            setPokemon1(prevPokemon => {return {...prevPokemon, remaining_hp: 0}})
        } else if (pokemon.name === pokemon2.name) {
            setPokemon2(prevPokemon => {return {...prevPokemon, remaining_hp: 0}})
        }
        setNarration({...narration, text4: <span>{capitalize(pokemon.name).toUpperCase()} has fainted</span>})
        // 'Pokemon has fainted'
        // Pokemon can no longer attack
        // New Pokemon is added to the bench (at top of Page)
            // This doesn't need to show actual Pokemon, could be an element that holds the names of Pokemon who are still alive
            // This should be in parent component Decks
    }

    const pokemonAttack = () => {
        let fastPokemon = pokemon1
        let slowPokemon = pokemon2
        let fastPlayer = player1
        let slowPlayer = player2
        let player1Damage = Math.round(((fastPokemon.atk/2) / (slowPokemon.def/2)) * randomDamage() + fastPokemon[player1.moveSwitch].damage)
        let player2Damage = Math.round(((slowPokemon.atk/2) / (fastPokemon.def/2)) * randomDamage() + slowPokemon[player2.moveSwitch].damage)
        
        if (pokemon1.remaining_hp <= player2Damage) {
            // return pokemonDies(pokemon1)
            // WHY ISN'T THIS METHOD WORKING IN REACT???
            // setPokemon1(pokemon1.pokemonDies())
            pokemon1.pokemonDies()
            setPokemon1(pokemon1)
        } else if (pokemon2.remaining_hp <= player1Damage) {
            // return pokemonDies(pokemon2)
            // WHY ISN'T THIS METHOD WORKING IN REACT???
            // setPokemon2(pokemon2.pokemonDies())
            pokemon2.pokemonDies()
        }

        if ((fastPokemon.spd * randomSpeed()) > (slowPokemon.spd * randomSpeed())) {
            setPokemon2(prevPokemon => {
                return {...prevPokemon, remaining_hp: prevPokemon.remaining_hp - player1Damage}
            })
            decrementPP1(player1.moveSwitch)
        } else {
            fastPlayer = player2
            slowPlayer = player1
            fastPokemon = pokemon2;
            slowPokemon = pokemon1;
            setPokemon1(prevPokemon => {
                return {...prevPokemon, remaining_hp: prevPokemon.remaining_hp - player2Damage}
            })
            decrementPP2(player2.moveSwitch)
            if (pokemon1.remaining_hp <= 0) {
                pokemonDies(pokemon1)
            }
        }
        setNarration(prevNarration => {return { ...prevNarration, text1: <span>{capitalize(fastPokemon.name.toUpperCase())} &nbsp; attacks &nbsp; first!</span> }})
        setNarration(prevNarration => {return { ...prevNarration, text2: <span>{capitalize(fastPokemon.name.toUpperCase())} &nbsp; uses &nbsp; {capitalize(fastPlayer.move.name.toUpperCase())}</span> }})

        if (fastPlayer === player1) {
            setPokemon1(prevPokemon => {
                return {...prevPokemon, remaining_hp: prevPokemon.remaining_hp - player2Damage}
            })
            decrementPP2(player2.moveSwitch)
        } else {
            setPokemon2(prevPokemon => {
                return {...prevPokemon, remaining_hp: prevPokemon.remaining_hp - player1Damage}
            })
            decrementPP1(player1.moveSwitch)
        }
        setNarration(prevNarration => {return { ...prevNarration, text3: <span>{capitalize(slowPokemon.name.toUpperCase())} &nbsp; uses &nbsp; {capitalize(slowPlayer.move.name.toUpperCase())}</span> }})
        setPlayer1({ ready: false, move: null })
        setPlayer2({ ready: false, move: null })
    }
    
    const setMove1 = (move, currentMove) => {
        setPlayer1({ ready: true, move: move, moveSwitch: currentMove })
    }
    const setMove2 = (move, currentMove) => {
        setPlayer2({ ready: true, move: move, moveSwitch: currentMove })
    }

    useEffect(() => {
        if (player1.ready && player2.ready) {
            pokemonAttack()
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
                <div className='TextDiv'>
                    {narration.text1}
                    {narration.text2}
                    {narration.text3}
                    {narration.text4}
                </div>
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







        // const pokemon1Attack = () => {
        //     let currentMove = player1.moveSwitch
        //     let atkOutput = pokemon1.atk/2
        //     let defOutput = pokemon2.def/2
        //     let totalDamage = Math.round((atkOutput/defOutput) * randomDamage() + pokemon1[currentMove].damage)
        //     // Decrements PP
        //     // Stops HP at 0
        //     if (pokemon2.remaining_hp - totalDamage <= 0) {
        //         decrementPP1(currentMove)
        //         setPokemon2({ ...pokemon2, remaining_hp: 0 })
        //         return
        //     } else {
        //         decrementPP1(currentMove)
        //         setPokemon2(prevPokemon => {
        //             return {...prevPokemon, 
        //                 remaining_hp: pokemon2.remaining_hp - totalDamage
        //             }
        //         })
        //     }
        // }
        // const pokemon2Attack = () => {
        //     let currentMove = player2.moveSwitch
        //     let atkOutput = pokemon2.atk / 2
        //     let defOutput = pokemon1.def / 2
        //     let totalDamage = Math.round((atkOutput/defOutput) * randomDamage() + pokemon2[currentMove].damage)
        //     // Decrements PP
        //     // Stops HP at 0
        //     if (pokemon1.remaining_hp - totalDamage <= 0) {
        //         decrementPP2(currentMove)
        //         setPokemon1({ ...pokemon1, remaining_hp: 0 })
        //         return
        //     } else {
        //         decrementPP2(currentMove)
        //         setPokemon1(prevPokemon => {
        //             return {...prevPokemon, 
        //                 remaining_hp: pokemon1.remaining_hp - totalDamage
        //             }
        //         })
        //     }
        // }

        // const executeAttacks = () => {
        //     let pokeSpd1 = pokemon1.spd * randomSpeed()
        //     let pokeSpd2 = pokemon2.spd * randomSpeed()
        //     if (pokeSpd1 > pokeSpd2) {
        //         console.log('Pokemon 1 is faster', randomSpeed())
        //         pokemon1Attack()
        //         setNarration(prevNarration => {return { ...prevNarration, text1: <span>{capitalize(pokemon1.name.toUpperCase())} &nbsp; attacks &nbsp; first!</span> }})
        //         setNarration(prevNarration => {return { ...prevNarration, text2: <span>{capitalize(pokemon1.name.toUpperCase())} &nbsp; uses &nbsp; {capitalize(player1.move.name.toUpperCase())}</span> }})
        //         // setNarration({ ...narration, text2: `${capitalize(pokemon1.name)} uses ${capitalize(pokemon1.move1.name)}` }) // why doesn't this work? Why does it delete the rest of narration object?
        //         pokemon2Attack()
        //         setNarration(prevNarration => {return { ...prevNarration, text3: <span>{capitalize(pokemon2.name.toUpperCase())} &nbsp; uses &nbsp; {capitalize(player2.move.name.toUpperCase())}</span> }})
        //         setPlayer1({ ready: false, move: null })
        //         setPlayer2({ ready: false, move: null })
        //     } else {
        //         console.log('pokemon2 is faster', randomSpeed())
        //         pokemon2Attack()
        //         setNarration(prevNarration => {return { ...prevNarration, text1: <span>{capitalize(pokemon2.name.toUpperCase())} &nbsp; attacks &nbsp; first!</span> }})
        //         setNarration(prevNarration => {return { ...prevNarration, text2: <span>{capitalize(pokemon2.name.toUpperCase())} &nbsp; uses &nbsp; {capitalize(player2.move.name.toUpperCase())}</span> }})
        //         pokemon1Attack()
        //         setNarration(prevNarration => {return { ...prevNarration, text3: <span>{capitalize(pokemon1.name.toUpperCase())} &nbsp; uses &nbsp; {capitalize(player2.move.name.toUpperCase())}</span> }})
        //         setPlayer1({ ready: false, move: null })
        //         setPlayer2({ ready: false, move: null })
        //     }
        // }