import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'



export default function Deck() {

    const [ deck1, setDeck1 ] = useState([])
    const [ deck2, setDeck2 ] = useState([])
    
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
    }

    useEffect(() => {
        getDeck()
    }, [])

    return (
        <div>
            <h2>Deck Component</h2>
            <section className='Deck1'>
                {deck1.length === 7  ?  deck1.map(pokemon => {return <Card key={pokemon.name} pokemon={pokemon}/>})  :  <h2>Loading Deck 1...</h2>}
            </section>
            <section className='Deck2'>
                {deck2.length === 7  ?  deck2.map(pokemon => {return <Card key={pokemon.name} pokemon={pokemon}/>})  :  <h2>Loading Deck 2...</h2>}
            </section>
        </div>
    )
}
