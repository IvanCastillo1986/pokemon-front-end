import React, { useState, useEffect } from 'react'

import Bench from './Bench'
import Table from './Table'

import './Arena.css'
import {capitalize} from '../Helper/capitalize'



export default function Arena({ yourDeck, opponentDeck }) {
    {/* 
    This component will recieve the Deck component's playerDeck, and it will render a random deck of starter
    pokemon for the AI opponent. 
    Two rows, Player will be on the left, AI on the right.

    AI puts down a random Pokemon.
    Player will choose the Pokemon they'd like to start with.
    All the other Pokemon will be on the bench.

    <Bench>
    <Table>
    */}


    const [myPokemon, setMyPokemon] = useState({})
    const [myBench, setMyBench] = useState([])
    const [enemyPokemon, setEnemyPokemon] = useState({})
    const [enemyBench, setEnemyBench] = useState([])
    const [showIntro, setShowIntro] = useState(true)
    
    useEffect(() => {
        window.document.body.style.backgroundColor = '#88c070'
        window.scrollTo(0, 0)

        return () => {
            window.document.body.style.backgroundColor = ''
        }
    }, [])

    function handleInitialClick(e) {
        const myCurrentPokemon = yourDeck.find(mon => mon.name === e.target.innerText.split(' ').join('-').toLowerCase())
        
        const idx = yourDeck.findIndex(mon => mon.name === myCurrentPokemon.name)
        yourDeck.splice(idx, 1)
        console.log(idx)
        
        setMyPokemon(myCurrentPokemon)
        setMyBench(yourDeck)

        setEnemyPokemon(opponentDeck[0])
        setEnemyBench(opponentDeck.slice(1))

        setShowIntro(false)
    }


    return (
        <div className='Arena'>

            {showIntro ?
            
            <div className='intro'>
                <h1>Welcome to the Arena</h1>
                <p>Your opponent's first Pokemon will be {capitalize(opponentDeck[0].name)}.</p>
                <p>Which Pokemon would you like to start the battle with?</p>
                <div className='buttonDiv'>
                    {yourDeck.map((pokemon) => {
                        return (
                            <button key={pokemon.id} onClick={handleInitialClick}>{capitalize(pokemon.name)}</button>
                            )
                        })}
                </div>
            </div>

            :

            <div className='game'>
                <div className='playerDiv'>
                    <h2>Player 1</h2>
                    <h2>Player 2</h2>
                </div>

                <Table myPokemon={myPokemon} enemyPokemon={enemyPokemon} />
                <Bench myBench={myBench} enemyBench={enemyBench} />
            </div>
            }
            
        </div>
    )
}
