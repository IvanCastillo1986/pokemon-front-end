import React, { useState, useEffect } from 'react'

import Bench from './Bench'
import Table from './Table'
import Discard from './Discard'

import './Arena.css'



export default function Arena({ yourDeck, opponentDeck }) {
    /* 
    This component will recieve the user and AI decks created in Deck component.
    This will be the game's parent component.
    Two rows, Player will be on the left, AI on the right.

    AI puts down a random Pokemon.
    Player will choose the Pokemon they'd like to start with.
    All the other Pokemon will be on the bench.

    <Bench>
    <Table>
    */

    const [myPokemon, setMyPokemon] = useState({})
    const [myBench, setMyBench] = useState([])
    const [enemyPokemon, setEnemyPokemon] = useState({})
    const [enemyBench, setEnemyBench] = useState([])
    const [showIntro, setShowIntro] = useState(true)
    const [menuType, setMenuType] = useState('main')
    const [winner, setWinner] = useState(null)
    const [discardPile, setDiscardPile] = useState({ player1Discard: [], player2Discard: [] })
    
    // This changes theme and scrolls to top of page on component mount
    useEffect(() => {
        window.document.body.style.backgroundColor = '#8bac0f'
        window.scrollTo(0, 0)

        return () => {
            window.document.body.style.backgroundColor = ''
        }
    }, [])

    // This function chooses the first Pokemon to battle on click
    function handleInitialClick(e) {
        // match the clicked button name with the pokemon in deck
        const myCurrentPokemon = yourDeck.find(mon => mon.name === e.target.textContent)
        
        // find the idx of chosen pokemon in deck
        const idx = yourDeck.findIndex(mon => mon.name === myCurrentPokemon.name)

        // remove this pokemon from the rest of pokemon in bench
        const bench = yourDeck.filter((pokemon, i) => i !== idx)
        
        setMyPokemon(myCurrentPokemon)
        setMyBench(bench)

        setEnemyPokemon(opponentDeck[0])
        setEnemyBench(opponentDeck.slice(1))

        setShowIntro(false)
    }

    const handlePokemonSwitch = (e) => {
        // save current Pokemon, so that it retains remaining_hp when sent to bench
        const oldPokemon = myPokemon
        
        // set newly clicked Pokemon to variable, which will later get passed into setMyPokemon
        const switchedBenchPokemon = myBench.find(mon => mon.name === e.target.textContent)
        
        // Will pull newPokemon from the bench
        // Will add oldPokemon to the bench

        const myNewBench = myBench.filter(mon => mon.name !== switchedBenchPokemon.name)
        myNewBench.push(oldPokemon)

        // replace old myPokemon with new myPokemon
        // old Pokemon retains current remaining_hp
        setMyPokemon(switchedBenchPokemon)
        setMyBench(myNewBench)
        setMenuType('main')
    }

    const handleNewPokemon = (e) => {
        const clickedPokemon = e.target.textContent

        const switchedBenchPokemon = myBench.find(mon => mon.name === clickedPokemon)
    

        const myNewBench = myBench.filter(mon => {
            return mon.name !== switchedBenchPokemon.name
        })

        setMyPokemon(switchedBenchPokemon)
        setMyBench(myNewBench)
        setMenuType('main')
    }



    return (
        <div className='Arena'>

            {showIntro ?
            
            <div className='intro'>
                <h1>Welcome to the Arena</h1>
                <p>Your opponent's first Pokemon will be {opponentDeck[0].name}.</p>
                <p>Which Pokemon would you like to start the battle with?</p>
                <div className='buttonDiv'>
                    {yourDeck.map((pokemon) => {
                        return (
                            <button key={pokemon.id} onClick={handleInitialClick}>{pokemon.name}</button>
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

                <Table myPokemon={myPokemon} setMyPokemon={setMyPokemon} 
                    enemyPokemon={enemyPokemon} setEnemyPokemon={setEnemyPokemon} 
                    myBenchProp={myBench} enemyBenchProp={enemyBench}  setEnemyBench={setEnemyBench}
                    winner={winner} setWinner={setWinner} 
                    menuType={menuType} setMenuType={setMenuType}
                    handlePokemonSwitch={handlePokemonSwitch} handleNewPokemon={handleNewPokemon}
                    discardPile={discardPile} setDiscardPile={setDiscardPile}
                />

                <Bench myBenchProp={myBench} enemyBenchProp={enemyBench} />
                
                {winner &&
                // When a Pokemon in Table dies, put them in deadMon state, so that their name renders here
                <Discard discardPile={discardPile} />
                }
            </div>
            }
            
        </div>
    )
}
