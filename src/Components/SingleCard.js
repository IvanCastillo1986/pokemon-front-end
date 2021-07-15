import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from './Card'

export default function SingleCard() {

    const [pokemon, setPokemon] = useState({})
    const [isReady, setIsReady] = useState(false)
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(
            (res) => setPokemon(res.data),
            (err) => {console.log(`Error in SingleCard: `, err)}
        )
        .then(() => {setIsReady(true)})
        .catch(c => console.warn(`Catch in SingleCard: `, c))
    }, [])


    return (
        <div>
            <h1>Single Card</h1>
            <h2>Pokemon ID #{id}: {pokemon.name}</h2>
            {isReady ? <Card pokemon={pokemon} /> : null}
        </div>
    )
}
