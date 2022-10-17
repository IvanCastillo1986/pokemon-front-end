import React from 'react'
import SinglePokemon from '../Components/SinglePokemon'
import './Show.css'


// NOT CURRENTLY USING THIS COMPONENT OR SHOW. USING POKEDEX TO RENDER SINGLE POKEMON INSTEAD
export default function Show({pokemon}) {

    return (
        <div className='Show'>
            <SinglePokemon pokemon={pokemon} />
        </div>
    )
}
