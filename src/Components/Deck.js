import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function Deck() {

    const [ pokemon, setPokemon ] = useState([])
    const [ deck, setDeck ] = useState([])
    const [ count, setCount ] = useState(0)
    
    const randomNum = () => {
        return Math.floor(Math.random() * 151)
    }
    console.log(randomNum())

    useEffect(() => {
        axios.get(` https://pokeapi.co/api/v2/pokemon/?limit=20`)
        .then(res => console.log(res))
    })

    return (
        <div>
            <h2>Deck Component</h2>
        </div>
    )
}
