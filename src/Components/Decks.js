import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
import BattleStats from './BattleStats'
import '../Pages/RandomDeck.css'



export default function Deck() {

    const [ deck1, setDeck1 ] = useState([])
    const [ deck2, setDeck2 ] = useState([])
    const [ battleDeck, setBattleDeck ] = useState()
    
    
    const randomNum = () => {
        return Math.floor(Math.random() * 151)
    }
    
    const getDeck = async () => {
        const arr = []
        for (let i = 1; i <= 14; i++) {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum()}`)
            .then((res) => {
                arr.push(res.data)
            })
        }
        setDeck1(arr.slice(0, 7))
        setDeck2(arr.slice(7))

        setBattleDeck(arr)
    }

    useEffect(() => {
        getDeck()
    }, [])

    return (
        <div className='Decks'>
            <section className='Deck1'>
                <h2>Player 1</h2>
                {deck1.length === 7  ?  
                deck1.map(pokemon => {return (
                    <div>
                        <Card key={pokemon.name} pokemon={pokemon}/> 
                    </div>
                )})  :  
                <h2>Loading Deck 1...</h2>}
            </section>
            <section>
                <h2>Battle Stats</h2>
                <BattleStats battleDeck={battleDeck} />
            </section>
            <section className='Deck2'>
                <h2>Player 2</h2>
                {deck2.length === 7  ?  
                deck2.map(pokemon => {return (
                    <div>
                        <Card key={pokemon.name} pokemon={pokemon}/>
                    </div>
                )})  :  
                <h2>Loading Deck 2...</h2>}
            </section>
        </div>
    )
}

// remaining_HP variable for each Pokemon under each card.
// Each pokemon is an object with different stats.
// On first attack, the opposing Player's Pokemon is going to lose HP based on:
    // Assuming his spd is higher, Player 1 goes first
    // Player 1's atk 
    // Player 2's def
    //  Player1      Player2
    // (atk * 2) - def  =  hp

