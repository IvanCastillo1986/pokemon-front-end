import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function Deck() {

    const [ pokemon, setPokemon ] = useState({})
    const [ deck, setDeck ] = useState([])
    const [ count, setCount ] = useState(0)
    
    const randomNum = () => {
        return Math.floor(Math.random() * 151)
    }
    console.log(randomNum())

    return (
        <div>
            <h2>Deck Component</h2>
        </div>
    )
}
