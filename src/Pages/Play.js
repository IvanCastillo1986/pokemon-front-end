import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import { createRandomPokemonIds } from '../Helper/createRandomPokemonIds'
import { addRemainingHp } from '../Helper/addRemainingHp'
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
    const sessionUser = JSON.parse(sessionStorage.getItem('user'))
    const [yourDeck, setYourDeck] = useState(user.currentPokemon)
    const whichComponent = sessionUser.currentUser.has_chosen_starter ? 'arena' : 'deck'
    const [currentComponent, setCurrentComponent] = useState(whichComponent)


    const handlePlayerReadyToBattle = (component) => {
        // update user in both API and UserContext to has_chosen_starter = true
        const { currentUser } = sessionUser

        const updatedUser = {
            email: currentUser.email,
            uuid: currentUser.uuid,
            has_chosen_starter: true,
            wins: currentUser.wins,
            losses: currentUser.losses
        }
        axios.put(`${API}/users/${currentUser.uuid}`, updatedUser)
        .then(res => {
            const user = {
                currentUser: res.data,
                currentPokemon: yourDeck
            }
            sessionStorage.setItem('user', JSON.stringify(user))
            const sessionUser = JSON.parse(sessionStorage.getItem('user'))

            setUser(prevUser => {
                return {
                    ...prevUser, currentUser: sessionUser.currentUser, currentPokemon: sessionUser.currentPokemon
                }
            })
        })
        setCurrentComponent(component)
    }

    function setOpponentDeck() {
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

            const aiDeckArr = []
            // Get 6 pokemon ids:
            const randomPokemonIdArr = [enemyStarterId].concat(createRandomPokemonIds(5))
            
            // create array with 6 API promises
            const pokemonApiPromises = randomPokemonIdArr.map(pokemonId => {
                return axios.get(`${API}/pokemon/${pokemonId}`)
            })
            
            // make all API calls at once with Promise.all() and add to sessionStorage opponentDeck
            Promise.all(pokemonApiPromises)
            .then(resArray => {
                // add remaining_hp property to enemy's deck
                addRemainingHp(resArray)
                resArray.forEach(res => {
                    const enemyPokemon = res.data
                    enemyPokemon.remaining_hp = 1
                    aiDeckArr.push(enemyPokemon)
                })
                // HERE I AM SETTING opponentDeck WITHIN STORAGE INSTEAD OF useState OR UserContext
                sessionStorage.setItem('opponentDeck', JSON.stringify(aiDeckArr))
            }).catch(err => console.log(err))
        }
    }
    setOpponentDeck()


    useEffect(() => {
        // on page refresh, store most up-to-date user data (wins/exp/lvl)
        if (sessionUser) {
            axios.get(`${API}/users/${sessionUser.currentUser.uuid}`)
            .then(res => {
                const userUpdate = {
                    currentUser: res.data.user,
                    currentPokemon: res.data.userPokemon
                }
                sessionStorage.setItem('user', JSON.stringify(userUpdate))
                setUser(userUpdate)
                console.log(user)
            })
        }
        
        // this adds currentComponent to sessionStorage, so that a new player can't refresh for infinite starters during select
        if (yourDeck.length > 5) sessionStorage.setItem('currentComponent', 'arena')
    }, [])


    return (
        <div className='Play'>
                
            {currentComponent === 'deck' &&
            sessionStorage.getItem('currentComponent') !== 'arena' 
                ?
                <Deck 
                    handlePlayerReadyToBattle={handlePlayerReadyToBattle}
                    yourDeck={yourDeck}
                    setYourDeck={setYourDeck}
                /> 
                :
                /*
                Arena
                After you have your Pokemon, choose which ones to use first in the arena.
                When one Pokemon dies, you choose the next one to battle with.
                You can switch Pokemon out whenever you want, but then the Pokemon that has just
                been switched in will recieve the damage from the opponent's selected move.
                */
                JSON.parse(sessionStorage.getItem('opponentDeck')) &&
                <Arena 
                    opponentDeck={JSON.parse(sessionStorage.getItem('opponentDeck'))}
                    yourDeck={addRemainingHp(yourDeck)}
                />
            }

        </div>
    )
}
