import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'

import NewDeck from '../Components/NewDeck'
import Arena from '../Components/Arena'

import './Play.css'
const API = process.env.REACT_APP_API_URL


export default function NewPlay() {
    // we need yourDeck and aiDeck to manipulate pokemon's state like hp during battles
    // during battles, we'll manipulate the UserContext's pokemon exp and lvls
    // after leaving the NewDeck component, we'll need to 

    const { user, setUser } = useContext(UserContext)
    const [yourDeck, setYourDeck] = useState(user.currentPokemon)
    const [aiDeck, setAiDeck] = useState([])
    const [currentComponent, setCurrentComponent] = useState('deck')

    const handlePlayerReadyToBattle = (component) => {
        
        // update the user in both API and UserContext to has_chosen_starter = true
        const updatedUser = {
            has_chosen_starter: true
        }
        axios.put(`${API}/users/${user.currentUser.uuid}`, updatedUser)
        .then(res => {
            console.log(res.data)
            setUser(prevUser => {
                return {
                    ...prevUser, currentUser: res.data
                }
            })
            
        })
        setCurrentComponent(component)
    }




    return (
        <div className='Play'>

            {currentComponent === 'deck' && !user.currentUser.has_chosen_starter 
            ?
                <NewDeck 
                    handlePlayerReadyToBattle={handlePlayerReadyToBattle}
                    setAiDeck={setAiDeck}
                    yourDeck={yourDeck}
                    setYourDeck={setYourDeck}
                /> 
            :
                /*
                <Arena />
                After you have your Pokemon, choose which ones to use first in the arena.
                When one Pokemon dies, you choose the next one to battle with.
                You can switch Pokemon out whenever you want, but then the Pokemon that has just
                been switched in will recieve the damage from the opponent's selected move.
                */
                <Arena 
                    opponentDeck={aiDeck}
                    yourDeck={yourDeck}
                /> 
            }
        </div>
    )
}
