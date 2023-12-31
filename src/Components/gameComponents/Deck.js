import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'

import BattleCard from './BattleCard'

import './BattleCard.css'
const API = process.env.REACT_APP_API_URL


// This component let's player choose their starter Pokemon
export default function Deck({ yourDeck, setYourDeck, setCurrentComponent }) {

    const { user, setUser } = useContext(UserContext)
    const sessionUser = JSON.parse(sessionStorage.getItem('user'))
    const [starterPokemon, setStarterPokemon] = useState({})

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

    // Make API call to add starter to user's deck
    const addStarterToDeck = async (starterId) => {

        // make api call to retrieve starter, plus it's user's deck properties ( exp/lvl )
        const starterInDeck = await axios.post(
            `${API}/decks?getPokeInfo=true`, 
            { uuid: user.currentUser.uuid, pokemonId: starterId })
        .then(res => {
            return res.data
        })
        
        // spread both deck and pokemon response into one object, so that pokemon also has exp and lvl
        setStarterPokemon({...starterInDeck})
        
        // add starterPokemon to our Play page yourDeck state, which currently has 5 Pokemon
        const fullDeck = [starterInDeck].concat(yourDeck)
        return fullDeck
    }
    

    // This handleClick let's the player choose their starter Pokemon
    const handleClick = async (e) => {
        const starterId = getStarterId(e)
        
        const fullDeck = await addStarterToDeck(starterId)

        setYourDeck(fullDeck)

        // add the starter Pokemon to user Context and sessionStorage
        const userAfterPicking = {...user}
        userAfterPicking.currentPokemon = fullDeck

        setUser(userAfterPicking)
        sessionStorage.setItem('user', JSON.stringify(userAfterPicking))
    };

    const handlePlayerReadyToBattle = () => {
        // update user in both API and UserContext to has_chosen_starter = true
        const {currentUser, currentItems } = user

        const updatedUser = {
            email: currentUser.email,
            uuid: currentUser.uuid,
            has_chosen_starter: true,
            wins: currentUser.wins,
            losses: currentUser.losses
        }

        axios.put(`${API}/users/${currentUser.uuid}`, { user: updatedUser })
        .then(res => {
            
            const readyUser = {
                currentUser: res.data,
                currentPokemon: yourDeck,
                currentItems
            }

            sessionStorage.setItem('user', JSON.stringify(readyUser))
            setUser(() => {
                return readyUser
            })
        }).catch(err => console.log(err.message))

        // Navigates us to Arena component after reading intro
        setCurrentComponent('arena')
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
                <button className='ArenaPromptBtn' onClick={handlePlayerReadyToBattle}>
                    Go to Arena
                </button>
                </>
            }
        </div>
    )
    
}
