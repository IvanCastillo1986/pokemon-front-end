import React from 'react'
import Decks from '../Components/Decks'
import './Play.css'


export default function Play({ pokemon }) {

    return (
        <div className='Play'>
            <h1>Let's Play!</h1>


            {/* 
            Here, you will recieve random cards from a deck. 
            The cards will only be starter Pokemon (Level 1).
            There will be an evolve feature in the game that gets you the stronger evolved level.
            */}
            {/* <Decks pokemon={pokemon} /> */}
        </div>
    )
}
