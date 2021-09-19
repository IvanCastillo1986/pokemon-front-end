import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from './Card'

export default function SingleCard() {

    // TURN THIS COMPONENT INTO A POKEDEX INSTEAD OF A CARD!!

    const [pokemon, setPokemon] = useState({})
    const [isReady, setIsReady] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(
            (res) => setPokemon(res.data),
            (err) => {console.log(`Error in SingleCard: `, err)}
        )
        .then(() => {setIsReady(true)})
        .catch(c => console.warn(`Catch in SingleCard: `, c))
    }, [id])


    return (
        <div className='SingleCard'>
            <h2>{pokemon.name}</h2>
            <h2>Pokedex #{pokemon.id}</h2>
            {isReady ? <Card pokemon={pokemon} /> : null}
        </div>
    )
}
