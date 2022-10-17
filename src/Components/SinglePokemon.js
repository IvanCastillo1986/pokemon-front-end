import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Pokedex from './Pokedex'



// NOT CURRENTLY USING THIS COMPONENT OR SHOW. USING POKEDEX TO RENDER SINGLE POKEMON INSTEAD
export default function SinglePokemon({pokemon}) {

    // const [pokemon, setPokemon] = useState({})
    const [isReady, setIsReady] = useState(false)
    const [currentPokemon, setCurrentPokemon] = useState({})
    // const { id } = useParams()

    // useEffect(() => {
        
        // axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        // .then(
        //     (res) => setPokemon(res.data),
        //     (err) => {console.log(`Error in SinglePokemon: `, err)}
        // )
        // .then(() => {setIsReady(true)})
        // .catch(c => console.warn(`Catch in SinglePokemon: `, c))
    // }, [])


    return (
        <div className='SinglePokemon'>
            {isReady ? <Pokedex currentPokemon={currentPokemon} /> : null}
        </div>
    )
}
