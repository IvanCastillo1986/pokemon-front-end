import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BattleGrounds from './BattleGrounds'
import { convertToBattlePokemon } from '../Helper/convertToBattlePokemon'
import { capitalizeObject } from '../Helper/capitalize'



export default function Decks() {

    const [ deck1, setDeck1 ] = useState([])
    const [ deck2, setDeck2 ] = useState([])
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ bench, setBench ] = useState()
    
    
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
                        arr2.push(capitalizeObject(res.data))
                    }
                })
            }

            setDeck1(convertToBattlePokemon(arr1))
            setDeck2(convertToBattlePokemon(arr2))
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
                    return <BattleGrounds key={i} round={i + 1} pokemonOne={deck1[i]} pokemonTwo={deck2[i]} /> 
                })
            }
        </div>
    )
}


