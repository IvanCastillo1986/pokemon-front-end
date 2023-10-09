import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import { createRandomPokemonIds } from '../Helper/createRandomPokemonIds'
import axios from 'axios'

import Deck from '../Components/Deck'
import Arena from '../Components/Arena'

import './Play.css'
const API = process.env.REACT_APP_API_URL


export default function Play() {
    // Here, we will choose the ai player's deck and render all of the game's children components.
    // We need yourDeck and aiDeck to manipulate pokemon's state like hp during battles
    // during battles, we'll manipulate the UserContext's pokemon exp and lvls
    // API calls and changes to UserContext will only be made from Play page and Deck.
    // Arena component will encapsulate and manipulate all of it's local state relating to the game. 
    // Table, Bench, and Discard components will be used as Arena's children in the game portion.

    const { user, setUser } = useContext(UserContext)
    const [yourDeck, setYourDeck] = useState(user.currentPokemon)
    const [aiDeck, setAiDeck] = useState([])
    const [currentComponent, setCurrentComponent] = useState('deck')


    const handlePlayerReadyToBattle = (component) => {
        // update user in both API and UserContext to has_chosen_starter = true
        // update UserContext currentPokemon to conta
        const updatedUser = {
            has_chosen_starter: true
        }
        axios.put(`${API}/users/${user.currentUser.uuid}`, updatedUser)
        .then(res => {
            setUser(prevUser => {
                return {
                    ...prevUser, currentUser: res.data, currentPokemon: yourDeck
                }
            })
        })
        setCurrentComponent(component)
    }

    useEffect(() => {
        // This useEffect chooses a different AI deck everytime Play page mounts
        // with your starter's weakness
        if (yourDeck.length > 5) {

            const yourStarterId = yourDeck[0].pokemon_id
            let enemyStarterId;

            switch(yourStarterId) {
                case 1:
                    enemyStarterId = 4
                    break;
                case 4:
                    enemyStarterId = 7
                    break;
                case 7:
                    enemyStarterId = 1
                    break;
            }

            // Get aiDeck's 6 pokemon:
            const aiDeckArr = []
            const randomPokemonIdArr = [enemyStarterId].concat(createRandomPokemonIds(5))
            
            // create array with 6 API promises
            const pokemonApiPromises = randomPokemonIdArr.map(pokemonId => {
                return axios.get(`${API}/pokemon/${pokemonId}`)
            })
            
            // make all API calls at once with Promise.all()
            Promise.all(pokemonApiPromises)
            .then(resArray => {
                resArray.forEach(res => aiDeckArr.push(res.data))
            })
                setAiDeck(aiDeckArr)
            }
    }, [currentComponent])


    return (
        <div className='Play'>
            {currentComponent === 'deck' && !user.currentUser.has_chosen_starter 
            ?
                <Deck 
                    handlePlayerReadyToBattle={handlePlayerReadyToBattle}
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
                /* <Arena 
                    opponentDeck={aiDeck}
                    yourDeck={yourDeck}
                />  */
                <div>Arena</div>
            }
        </div>
    )
}
