import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
import Battle from './Battle'
import '../Pages/RandomDeck.css'
import { makePokemon } from '../Helper/makePokemon.js'



export default function Deck() {

    const [ deck1, setDeck1 ] = useState([])
    const [ deck2, setDeck2 ] = useState([])
    
    
    const randomNum = () => {
        return Math.floor(Math.random() * 151)
    }
    const getDeck = async () => {
        const arr1 = []
        const arr2 = []
        const arr = []
        for (let i = 1; i <= 14; i++) {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum()}`)
            .then((res) => {
                if (i % 2 !== 0) {
                    arr1.push(res.data)
                } else {
                    arr2.push(res.data)
                }
                arr.push(res.data)
            })
        }

        setDeck1(makePokemon(arr1))
        setDeck2(makePokemon(arr2))
    }


    useEffect(() => {
        getDeck()
    }, [])

    
    return (
        <div className='Decks'>
            <h2>Battle!</h2>
            {
                deck1 && deck2
                ?
                deck1.map((component, i) => {
                    return <Battle key={i} round={i} deck1={deck1} deck2={deck2} /> 
                })
                :
                null
            }
        </div>
    )
}




// Player 1 State - object {}
// Pokemon - array []
// each_pokemon - object {}
// name , hp/atk/def/spd , current_hp - str / int
// battles_won


// Render each pair that will battle in one component

/* 
const [ round ] = useState({
    round1: {}, 
    round2: {}, 
    round3: {}, 
    round4: {}, 
    round5: {}, 
    round6: {}, 
    round7: {}
})
*/

// round.map(battle => {return })
// 

// Each Player will have stats for wins and losses
// Wins and losses 
    // This object holds an array with the two pokemon objects which will be battling
        // Each Pokemon will hold their own stats, which determines dmg and who attacks first
        // Each Pokemon has their own remaining_hp state, which changes on each attack
        // 