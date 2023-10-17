import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'

import BattleCard from './BattleCard'

import './BattleCard.css'
const API = process.env.REACT_APP_API_URL


// This component let's player choose their starter Pokemon
export default function Deck({ handlePlayerReadyToBattle, yourDeck, setYourDeck }) {

    const { setUser } = useContext(UserContext)
    const sessionUser = JSON.parse(sessionStorage.getItem('user'))
    const [starterPokemon, setStarterPokemon] = useState({})

    // This handleClick let's the player choose their starter Pokemon, no longer making AI Pokemon call
    const handleClick = async (e) => {
        let starterId;

        switch(e.target.className) {
            case 'Grass-btn':
                starterId = 1
                break;
            case 'Fire-btn':
                starterId = 4
                break;
            case 'Water-btn':
                starterId = 7
                break;
        }

        // make API call to add starter to user's deck
        // ASK BILLY: here, should I make api call with UserContext or sessionStorage (in case of refresh)
        const starterDeckProperties = await axios.post(`${API}/decks`, [JSON.parse(sessionStorage.getItem('user')).currentUser.uuid, starterId])
        .then(res => res.data)

        // make api call to retrieve starter, plus it's user's deck properties ( exp/lvl )
        const starterPokemonPlusDeckProperties = await axios.get(`${API}/pokemon/${starterId}`)
        .then(res => {
            const starterPokemon = res.data
            return {...starterPokemon, ...starterDeckProperties}
        })
        
        // spread both deck and pokemon response into one object, so that pokemon also has exp and lvl
        setStarterPokemon({...starterPokemonPlusDeckProperties})
        
        // add starterPokemon to our Play page yourDeck state, with 6 Pokemon
        const fullDeck = [starterPokemonPlusDeckProperties].concat(yourDeck)
        setYourDeck(fullDeck)
        const user = JSON.parse(sessionStorage.getItem('user'))
        user.currentPokemon = fullDeck

        setUser(user)
        sessionStorage.setItem('user', JSON.stringify(user))

        // this adds currentComponent to sessionStorage, so that a new player can't refresh for infinite starters during select
        sessionStorage.setItem('currentComponent', 'arena')
    };


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
                <p>Congrats! Your new starter Pokemon is {starterPokemon.name}.<br />
                You two will be best of friends!</p>
                <BattleCard key={starterPokemon.pokemon_id} pokemon={starterPokemon} />
                <p>And this is the rest of your deck:</p>
                <div className='RandomDeck'>
                    {sessionUser.currentPokemon.map(pokemon => {
                        return <BattleCard key={pokemon.id} pokemon={pokemon} />
                    })}
                </div>
                <p  className='ArenaPrompt'>These are all basic-level Pokemon. This means that they have not evolved yet.<br />
                You will need to evolve them through experience and levels. <br />
                Some are able to evolve, which means they are relatively weak, but have the ability to become very strong.<br />
                Some Pokemon can not evolve, but these Pokemon are stronger than most other basic-level Pokemon who can evolve.<br/>
                However, these Pokemon are not as strong as many level 1 or level 2 Pokemon who have already evolved.</p>
                <p>Click the button below when you're ready to enter the Arena and test out your deck!</p>
                {/* Link this button to the Arena with deck props, and unmount the Deck component */}
                <button className='ArenaPromptBtn' onClick={() => handlePlayerReadyToBattle('arena')}>
                    Go to Arena
                </button>
                </>
            }
        </div>
    )
    
}
