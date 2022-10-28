import React from 'react'

import Deck from '../Components/Deck'

import './Play.css'


export default function Play({ pokemon }) {


    return (
        <div className='Play'>

            {/* 
            <Decks /> component:
            
            Here, you will recieve random cards from a deck. 
            The cards will only be starter Pokemon (Level 1).
            There will be an evolve feature in the game that gets you the stronger evolved level.

            Each of the Pokemon's 2 abilities will be randomly chosen from their array of moves.
            Create a function that applies the power, speed (quick attack) and accuracy to each
            Pokemon's moves.

            Player:
            "Hey! Welcome to Pokemon Play!"
            "Click the button below to choose a random deck"
            [1,2,3,4,5,6,7]
            "Great! These are your new Pokemon."
            "They're all basic Pokemon, so you'll need to level them up before you can evolve them."
            "I know! Let's take them out to the arena and get some training in."

            */}

            <Deck pokemon={pokemon} />

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
