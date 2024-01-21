import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import { createRandomPokemonIds, getMyStarterId } from '../../Helper/createPokemonFunctions'
import { convertUser } from '../../Helper/convertUser'
import axios from 'axios'

import BattleCard from './BattleCard'

import './BattleCard.css'
const API = process.env.REACT_APP_API_URL


// This component let's player choose their starter Pokemon
export default function Deck() {

    const { user, setUser } = useContext(UserContext)

    const [starterPokemon, setStarterPokemon] = useState({})
    const [restOfDeck, setRestOfDeck] = useState([])


    // Make API call to add starter to user's deck, and creates DVs for full deck. Show Intro.
    const addStarterToDeck = async (starterId) => {
        const pokemonIds = [starterId, ...createRandomPokemonIds(5)]

        // Make API call to get 6 Pokemon to store in state, returns 6 Pokemon
        axios.get(`${API}/pokemon`, { params: {pokemonIds: JSON.stringify(pokemonIds)} })
        .then(res => {
            const starterInDeck = res.data.find(pokemon => pokemon.id === starterId)
            const otherPokemon = res.data.filter(pokemon => pokemon.id !== starterId)
            
            setStarterPokemon(starterInDeck)
            setRestOfDeck(otherPokemon)
        }).catch(err => console.log(err))
    }
    
    // This handleClick let's the player choose their starter Pokemon
    const handleClickStarterBtn = async (e) => {
        const starterId = getMyStarterId(e)
        
        await addStarterToDeck(starterId)
    }

    
    async function updateUserInBackend() {
        const { currentUser } = user
        const newDeck = [starterPokemon, ...restOfDeck]
        const pokemonIds = newDeck.map(pokemon => pokemon.id)

        // Make api call for updatedUser after picking Starter
        axios.put(`${API}/users/${currentUser.uuid}`, { userToUpdate: currentUser, pokemonIds })
        .then(res => {
            const updatedUser = convertUser(res.data)
            // console.log('updatedUser in <Deck />:', updatedUser)

            sessionStorage.setItem('user', JSON.stringify(updatedUser))
            setUser(() => {
                return updatedUser
            })
        }).catch(err => console.log(err))
    }


    return (
        <div className='Deck'>
            <h1>Hey, welcome to Pokemon Play!</h1>

            {restOfDeck.length === 0
            ?
                <>
                <p>Click a button below to choose your first Pokemon.<br />
                Your comrade through thick and thin.</p>
                <p>Which type is your favorite?</p>
                <div className='Buttons'>
                    <button className='Grass-btn' onClick={(e) => handleClickStarterBtn(e)}>Grass</button>
                    <button className='Fire-btn' onClick={(e) => handleClickStarterBtn(e)}>Fire</button>
                    <button className='Water-btn' onClick={(e) => handleClickStarterBtn(e)}>Water</button>
                </div>
                </>
            :
                <>
                <p>Congrats! Your new starter Pokemon is {starterPokemon.name}.<br />
                You two will be best of friends!</p>
                <BattleCard key={starterPokemon.pokemon_id} pokemon={starterPokemon} />
                <p>And this is the rest of your deck:</p>
                <div className='RandomDeck'>
                    {restOfDeck.map(pokemon => {
                        return <BattleCard key={pokemon.id} pokemon={pokemon} />
                    })}
                </div>
                <p  className='ArenaPrompt'>These are all basic-level Pokemon. This means that they have not evolved yet.<br />
                You will need to evolve them through experience and levels. <br />
                Some are able to evolve, which means they are relatively weak, but have the ability to become very strong.<br />
                Some Pokemon can not evolve, but these Pokemon are stronger than most other basic-level Pokemon who can evolve.<br/>
                However, these Pokemon are not as strong as many level 1 or level 2 Pokemon who have already evolved.</p>
                <p>Click the button below when you're ready to enter the Arena and test out your deck!</p>

                <button className='ArenaPromptBtn' onClick={updateUserInBackend}>
                    Go to Arena
                </button>
                </>
            }
        </div>
    )
    
}
