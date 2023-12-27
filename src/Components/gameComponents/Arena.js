import React, { useState, useEffect } from 'react'
import { convertUsableItems, decrementItemQuantity, applyItem } from '../../Helper/itemFunctions'

import Bench from './Bench'
import NewTable from './NewTable'
import Discard from './Discard'

import './Arena.css'



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
    
    // This changes theme and scrolls to top of page on component mount
    useEffect(() => {
        window.document.body.style.backgroundColor = '#8bac0f'
        window.scrollTo(0, 0)

        return () => {
            window.document.body.style.backgroundColor = ''
        }
    }, [])

    const handleChangeScript = async (currentScriptArr) => {
        setMenuType('script')

        // will run scriptArr, starting with first index, and increment script time by 2000ms on each el
        for (let i = 0; i < currentScriptArr.length; i++) {

            setScript(currentScriptArr[i])
            await new Promise(res => setTimeout(res, 2000))
        }
        
        setMenuType('main')
    }

    // This function chooses the first Pokemon to battle on click
    function handleInitialClick(e) {
        // match the clicked button name with the pokemon in deck
        let myCurrentPokemon = yourDeck.find(mon => mon.name === e.target.textContent)
        
        // find the idx of chosen pokemon in deck
        const idx = yourDeck.findIndex(mon => mon.name === myCurrentPokemon.name)

        // remove this pokemon from the rest of pokemon in bench
        const bench = yourDeck.filter((pokemon, i) => i !== idx)
        
        myCurrentPokemon.remaining_hp = 1
        setMyPokemon(myCurrentPokemon)
        setMyBench(bench)

        const enemyPokemon = opponentDeck[0]
        const enemyBench = [...opponentDeck].slice(1)
        setEnemyPokemon(enemyPokemon)
        setEnemyBench(enemyBench)
        
        setShowIntro(false)

        const scriptArr = [
            `ᵖₖᵐₙ TRAINER RED wants to battle!`,
            `ᵖₖᵐₙ TRAINER RED sent out ${enemyPokemon.name.toUpperCase()}!`,
            `Go! ${myCurrentPokemon.name.toUpperCase()}!`
        ]
        handleChangeScript(scriptArr)
    }

    const handlePokemonSwitch = (e) => {
        // save current Pokemon, so that it retains remaining_hp when sent to bench
        const oldPokemon = myPokemon
        
        // set newly clicked Pokemon to variable, which will later get passed into setMyPokemon
        const switchedBenchPokemon = myBench.find(mon => mon.name === e.target.textContent)
        
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
                    menuType={menuType} setMenuType={setMenuType} script={script} setScript={setScript}
                    handleUseItem={handleUseItem} myItems={myItems} deletedItemIds={deletedItemIds}
                    handlePokemonSwitch={handlePokemonSwitch}
                    discardPile={discardPile} setDiscardPile={setDiscardPile}
                    handleChangeScript={handleChangeScript}
                />

                <Bench myBenchProp={myBench} enemyBenchProp={enemyBench} />
                
                {winner &&
                // When a Pokemon in Table dies, put them in deadMon state, so that their name renders here
                <Discard discardPile={discardPile} />
                }
            </div>
            }
            
        </div>
    )
}
