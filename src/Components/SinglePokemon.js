import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Pokedex from './Pokedex'

export default function SinglePokemon() {

    // TURN THIS COMPONENT INTO A POKEDEX INSTEAD OF A CARD!!

    const [pokemon, setPokemon] = useState({})
    const [isReady, setIsReady] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(
            (res) => setPokemon(res.data),
            (err) => {console.log(`Error in SinglePokemon: `, err)}
        )
        .then(() => {setIsReady(true)})
        .catch(c => console.warn(`Catch in SinglePokemon: `, c))
    }, [id])


    return (
        <div className='SinglePokemon'>
            <h2>{pokemon.name}</h2>
            <h2>Pokedex #{pokemon.id}</h2>
            {isReady ? <Pokedex pokemon={pokemon} /> : null}
        </div>
    )
}
