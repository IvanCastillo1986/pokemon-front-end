import React, { useState, useEffect, useContext } from 'react'
import { decrementItemQuantity, applyItem, randomItem, convertUsableItems } from '../../Helper/itemFunctions'
import axios from 'axios'

import Bench from './Bench'
import NewTable from './NewTable'
import Discard from './Discard'

import './Arena.css'
import { UserContext } from '../../UserContext'

const API = process.env.REACT_APP_API_URL



export default function Arena({ yourDeck, yourItems, opponentDeck }) {
    /* 
    This component will recieve the user and AI decks created in Deck component.
    This will be the game's parent component.
    Two rows, Player will be on the left, AI on the right.

    AI puts down a random Pokemon.
    Player will choose the Pokemon they'd like to start with.[]
    All the other Pokemon will be on the bench.

    <Table>
    <Bench>
    <Discard>
    */

    const {user, setUser} = useContext(UserContext)

    const [myPokemon, setMyPokemon] = useState({})
    const [myBench, setMyBench] = useState([])
    const [myItems, setMyItems] = useState(yourItems)
    const [deletedItemIds, setDeletedItemIds] = useState([])
    const [enemyPokemon, setEnemyPokemon] = useState({})
    const [enemyBench, setEnemyBench] = useState([])
    const [showIntro, setShowIntro] = useState(true)
    const [menuType, setMenuType] = useState('main')
    const [script, setScript] = useState("")
    const [winner, setWinner] = useState(null)
    const [discardPile, setDiscardPile] = useState({ player1Discard: [], player2Discard: [] })
    const [sharedExpIds, setSharedExpIds] = useState(new Set(/*{4, 1}*/))
    const [exp, setExp] = useState({/* 6: 10, 2: 10, 3: 30 */})


    // This changes theme and scrolls to top of page on component mount
    useEffect(() => {
        window.document.body.style.backgroundColor = '#8bac0f'
        window.scrollTo(0, 0)

        return () => {
            window.document.body.style.backgroundColor = ''
        }
    }, [])



    // These functions handle manipulation of exp
    function handleAddToSharedExp(deckId) {
        setSharedExpIds((prevExpIds) => {
            prevExpIds.add(deckId)
            return prevExpIds
        })
    }
    function handleRemoveFromSharedExp(deckId) {
        const newSharedExpIds = [...sharedExpIds].filter(pokemon => pokemon.id === deckId)
        setSharedExpIds(new Set(newSharedExpIds))
    }
    function calculateSharedExp(totExp) {
        return Math.floor(totExp / sharedExpIds.size)
    }
    function getPokeNamesFromId() {
        const namesArr = []
        sharedExpIds.forEach((id) => {
            yourDeck.forEach(pokemon => {
                if (pokemon.id === id) namesArr.push(pokemon.name)
            })
        })
        return namesArr
    }
    async function runExpScript(totalExp) {
        const expForEach = calculateSharedExp(totalExp)

        const pokeNames = getPokeNamesFromId(sharedExpIds)
        const gainExpScriptArr = pokeNames.map(pokeName => `${pokeName} gained ${expForEach} EXP. Points!`)
        await handleChangeScript(gainExpScriptArr)

        return expForEach // this gets passed to giveExp, since we calculated it here
    }
    function giveExp(expForEach) {
        const newExp = {...exp}
        
        for (const id of sharedExpIds) {
            if (newExp[id]) newExp[id] += expForEach
            else newExp[id] = expForEach
        }

        setExp(() => newExp)
        setSharedExpIds(() => new Set())

        return newExp
    }

    const trainerDefeatedScript = `ᵖₖᵐₙ TRAINER RED was defeated!`
    const winItemScript = `You got *wonItem* for winning!`
    
    const {currentUser} = user
    const winningUser = {
        email: currentUser.email,
        uuid: currentUser.uuid,
        has_chosen_starter: true,
        wins: currentUser.wins + 1,
        losses: currentUser.losses
    }

    // Change this by setting check bench condition in <NewTable />
    async function declareWinner(winner, expObj) {
        // check if any benches are empty
        if (winner === 'player1') {
            // ToDo: play the scripts, make the api calls, then setMenu to playerWonMenu
            // setScripts to player who won
            await handleChangeScript([
                `ᵖₖᵐₙ TRAINER RED was defeated!`,
            ])
            
            // setMenu to prevent further displaying of anything else
            setMenuType('playerWonMenu')
            // ToDo: make user API calls for exp won, items used, random item won, and games won/lost in stats
            axios.put(`${API}/users/${user.currentUser.uuid}?matchEnd=true`, {user: winningUser, gainedExpObj: expObj})
            .then(res => {
                const updatedUser = {
                    currentUser: res.data.updatedUser,
                    currentPokemon: res.data.updatedUserPokemon,
                    currentItems: convertUsableItems(res.data.updatedItems),
                }
                
                setUser(() => updatedUser)
                sessionStorage.setItem('user', JSON.stringify(updatedUser))
            }).catch(err => console.log(err.message))
        } else if (myBench.length < 1) {
            // I lost 
            setMenuType('playerLostMenu')
        }
    }

/* 
    ToDo:
    Now that we have populated exp{} state after winning match, send data to /user Update route.

    Make call to user.put with updated status:
    win/loss  DONE
    updated Pokemon exp in decks
        send updated exp item to back-end route for processing
        How to do this?
        * either transform the exp object in front-end, or in back-end
        * exp = {
            "1": 6,
            "2": 6,
            "6": 6
        }
    updated items
        win one random item after match

*/

    // FROM OLD TABLE
    // update user and return updated user, updated items, with query to get that user's updated pokemon as well
    // axios.put(`${API}/users/${currentUser.uuid}?getPokemon=true`, winningUser)
    //     .then(res => {
    //         const newSessionUser = {
    //             currentUser: res.data.updatedUser,
    //             currentPokemon: res.data.updatedUserPokemon,
    //             currentItems: convertUsableItems(res.data.updatedItems)
    //         }
    //         sessionStorage.setItem('user', JSON.stringify(newSessionUser))
    //         setUser(newSessionUser)
    //         console.log('newSessionUser after winning:', newSessionUser)
    //     }).catch(err => console.log('error updating winning user:', err.message))





    const handleChangeScript = async (currentScriptArr) => {
        setMenuType('script')

        // will run scriptArr, starting with first index, and increment script time by 2000ms on each el
        for (let i = 0; i < currentScriptArr.length; i++) {

            setScript(currentScriptArr[i])
            await new Promise(res => setTimeout(res, 500))
        }
        
        setMenuType('main')
    }



    // This function chooses the first Pokemon to battle on click
    // Also sets the bench for each player
    function handleInitialClick(e) {
        // match the clicked button name with the pokemon in deck
        let myClickedPokemon = yourDeck.find(mon => mon.name === e.target.textContent)
        
        // find the idx of chosen pokemon in deck
        const idx = yourDeck.findIndex(mon => mon.name === myClickedPokemon.name)

        // remove this pokemon from the rest of pokemon in bench
        const bench = yourDeck.filter((pokemon, i) => i !== idx)
        
        // myClickedPokemon.remaining_hp = 1
        setMyPokemon(myClickedPokemon)
        setMyBench(bench)

        const enemyPokemon = opponentDeck[0]
        const enemyBench = [...opponentDeck].slice(1)
        setEnemyPokemon(enemyPokemon)
        setEnemyBench(enemyBench)
        
        setShowIntro(false)

        const scriptArr = [
            `ᵖₖᵐₙ TRAINER RED wants to battle!`,
            `ᵖₖᵐₙ TRAINER RED sent out ${enemyPokemon.name.toUpperCase()}!`,
            `Go! ${myClickedPokemon.name.toUpperCase()}!`
        ]
        handleChangeScript(scriptArr)
    }

    const handlePokemonSwitch = (e) => {
        // save current Pokemon, so that it retains remaining_hp when sent to bench
        const oldPokemon = myPokemon

        // set newly clicked Pokemon to variable, which will later get passed into setMyPokemon
        const switchedBenchPokemon = myBench.find(mon => mon.name.toUpperCase() === e.target.textContent)
        
        // Will pull newPokemon from the bench
        // Will add oldPokemon to the bench
        const myNewBench = myBench.filter(mon => mon.name !== switchedBenchPokemon.name)
        myNewBench.push(oldPokemon)

        // replace old myPokemon with new myPokemon
        // old Pokemon retains current remaining_hp
        setMyPokemon(switchedBenchPokemon)
        setMyBench(myNewBench)

        handleChangeScript([`Go! ${switchedBenchPokemon.name.toUpperCase()}!`])
    }


    const handleUseItem = (item, myPokemon) => {
        // This function not only decrements quantity from myItems[] item onClick,
        // It also adds the itemId to deleteItemIds[] to use in Delete API call after player wins/loses
        // It also applies the item effect to Pokemon and sets myPokemon state
        
        const selectedItemName = item.item_name
        
        const deletedItemId = item.bagIdArr[0]
        const newDeletedItemIds = [...deletedItemIds, Number(deletedItemId)]
        
        const newItemsArr = [...myItems]
        const itemDecrementedArr = decrementItemQuantity(newItemsArr, selectedItemName)

        setMyItems(itemDecrementedArr)
        setDeletedItemIds(newDeletedItemIds)

        const effectedPokemon = applyItem(item, myPokemon)
        setMyPokemon(effectedPokemon)
    }

    const handleLevelUp = () => {
        // recieves pokemon, checks if it has received enough experience, level up or do nothing
    }



    return (
        <div className='Arena'>

            {showIntro ?
            
            <div className='intro'>
                <h1>Welcome to the Arena</h1>
                <p>Your opponent's first Pokemon will be {opponentDeck[0].name}.</p>
                <p>Which Pokemon would you like to start the battle with?</p>
                <div className='buttonDiv'>
                    {yourDeck.map((pokemon) => {
                        return (
                            <button key={pokemon.id} onClick={handleInitialClick}>{pokemon.name}</button>
                            )
                        })}
                </div>
            </div>

            :

            <div className='game'>
                <div className='playerDiv'>
                    <h2>Player 1</h2>
                    <h2>Player 2</h2>
                </div>

                <NewTable myPokemon={myPokemon} setMyPokemon={setMyPokemon}
                    enemyPokemon={enemyPokemon} setEnemyPokemon={setEnemyPokemon}
                    myBench={myBench} setMyBench={setMyBench} enemyBench={enemyBench} setEnemyBench={setEnemyBench}
                    winner={winner} setWinner={setWinner}
                    menuType={menuType} setMenuType={setMenuType} script={script}
                    handleUseItem={handleUseItem} myItems={myItems} deletedItemIds={deletedItemIds}
                    handlePokemonSwitch={handlePokemonSwitch}
                    setDiscardPile={setDiscardPile}
                    handleChangeScript={handleChangeScript} runExpScript={runExpScript}
                    handleAddToSharedExp={handleAddToSharedExp} handleRemoveFromSharedExp={handleRemoveFromSharedExp}
                    giveExp={giveExp} declareWinner={declareWinner}
                />

                <Bench myBenchProp={myBench} enemyBenchProp={enemyBench} />
                
                {(Object.keys(discardPile.player1Discard).length > 0 || Object.keys(discardPile.player2Discard).length) > 0 &&
                // When a Pokemon in Table dies and they're placed in discardPile, this renders <Discard />
                <Discard discardPile={discardPile} />
                }
            </div>
            }
            
        </div>
    )
}
