import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Battle from './Battle'
import { makeBattlePokemon } from '../Helper/makeBattlePokemon'
import { capitalizeObject } from '../Helper/capitalize'



export default function Decks() {

    const [ deck1, setDeck1 ] = useState([])
    const [ deck2, setDeck2 ] = useState([])
    const [ isLoaded, setIsLoaded ] = useState(false)
    
    
    const randomNum = () => {
        return Math.floor(Math.random() * 151)
    }
    
    useEffect(() => {
        const getDeck = async () => {
            const arr1 = []
            const arr2 = []        
            for (let i = 1; i <= 14; i++) {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum()}`)
                .then((res) => {
                    if (i % 2 !== 0) {
                        arr1.push(capitalizeObject(res.data))
                    } else {
                        arr2.push(res.data)
                    }
                })
            }
            setDeck1(makeBattlePokemon(arr1))
            setDeck2(makeBattlePokemon(arr2))
            setIsLoaded(true)
        }
        getDeck()
    }, [])


    if (!isLoaded) {
        return <h2>...Loading</h2>
    }

    return (
        <div className='Decks'>
            <h1>Battle!</h1>
            {
                deck1.map((component, i) => {
                    return <Battle key={i} round={i} pokemon1={deck1[i]} pokemon2={deck2[i]} /> 
                })
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