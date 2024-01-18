import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import axios from 'axios'

import BattleCard from './BattleCard'

import './BattleCard.css'
const API = process.env.REACT_APP_API_URL


// This component let's player choose their starter Pokemon
// export default function Deck({ yourDeck, setYourDeck }) {
export default function Deck({ yourDeck, setYourDeck }) {

    const { user, setUser } = useContext(UserContext)
    const sessionUser = JSON.parse(sessionStorage.getItem('user'))
    const [starterPokemon, setStarterPokemon] = useState({})

    const history = useHistory()

    const getStarterId = (e) => {
        let starterId;
        let clickedBtn = e.target.className;

        if (clickedBtn === 'Grass-btn') {
            starterId = 1;
        } else if (clickedBtn === 'Fire-btn') {
            starterId = 4;
        } else {
            starterId = 7;
        }
        
        return starterId;
    }

    // Make API call to add starter to user's deck, and creates DVs for full deck
    const addStarterToDeck = async (starterId) => {
        console.log('starterId after clicking:', starterId)
        const {currentUser, currentPokemon} = user
        // make api call to retrieve starter, plus it's user's deck properties ( exp/lvl )
        const starterInDeck = await axios.post(
            `${API}/decks?getPokeInfo=true`, 
            { uuid: currentUser.uuid, pokemonId: starterId })
        .then(res => {
            console.log('starter from API /decks after clicking btn:', res.data)
            return res.data
        })
        
        // add starterPokemon to our Play page yourDeck state, which currently has 5 Pokemon
        const fullDeck = [starterInDeck].concat(currentPokemon)

        // spread both deck and pokemon response into one object, so that pokemon also has exp and lvl
        setStarterPokemon(starterInDeck)
        
        return fullDeck
    }
    

    // This handleClick let's the player choose their starter Pokemon
    const handleClick = async (e) => {
        const starterId = getStarterId(e)
        
        const fullDeck = await addStarterToDeck(starterId)

        setYourDeck(fullDeck)
        console.log('fullDeck after addStarterToDeck:', fullDeck)
        // add the starter Pokemon to user Context and sessionStorage
        const userAfterPicking = {...user}
        userAfterPicking.currentPokemon = fullDeck
        userAfterPicking.currentUser.has_chosen_starter = true

        const {currentUser, currentItems } = userAfterPicking

        // Make api call for updatedUser after picking
        axios.put(`${API}/users/${currentUser.uuid}`, { userToUpdate: currentUser })
        .then(res => {
            const updatedUser = {
                currentUser: res.data,
                currentPokemon: yourDeck,
                currentItems
            }

            sessionStorage.setItem('user', JSON.stringify(updatedUser))
            setUser(() => {
                return updatedUser
            })
            console.log('finished last call in Deck')
        }).catch(err => console.log(err))
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
                <button className='ArenaPromptBtn' onClick={() => history.push('/play')}>
                    Go to Arena
                </button>
                </>
            }
        </div>
    )
    
}
