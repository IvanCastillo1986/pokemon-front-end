import React, { useState, useEffect, useContext } from 'react'
import BattleCard from './BattleCard'
import { UserContext } from "../UserContext"





export default function NewDeck() {

    const [battlePokemon, setBattlePokemon] = useState([])

    function handleClick() {
        // this will make api call to back-end, and then add new Pokemon to player's deck (6th pokemon)
        
    }


    return (
        <div className='Deck'>
            <h1>Hey, welcome to Pokemon Play!</h1>
            {Object.keys(starterPokemon).length === 0 
            ?
                <>
                <p>Click a button below to choose your first Pokemon.<br />
                Your comrade through thick and thin.</p>
                <p>Which type is your favorite?</p>
                <div className='Buttons'>
                    <button className='Grass-btn' onClick={handleClick}>Grass</button>
                    <button className='Fire-btn' onClick={handleClick}>Fire</button>
                    <button className='Water-btn' onClick={handleClick}>Water</button>
                </div>
                </>
            :
                <>
                <p>Congrats! Your new starter Pokemon is {capitalize(starterPokemon.name)}.<br />
                You two will be best of friends!</p>
                <BattleCard key={pokemon.id} pokemon={starterPokemon} />
                <p>And this is the rest of your deck:</p>
                <div className='RandomDeck'>
                    {yourDeck.slice(1).map((pokemon, i) => {
                        return (
                            <BattleCard className='BattleCard' key={i} pokemon={pokemon} />
                            )
                        })}
                </div>
                <p  className='ArenaPrompt'>These are all basic-level Pokemon. This means that they have not evolved yet.<br />
                You will need to evolve them through experience and levels. <br />
                Some are able to evolve, which means they are relatively weak, but have the ability to become very strong.<br />
                Some Pokemon can not evolve, but these Pokemon are stronger than most other basic-level Pokemon who can evolve.<br/>
                However, these Pokemon are not as strong as many level 1 or level 2 Pokemon who have already evolved.</p>
                <p>Click the button below when you're ready to enter the Arena and test out your deck!</p>
                {/* Link this button to the Arena with deck props, and unmount the Deck component */}
                <button className='ArenaPromptBtn' onClick={() => handleCurrentComponent('arena')}>
                    Go to Arena
                </button>
                </>
            }
        </div>
    )
}
