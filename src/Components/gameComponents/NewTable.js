import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'

import BattleCard from './BattleCard'
import Script from './Script'

import { capitalize } from '../../Helper/capitalize'
import { typeMultiplier } from '../../Helper/typeMultiplier'
import { convertUsableItems, randomItem } from '../../Helper/itemFunctions'

const API = process.env.REACT_APP_API_URL



// HELPER FUNCTIONS. WILL MOVE TO HELPER FILE LATER
const statFluctuation = (stat, minVal, maxVal) => {
    // randomize the stat between two different values (ex: speed = dmg * .7 and 1.3)
    return Math.floor((Math.random() * (maxVal - minVal) + minVal) * stat)
}
const formatName = (name) => {
    return capitalize(name).toUpperCase()
}


export default function NewTable({ 
    myPokemon, enemyPokemon, setMyPokemon, setEnemyPokemon, myBench, setMyBench, enemyBench, setEnemyBench, 
    menuType, setMenuType, script, handleUseItem, myItems, deletedItemIds, handlePokemonSwitch, 
    setDiscardPile, handleChangeScript, runExpScript, handleAddToSharedExp, handleRemoveFromSharedExp, 
    giveExp
}) {


    const { user, setUser } = useContext(UserContext)

    const [myMove, setMyMove] = useState(null)
    const [enemyMove, setEnemyMove] = useState(null)



    function assignMoves(clickedMove) {
        setMyMove(() => clickedMove)

        const enemyMoveIdx = Math.floor(Math.random() * 2)
        const randomEnemyMove = enemyMoveIdx === 0 ? enemyPokemon.move1 : enemyPokemon.move2
        setEnemyMove(() => randomEnemyMove)
        return { myMove: clickedMove, enemyMove: randomEnemyMove }
    }
    function assignAttackOrder() {
        let fastPkm, slowPkm
        const mySpeed = statFluctuation(myPokemon.speed, .7, 1.3)
        const enemySpeed = statFluctuation(enemyPokemon.speed, .7, 1.3)

        // assign who attacks first
        if (mySpeed > enemySpeed) {
            fastPkm = {...myPokemon}
            slowPkm = {...enemyPokemon}
        } else {
            fastPkm = {...enemyPokemon}
            slowPkm = {...myPokemon}
        }
        return { fastPkm, slowPkm }
    }

    function applyEffect(atkType, defType) {
        // check if there is weakness or resistance. Returns .5, 1, 1.5
        const effect = typeMultiplier(atkType, defType)
        return effect
    }
    async function ifEffectRunScript(effect) {
        // run script for type effect (if applied)
        if (effect > 1) {
            await handleChangeScript([`It's super effective!`])
        } else if (effect < 1) {
            await handleChangeScript([`It's not very effective...`])
        }
    }

    // choose new enemyPkm, sets enemyBench, minus newly chosen Pokemon
    function getNewEnemyPkm() {
        const randomIdx = Math.floor(Math.random() * enemyBench.length)
        const newEnemyPokemon = enemyBench[randomIdx]
        setEnemyPokemon(newEnemyPokemon)
        return newEnemyPokemon
    }
    function updateEnemyBench(newEnemyPkm) {
        const newEnemyBench = enemyBench.filter(mon => mon.name !== newEnemyPkm.name)
        setEnemyBench(newEnemyBench)
    }



// -------------------------------------------------------------------------------------------------------------------



    // Execute calculated damage on attacked Pokemon's remaining_hp, run script
    async function pokemonIsAttacked(atkPkm, defPkm, myMove, enemyMove) {
        let iMoveFirst = myPokemon.name === atkPkm.name ? true : false

        // check for type effect
        const effect = applyEffect(atkPkm.type1, defPkm.type1)
        // calculate the damage
        const dmg = statFluctuation( Math.round((3 * atkPkm.atk * 5) / defPkm.def * effect) , .8 , 1.2 )
        // (future animation executed here)

        let hpAfterDmg
        if (iMoveFirst) {
            handleAddToSharedExp(myPokemon.id)
            await handleChangeScript([`${myPokemon.name.toUpperCase()} used ${myMove.toUpperCase()}!`])
            hpAfterDmg = enemyPokemon.remaining_hp - dmg > 0 ? enemyPokemon.remaining_hp - dmg : 0
        } else {
            await handleChangeScript([`Enemy ${enemyPokemon.name.toUpperCase()} used ${enemyMove.toUpperCase()}!`])
            hpAfterDmg = myPokemon.remaining_hp - dmg > 0 ? myPokemon.remaining_hp - dmg : 0
        }
        
        await ifEffectRunScript(effect)
        
        defPkm.remaining_hp = hpAfterDmg

        if (iMoveFirst) {
            setEnemyPokemon(prevPkm => ({...prevPkm, remaining_hp: defPkm.remaining_hp}))
        } else {
            setMyPokemon(prevPkm => ({...prevPkm, remaining_hp: defPkm.remaining_hp}))
        }

        return defPkm
    }



    // this gets clicked, then the rest of the function 
    async function handleClickPokemonAfterKO(e) {
        
        const clickedPokemon = e.target.textContent
        const switchedBenchPokemon = myBench.find(mon => mon.name === clickedPokemon)

        const myNewBench = myBench.filter(mon => {
            return mon.name !== switchedBenchPokemon.name
        })

        setMyPokemon(switchedBenchPokemon)
        setMyBench(myNewBench)
        await handleChangeScript([`Go ${switchedBenchPokemon.name.toUpperCase()}!`])
        setMenuType('main')
    }

    // Checks if defending Pokemon is dead. If true, run script and update discardPile. Bring out next Pokemon.
    async function ifDeadExecuteKnockout(checkedPkm) {
        // checks if pokemon is dead, adds to discard pile, executes getNewPokemonAfterKO()
        const isPokemonDead = checkedPkm.remaining_hp <= 0 ? true : false
        const imDead = checkedPkm.name == myPokemon.name ? true : false

        if (isPokemonDead) {
            if (imDead) {
                // send my pokemon to discard, run script, bring out my next pokemon
                setDiscardPile(prevDiscardPile => {
                    return {...prevDiscardPile, player1Discard: prevDiscardPile.player1Discard.concat(checkedPkm)}
                })
                handleRemoveFromSharedExp(myPokemon.id)
                await handleChangeScript([`${myPokemon.name.toUpperCase()} fainted!`])
                setMenuType('newPokemonAfterKO')
            } else {
                // send enemy pokemon to discard, bring out random pokemon
                setDiscardPile(prevDiscardPile => {
                    return {...prevDiscardPile, player2Discard: prevDiscardPile.player2Discard.concat(checkedPkm)}
                })
                await handleChangeScript([`Enemy ${enemyPokemon.name.toUpperCase()} fainted!`])
                // POKEMON gained 3728 EXP. Points!
                const expForEach = await runExpScript(20)
                giveExp(expForEach)

                const newEnemyPokemon = getNewEnemyPkm()
                updateEnemyBench(newEnemyPokemon)
                await handleChangeScript([`ᵖₖᵐₙ TRAINER BLUE sent out ${newEnemyPokemon.name.toUpperCase()}!`])
            }
            return true
        }
    }


    // To be called twice. One for defending slowPokemon input, and one for fastPokemon
    async function executeTurn(atkPkm, defPkm, myMove, enemyMove) {
        const defgPkm = await pokemonIsAttacked(atkPkm, defPkm, myMove, enemyMove)
        const pokemonHasDied = await ifDeadExecuteKnockout(defgPkm)
        if (pokemonHasDied) return true
    }

    async function handleClickMoveBtn(move) {
        const { myMove, enemyMove } = assignMoves(move) // should return enemy's moves
        const { fastPkm, slowPkm } = assignAttackOrder() // return which Pokemon attacks first and last
        const pokemonHasDied = await executeTurn(fastPkm, slowPkm, myMove, enemyMove) // perform everything resulting from atk, updating hp, dying, etc.
        if (!pokemonHasDied) { // if defending Pokemon is not dead, THEN executeTurn for slowPkm
            await executeTurn(slowPkm, fastPkm, myMove, enemyMove)
        }
    }


    /* 
        ToDo:  For every setScript, add the time to add to total in order to render in proper order
    */
    

    /* 
        DONE
        Step 1:  After move is clicked, assign the moves to state. 
        DONE
        Step 2:  Decide who goes first. Check both pokemon's speed. Set fastPkm, slowPkm in state.
        DONE
        Step 3a:  First pokemon turn. Calculate dmg. Check for resistance/weakness effect. Run script Execute changes to hp. 
        DONE
        Step 3b:  Check if Pokemon has died. Check if remaining_hp < 1.
        DONE
        Step 3c:  Run pkmFainted script. Send to discardPile. Also trigger event that switches to the next Pokemon.
        DONE
        Step 3d:  Function that allows me to switch to next Pokemon.
        DONE
        Step 3e:  Function that brings out the enemy's next random Pokemon.
        
        
        
        DONE
        Step 4a:  Second pokemon turn. Calculate dmg. Check for resistance/weakness effect. Run script Execute changes to hp. 
        DONE
        Step 4b:  Check if Pokemon has died. Check if remaining_hp < 1.
        DONE
        Step 4c:  Run pkmFainted script. Also trigger event that switches to the next Pokemon.

    */



   
    const menuClick = (menuType) => {
        setMenuType(menuType)
    }

    const renderItemMenu = () => {
        if (myItems.length > 0) {
            return <div className='itemMenu'>
                <span className='prompt'>Which item would you like to use?</span>
                    <div className='itemsContainer'>
                    {myItems.map((item) => {
                        return (
                        <div className='itemOption' key={item.item_name}>
                            <span 
                                className='name' onClick={() => handleUseItem(item, myPokemon)}
                            >
                                {item.item_name}
                            </span>
                            <span className='quantity'> x {item.quantity}</span>
                        </div>
                    )})}
                    </div>
                <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
            </div>
        } else {
            return <div className='noItemsDiv'>
                <span>You are out of items</span>
                <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
            </div>
        }
    }

    return (
        <div className='Table'>
            <div className='player1Table'>
                <p className='hp-display'>HP: {myPokemon.remaining_hp}/{myPokemon.hp}</p>
                <BattleCard pokemon={myPokemon} />
            </div>
            
            <div className='screen'>


                {menuType === 'script' &&
                    <Script script={script} />
                }

                {menuType === 'main' &&
                <div className='mainTable'>
                    <span className='fight' onClick={() => menuClick('fight')}>FIGHT</span>
                    <span className='switch' onClick={() => menuClick('switch')}>SWITCH</span>
                    <span className='item' onClick={() => menuClick('item')}>ITEM</span>
                    <span className='defend'>DEFEND</span>
                </div> 
                }
                
                {menuType === 'fight' &&
                <div className='fightMenu'>
                    <span onClick={() => handleClickMoveBtn(myPokemon.move1)}>
                        {capitalize(myPokemon.move1)}
                    </span>
                    <span onClick={() => handleClickMoveBtn(myPokemon.move2)}>
                        {capitalize(myPokemon.move2)}
                    </span>

                    <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
                </div>
                }

                {menuType === 'switch' &&
                <div className='switchMenu'>
                    <span>Which Pokemon would you like to switch to?</span>
                    <div className='switchOptions'>
                        {myBench.map((pokemon, i) => {
                            return <span onClick={handlePokemonSwitch} key={i}>{pokemon.name.toUpperCase()}</span>
                        })}
                    </div>
                    <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
                </div>
                }

                {menuType === 'item' && 
                    renderItemMenu()
                }

                {menuType === 'newPokemonAfterKO' &&
                <div className='switchMenu'>
                    <span>Which Pokemon would you like to use next?</span>
                    <div className='switchOptions'>
                        {myBench.map((pokemon, i) => {
                            return <span onClick={(e) => handleClickPokemonAfterKO(e)} key={i}>{pokemon.name}</span>
                        })}
                    </div>
                </div>
                }
            </div>


            <div className='player2Table'>
            <p className='hp-display'>HP: {enemyPokemon.remaining_hp}/{enemyPokemon.hp}</p>
                <BattleCard pokemon={enemyPokemon} />
            </div>
        </div>
    )
}
