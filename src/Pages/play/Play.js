import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { createRandomPokemonIds, getEnemyStarterId } from '../../Helper/createPokemonFunctions'
import { addRemainingHp } from '../../Helper/addRemainingHp'
import axios from 'axios'

import Arena from '../../Components/gameComponents/Arena'

import './Play.css'
import { convertUser } from '../../Helper/convertUser'
import { raisePokemonStats } from '../../Helper/statsFunctions'
const API = process.env.REACT_APP_API_URL


export default function Play() {
    
    const { user, setUser } = useContext(UserContext)
    
    const [yourDeck, setYourDeck] = useState(user.currentPokemon)
    const [randomEnemyDeck, setRandomEnemyDeck] = useState([])

    function populateEnemyDeck() {
        // set opponent starter id as weakness to your starter
        const enemyStarterId = getEnemyStarterId(yourDeck)
        
        // createRandomPokemonIds to send to back-end
        const pokemonIds = [enemyStarterId, ...createRandomPokemonIds(5)]

        // send pokemonIds along with this get call. Add to 
        axios.get(`${API}/pokemon`, {params: {pokemonIds: JSON.stringify(pokemonIds)}})
        .then(res => {
            // console.log('making opponentDeck call in populateEnemyDeck:', res.data)
            const enemyDeck = res.data
            enemyDeck.forEach(pokemon => {
                const enemyPokemon = pokemon
                enemyPokemon.pokemon_id = enemyPokemon.id
                enemyPokemon.id += 2000
                enemyPokemon.lvl = 1
                // enemyPokemon will now have .remaining_hp, .pokemon_id, and .id += 2000 (to prevent accidental comparisons)
            })
            raisePokemonStats(enemyDeck)
            addRemainingHp(enemyDeck)

            // HERE I AM SETTING opponentDeck WITHIN STORAGE INSTEAD OF useState OR UserContext
            // ...to prevent cheating: changing enemy Pokemon on refresh
            sessionStorage.setItem('opponentDeck', JSON.stringify(enemyDeck))

            setRandomEnemyDeck(enemyDeck)
            
        }).catch(err => console.log(err))
    }


    function refreshPage() {

        if (user.currentPokemon.length) {
            
            axios.get(`${API}/users/${user.currentUser.uuid}`)
            .then(res => {
                const refreshedUser = convertUser(res.data)
                
                setUser(refreshedUser)
                sessionStorage.setItem('user', JSON.stringify(refreshedUser))
            }).catch(err => console.log(err))
        }
        // NOTE: this means every state that needs to persist, needs to begin in this Play component
    }

    useEffect(() => {
        // on page refresh, store most up-to-date user data (wins/exp/lvl)
        refreshPage()
        // We only execute getNewEnemy() if we currently have none in sessionStorage (prevents cheating)
        // we are passing randomEnemyDeck state to children, since we don't want user to access storage in console
        if (!JSON.parse(sessionStorage.getItem('opponentDeck'))) {
            populateEnemyDeck()
        } else {
            setRandomEnemyDeck(JSON.parse(sessionStorage.getItem('opponentDeck')))
        }
    }, [])


    return (
        <div className='Play'>
            
            {/* Arena
            After you have your Pokemon, choose which ones to use first in the arena.
            When one Pokemon dies, you choose the next one to battle with.
            You can switch Pokemon out whenever you want, but then the Pokemon that has just
            been switched in will recieve the damage from the opponent's selected move. */}
            
            <Arena 
                yourDeck={addRemainingHp(yourDeck)}
                opponentDeck={randomEnemyDeck}
            />

        </div>
    )
}
