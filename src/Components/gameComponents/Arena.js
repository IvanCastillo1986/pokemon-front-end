import React, { useState, useEffect, useContext } from 'react'
import { decrementItemQuantity, applyItem, randomItemNameAndId, createBagIdsFromGame } from '../../Helper/itemFunctions'
import { calculateSharedExp, getPokeNamesFromId } from '../../Helper/expFunctions'
import { getNewLvlFromExp } from '../../Helper/lvlUpFunctions'
import { convertUser } from '../../Helper/convertUser'
import axios from 'axios'

import Bench from './Bench'
import Table from './Table'
import Discard from './Discard'

import './Arena.css'
import { UserContext } from '../../UserContext'

const API = process.env.REACT_APP_API_URL



export default function Arena({ yourDeck, opponentDeck }) {
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
    const [myItems, setMyItems] = useState(user.currentItems)
    const [deletedItemIds, setDeletedItemIds] = useState([])
    const [enemyPokemon, setEnemyPokemon] = useState({})
    const [enemyBench, setEnemyBench] = useState([])
    const [showIntro, setShowIntro] = useState(true)
    const [menuType, setMenuType] = useState('main')
    const [script, setScript] = useState("")
    const [winner, setWinner] = useState(null)
    const [discardPile, setDiscardPile] = useState({ player1Discard: [], player2Discard: [] })
    const [sharedExpIds, setSharedExpIds] = useState(new Set(/*{4, 1}*/))
    const [exp, setExp] = useState([/* {id: 6, exp: 10}, {id: 2, exp: 10}, {id: 3, exp: 30} */])


    // This changes theme and scrolls to top of page on component mount
    useEffect(() => {
        window.document.body.style.backgroundColor = '#8bac0f'
        window.scrollTo(0, 0)

        return () => {
            window.document.body.style.backgroundColor = ''
        }
    }, [])


    // handles the exp manipulation
    async function shareExpAndRunScript(totalExp) {
        const expForEach = calculateSharedExp(totalExp, sharedExpIds)

        const pokeNames = getPokeNamesFromId(sharedExpIds, yourDeck)
        const gainExpScriptArr = pokeNames.map(pokeName => `${pokeName.toUpperCase()} gained ${expForEach} EXP. Points!`)
        await handleChangeScript(gainExpScriptArr)

        return expForEach // this gets passed to giveExp, since we calculated it here
    }
    function giveExp(expForEach) {
        // this function iterates sharedExpIds set, and creates a new expObj{} object to push into exp[] array
        const newExpArr = [...exp]

        for (const id of sharedExpIds) {
            const newExpObj = { id: id, exp: expForEach }
            newExpArr.push(newExpObj)
        }
        

        setExp(() => newExpArr)
        setSharedExpIds(() => new Set())

        return newExpArr
    }


    async function declareWinner(winner, expArr) {
        const {currentUser} = user
        const winningUser = {
            email: currentUser.email,
            uuid: currentUser.uuid,
            wins: currentUser.wins + 1,
            losses: currentUser.losses
        }

        if (winner === 'player1') {
            const deckArrToUpdate = [...expArr]

            for (const expObj of deckArrToUpdate) {
                // find the Pokemon with expObj.id
                const matchingPokemon = yourDeck.find(pokemon => pokemon.id === expObj.id)
            
                // add the Pokemon's exp to expObj.exp
                expObj.exp += matchingPokemon.exp
                // calculate if the lvl matches
                const newLvl = getNewLvlFromExp(expObj.exp)
                if (newLvl === matchingPokemon.lvl) {
                    // if it does, add current Pokemon's lvl to expObj
                    expObj.lvl = matchingPokemon.lvl
                } else {
                    // else, add new higher lvl to expObj
                    expObj.lvl = newLvl
                    await handleChangeScript([`${matchingPokemon.name.toUpperCase()} grew to level ${newLvl}!`])
                }
            }

            // creates item that player wins end of match
            const { wonItemId, wonItemName } = randomItemNameAndId(4)

            // create bagIds to send to back-end
            const bagIdsFromGame = createBagIdsFromGame(myItems)

            // setScripts to player who won
            await handleChangeScript([
                `ᵖₖᵐₙ TRAINER RED was defeated!`,
                `You have won a ${wonItemName.toUpperCase()}!`
            ])

            // setMenu to prevent further displaying of anything else
            setMenuType('playerWonMenu')
            // make user API calls for exp won, items used, random item won, and games won/lost in stats
            axios.put(`${API}/users/${winningUser.uuid}?matchEnd=true`, 
                {userToUpdate: winningUser, bagIdsFromGame, wonItemId, deckArrToUpdate}
            ).then(res => {
                const updatedUser = convertUser(res.data)
                
                setUser(() => updatedUser)
                sessionStorage.setItem('user', JSON.stringify(updatedUser))
                
                // updates the winning Pokemon's current Level for display (and preserves current HP)
                const myUpdatedPokemon = updatedUser.currentPokemon.find(pokemon => pokemon.name === myPokemon.name)
                const myCurrentHp = myPokemon.remaining_hp
                myUpdatedPokemon.remaining_hp = myCurrentHp

                setMyPokemon(myUpdatedPokemon)
            }).catch(err => console.log(err))
        } else if (myBench.length < 1) {
            // I lost 
            const losingUser = {
                email: currentUser.email,
                uuid: currentUser.uuid,
                wins: currentUser.wins,
                losses: currentUser.losses + 1
            }
            // make API call to update user with +1 losses, and update their items
            setMenuType('playerLostMenu')

            const bagIdsFromGame = createBagIdsFromGame(myItems)

            axios.put(`${API}/users/${losingUser.uuid}?matchEnd=true`, 
                {userToUpdate: losingUser, bagIdsFromGame}
            ).then(res => {
                const updatedUser = convertUser(res.data)
                
                setUser(() => updatedUser)
                sessionStorage.setItem('user', JSON.stringify(updatedUser))
                
                // updates the winning Pokemon's current Level for display (and preserves current HP)
                const myUpdatedPokemon = updatedUser.currentPokemon.find(pokemon => pokemon.name === myPokemon.name)
                const myCurrentHp = myPokemon.remaining_hp
                myUpdatedPokemon.remaining_hp = myCurrentHp

                setMyPokemon(myUpdatedPokemon)
            }).catch(err => console.log(err))
        }
    }

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

    const handlePokemonSwitch = (pokeName) => {
        // save current Pokemon, so that it retains remaining_hp when sent to bench
        const oldPokemon = myPokemon

        // set newly clicked Pokemon to variable, which will later get passed into setMyPokemon
        const switchedBenchPokemon = myBench.find(mon => mon.name.toUpperCase() === pokeName.toUpperCase())
        
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




    return (
        <div className='Arena'>

            {showIntro ?
            
            <div className='intro'>
                <h1>Welcome to the Arena</h1>
                <p>Your opponent's first Pokemon will be {opponentDeck[0]?.name}.</p>
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

                <Table myPokemon={myPokemon} setMyPokemon={setMyPokemon}
                    enemyPokemon={enemyPokemon} setEnemyPokemon={setEnemyPokemon}
                    myBench={myBench} setMyBench={setMyBench} enemyBench={enemyBench} setEnemyBench={setEnemyBench}
                    winner={winner} setWinner={setWinner}
                    menuType={menuType} setMenuType={setMenuType} script={script}
                    handleUseItem={handleUseItem} myItems={myItems} deletedItemIds={deletedItemIds}
                    handlePokemonSwitch={handlePokemonSwitch}
                    setDiscardPile={setDiscardPile}
                    sharedExpIds={sharedExpIds} setSharedExpIds={setSharedExpIds}
                    handleChangeScript={handleChangeScript} shareExpAndRunScript={shareExpAndRunScript}
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
