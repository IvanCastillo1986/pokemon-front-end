import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'

import NewDeck from '../Components/NewDeck'
import Arena from '../Components/Arena'

import './Play.css'




export default function NewPlay() {

    const { user } = useContext(UserContext)
    const [yourDeck, setyourDeck] = useState(user.currentPokemon)
    const [aiDeck, setAiDeck] = useState([])
    const [currentComponent, setCurrentComponent] = useState('deck')

    const handleCurrentComponent = (str) => {
        setCurrentComponent(str)
    }

    // if has_chosen_starter is true, render Deck
    // else, render Arena
    // useEffect(() => {

    // }, [user.currentUser.has_chosen_starter])

    return (
        <div className='Play'>

            {
                // currentComponent === 'deck'
                // user
                // ?
                <NewDeck 
                    handleCurrentComponent={handleCurrentComponent} 
                    setAiDeck={setAiDeck}
                />
                /* 
                <Arena />
                After you have your Pokemon, choose which ones to use first in the arena.
                When one Pokemon dies, you choose the next one to battle with.
                You can switch Pokemon out whenever you want, but then the Pokemon that has just
                been switched in will recieve the damage from the opponent's selected move.
                */
                // :
                // <Arena 
                //     opponentDeck={aiDeck}
                //     yourDeck={yourDeck}
                // />
            }
        </div>
    )
}
