import React, { useState, useEffect, useContext } from 'react'
import { capitalize } from '../Helper/capitalize'
import { convertToBattlePokemon } from '../Helper/convertToBattlePokemon'
import { UserContext } from '../UserContext'
import axios from 'axios'

import BattleCard from './BattleCard'

import './BattleCard.css'
const API = process.env.REACT_APP_API_URL


// This component let's player choose their starter Pokemon, and randomly chooses player and AI decks
export default function NewDeck({ handleCurrentComponent }) {
    
    const [battlePokemon, setBattlePokemon] = useState([])
    const [starterId, setStarterId] = useState()
    const { user, setUser } = useContext(UserContext)

    // This useEffect sets up your deck and the AI opponent's deck, including an AI starter Pokemon
    useEffect(() => {

    }, [battlePokemon])

    // This handleClick let's the player choose their starter Pokemon, and sets the AI's deck
    const handleClick = async (e) => {

        switch(e.target.className) {
            case 'Grass-btn':
                setStarterId(1)
                break;
            case 'Fire-btn':
                setStarterId(4)
                break;
            case 'Water-btn':
                setStarterId(7)
                break;
        }

        // make API call to add starter to player's deck
        const starterPokemon = await axios.post(`${API}/decks`, [user.currentUser.uuid, user.currentUser.pokemon_id])
    };

    // useEffect(() => {
    //     const fullDeck = [starterPokemon].concat(yourDeck)
    //     setYourDeck(fullDeck)
    // }, [starterPokemon])


    return (
        battlePokemon.length ?

        <div className='Deck'>
            <h1>Hey, welcome to Pokemon Play!</h1>
            {/* {Object.keys(starterPokemon).length === 0  */}
            {/* ? */}
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
            {/* : */}
                {/* <>
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
                <p>Click the button below when you're ready to enter the Arena and test out your deck!</p> */}
                {/* Link this button to the Arena with deck props, and unmount the Deck component */}
                {/* <button className='ArenaPromptBtn' onClick={() => handleCurrentComponent('arena')}>
                    Go to Arena
                </button> */}
                {/* </> */}
            {/* } */}
        </div>

        : 
        <div>
            <h1>Hey, welcome to Pokemon Play!</h1>
            <p>Please wait while the page loads.<br />
            We promise, it's worth it!</p>
        </div>
    )
    
}
