import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { addRemainingHp } from '../../Helper/addRemainingHp'
import axios from 'axios'

import Arena from '../../Components/gameComponents/Arena'

import './Play.css'
import { convertUser } from '../../Helper/convertUser'
import { raisePokemonStats } from '../../Helper/statsFunctions'
const API = process.env.REACT_APP_API_URL


export default function Play() {

    // return <h1>Rendering Play page!!</h1>
    
    const { user, setUser } = useContext(UserContext)
    const sessionUser = JSON.parse(sessionStorage.getItem('user'))
    
    const [yourDeck, setYourDeck] = useState(user.currentPokemon)
    const [randomEnemyDeck, setRandomEnemyDeck] = useState([])
    console.log('---------------------')
    console.log('yourDeck:', yourDeck)
    console.log('randomEnemyDeck:', randomEnemyDeck)
    console.log('user:', user)

    function populateEnemyDeck() { // this doesn't finish running
        console.log('inside populateEnemyDeck')
        // set opponent starter as weakness to your starter
        console.log(yourDeck) // last log
        const yourStarter = yourDeck.find(pkm => pkm.pokemon_id === 1 || pkm.pokemon_id === 4 || pkm.pokemon_id === 7)
        let enemyStarterId;

        switch(yourStarter.pokemon_id) { // breaking here
            case 1:
                enemyStarterId = 4
                break;
            case 4:
                enemyStarterId = 7
                break;
            default:
                enemyStarterId = 1
                break;
        }
        // API call that returns 6 random enemyPokemon + enemyStarter
        axios.get(`${API}/pokemon?getEnemyDeck=true&enemyStarterId=${enemyStarterId}`)
        .then(res => {
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
            // sessionStorage.setItem('opponentDeck', JSON.stringify(enemyDeck))
            // setRandomEnemyDeck(JSON.parse(sessionStorage.getItem('opponentDeck')))
            setRandomEnemyDeck(enemyDeck)
            
            console.log('made enemyDeck API call')
        }).catch(err => console.log(err))
    }


    function refreshPage() {

        if (user.currentPokemon.length) {
            
            axios.get(`${API}/users/${user.currentUser.uuid}`)
            .then(res => {
                console.log('making user.put call in refreshPage')
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
