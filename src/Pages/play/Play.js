import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { createRandomPokemonIds } from '../../Helper/createRandomPokemonIds'
import { addRemainingHp } from '../../Helper/addRemainingHp'
import axios from 'axios'

import Deck from '../../Components/gameComponents/Deck'
import Arena from '../../Components/gameComponents/Arena'

import './Play.css'
import { convertUser } from '../../Helper/convertUser'
import { assignDVs, calculateRaisedStats } from '../../Helper/statsFunctions'
const API = process.env.REACT_APP_API_URL


export default function Play() {
    // Here, we will choose the ai player's deck and render all of the game's components.
    // We hand down yourDeck and aiDeck props to manipulate pokemon's state like hp during battles.
    // During battles, we'll manipulate the UserContext's pokemon exp and lvls.
    // API calls and changes to UserContext will only be made from Play page and Deck.
    // Arena component will encapsulate and manipulate all of it's local state relating to the game.
    // Table, Bench, and Discard components will be used as Arena's children in the game portion.
    
    const { user, setUser } = useContext(UserContext)
    const sessionUser = JSON.parse(sessionStorage.getItem('user'))
    const whichComponent = sessionUser.currentUser.has_chosen_starter ? 'arena' : 'deck'
    const [currentComponent, setCurrentComponent] = useState(whichComponent)
    
    const [yourDeck, setYourDeck] = useState(user.currentPokemon)
    const [yourItems, setYourItems] = useState(user.currentItems)

    function setOpponentDeck() {
        if (yourDeck.length > 5) {
            // set opponent starter as weakness to your starter
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
            // const randomPokemonIdArr = [enemyStarterId].concat(createRandomPokemonIds(5)) // NORMAL GAME
            const randomPokemonIdArr = [enemyStarterId].concat(createRandomPokemonIds(0)) // 1 ENEMY
            // create array with 6 API promises
            const pokemonApiPromises = randomPokemonIdArr.map(pokemonId => {
                return axios.get(`${API}/pokemon/${pokemonId}`)
            })
            
            // make all API calls at once with Promise.all() and add to sessionStorage opponentDeck
            Promise.all(pokemonApiPromises)
            .then(resArray => {
                // add remaining_hp property to enemy's deck
                // addRemainingHp(resArray) // CHANGE THIS BACK HERE
                resArray.forEach(res => {
                    const enemyPokemon = res.data
                    enemyPokemon.remaining_hp = enemyPokemon.hp
                    enemyPokemon.pokemon_id = enemyPokemon.id
                    enemyPokemon.id += 2000
                    enemyPokemon.lvl = 1
                    aiDeckArr.push(enemyPokemon)
                    // enemyPokemon will now have .remaining_hp, .pokemon_id, and .id += 2000 (to prevent accidental comparisons)
                })

                // console.log('aiDeckArr before changing', aiDeckArr)
                raiseEnemyPokemonStats(aiDeckArr)
                addRemainingHp(aiDeckArr)
                // console.log('aiDeckArr after changing', aiDeckArr)

                // HERE I AM SETTING opponentDeck WITHIN STORAGE INSTEAD OF useState OR UserContext
                sessionStorage.setItem('opponentDeck', JSON.stringify(aiDeckArr))
            }).catch(err => console.log(err))
        }
    }
    setOpponentDeck()

    function raiseEnemyPokemonStats(opponentDeck) {
        const pokemonDVs = opponentDeck.map(pokemon => assignDVs(pokemon))

        opponentDeck.forEach((pokemon) => {
            const matchingDvObj = pokemonDVs.find(dvObj => dvObj.deckId === pokemon.id)
            calculateRaisedStats(pokemon, matchingDvObj)
        })
    }


    function refreshPage() {
        if (sessionUser) {
            
            axios.get(`${API}/users/${sessionUser.currentUser.uuid}`)
            .then(res => {
                // userUpdate = {
                //     currentUser: res.data.user, currentPokemon: res.data.userPokemon, currentItems: convertUsableItems(res.data.userItems)
                // }

                const refreshedUser = convertUser(res.data)
                console.log('page has refreshed:', refreshedUser)
                
                sessionStorage.setItem('user', JSON.stringify(refreshedUser))
                setUser(refreshedUser)
            })
        }
        // NOTE: this means every state that needs to persist, needs to begin in this Play component
        
        // this adds currentComponent to sessionStorage, so that a new player can't refresh for infinite starters during select
        if (yourDeck.length > 5) setCurrentComponent('arena')
    }
    useEffect(() => {
        // on page refresh, store most up-to-date user data (wins/exp/lvl)
        refreshPage()
    }, [])


    return (
        <div className='Play'>
            {currentComponent === 'deck'
                ?
                <Deck 
                    yourDeck={yourDeck}
                    setYourDeck={setYourDeck}
                    setCurrentComponent={setCurrentComponent}
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
                    yourDeck={addRemainingHp(yourDeck)} yourItems={yourItems}
                />
            }

        </div>
    )
}
