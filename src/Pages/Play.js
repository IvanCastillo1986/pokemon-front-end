import React from 'react'

import './Play.css'


export default function Play({ pokemon }) {

    return (
        <div className='Play'>
            <h1>Let's Play!</h1>


            {/* 
            <Decks /> component:
            
            Here, you will recieve random cards from a deck. 
            The cards will only be starter Pokemon (Level 1).
            There will be an evolve feature in the game that gets you the stronger evolved level.

            Each of the Pokemon's 2 abilities will be randomly chosen from their array of moves.
            Create a function that applies the power, speed (quick attack) and accuracy to each
            Pokemon's moves.

            */}

            {/* <Decks pokemon={pokemon} /> */}

            {/* 
            <Arena />
            After you have your Pokemon, choose which ones to use first in the arena.
            When one Pokemon dies, you choose the next one to battle with.
            You can switch Pokemon out whenever you want, but then the Pokemon that has just
            been switched in will recieve the damage from the opponent's selected move.
            */}
        </div>
    )
}
