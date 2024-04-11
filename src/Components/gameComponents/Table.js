import React from 'react'
import { handleAddToSharedExp, handleRemoveFromSharedExp } from '../../Helper/expFunctions'
import { calculateDmg, applyEffect } from '../../Helper/combatFunctions'

import BattleScreen from './BattleScreen'



// HELPER FUNCTIONS. WILL MOVE TO HELPER FILE LATER
const statFluctuation = (stat, minVal, maxVal) => {
    // randomize the stat between two different values (ex: speed = dmg * .7 and 1.3)
    return Math.floor((Math.random() * (maxVal - minVal) + minVal) * stat)
}



export default function Table({ 
    myPokemon, enemyPokemon, setMyPokemon, setEnemyPokemon, myBench, setMyBench, enemyBench, setEnemyBench, 
    menuType, setMenuType, script, handleUseItem, myItems, handlePokemonSwitch, 
    setDiscardPile, handleChangeScript, shareExpAndRunScript, 
    giveExp, declareWinner, sharedExpIds, setSharedExpIds
}) {


    function assignMoves(clickedMove) {
        const enemyMoveIdx = Math.floor(Math.random() * 2)
        const randomEnemyMove = enemyMoveIdx === 0 ? enemyPokemon.move1 : enemyPokemon.move2
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
        setEnemyPokemon(() => newEnemyPokemon)
        return newEnemyPokemon
    }
    function updateEnemyBench(newEnemyPkm) {
        const newEnemyBench = enemyBench.filter(mon => mon.id !== newEnemyPkm.id)
        setEnemyBench(() => newEnemyBench)
    }



// -------------------------------------------------------------------------------------------------------------------



    // Execute calculated damage on attacked Pokemon's remaining_hp, run script
    async function pokemonIsAttacked(atkPkm, defPkm, myMove, enemyMove) {
        let iMoveNow = myPokemon.id === atkPkm.id ? true : false

        // check for type effect
        const effect = applyEffect(atkPkm.type1, defPkm.type1)
        // calculate the damage
        // const dmg = statFluctuation( Math.round((3 * atkPkm.atk * 5) / defPkm.def * effect) , .8 , 1.2 )
        const dmg = Math.ceil(calculateDmg(atkPkm, defPkm) * effect)
        // (future animation executed here)

        let hpAfterDmg
        if (iMoveNow) {
            setSharedExpIds(handleAddToSharedExp(myPokemon.id, sharedExpIds))
            await handleChangeScript([`${myPokemon.name.toUpperCase()} used ${myMove.toUpperCase()}!`])
            hpAfterDmg = enemyPokemon.remaining_hp - dmg > 0 ? enemyPokemon.remaining_hp - dmg : 0
        } else {
            await handleChangeScript([`Enemy ${enemyPokemon.name.toUpperCase()} used ${enemyMove.toUpperCase()}!`])
            hpAfterDmg = myPokemon.remaining_hp - dmg > 0 ? myPokemon.remaining_hp - dmg : 0
        }
        
        await ifEffectRunScript(effect)
        
        defPkm.remaining_hp = hpAfterDmg

        if (iMoveNow) {
            setEnemyPokemon(prevPkm => ({...prevPkm, remaining_hp: defPkm.remaining_hp}))
        } else {
            setMyPokemon(prevPkm => ({...prevPkm, remaining_hp: defPkm.remaining_hp}))
        }

        return defPkm
    }


    // this gets clicked, then the rest of the function 
    async function handleClickPokemonAfterKO(deckId) {
        
        const switchedBenchPokemon = myBench.find(pokemon => pokemon.id === deckId)

        const myNewBench = myBench.filter(mon => {
            return mon.id !== switchedBenchPokemon.id
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
        const imDead = checkedPkm.id === myPokemon.id ? true : false

        if (isPokemonDead) {
            
            if (imDead) {
                // send my pokemon to discard, run script, bring out my next pokemon
                setDiscardPile(prevDiscardPile => {
                    return {...prevDiscardPile, player1Discard: prevDiscardPile.player1Discard.concat(checkedPkm)}
                })
                
                setSharedExpIds(handleRemoveFromSharedExp(myPokemon.id, sharedExpIds))
                await handleChangeScript([`${myPokemon.name.toUpperCase()} fainted!`])
                
                // if condition to check if user won
                // function to check bench, interrupt flow, then trigger winner.
                if (myBench.length < 1) {
                    // if player lost
                    declareWinner('player2')
                } else {
                    setMenuType('newPokemonAfterKO')
                }
            } else {
                // send enemy pokemon to discard, bring out random pokemon
                setDiscardPile(prevDiscardPile => {
                    return {...prevDiscardPile, player2Discard: prevDiscardPile.player2Discard.concat(checkedPkm)}
                })
                await handleChangeScript([`Enemy ${enemyPokemon.name.toUpperCase()} fainted!`])
                // POKEMON gained 3728 EXP. Points!
                const expForEach = await shareExpAndRunScript(20)
                const newExpArr = giveExp(expForEach)

                if (enemyBench.length < 1) {
                    // if enemy lost
                    declareWinner('player1', newExpArr)
                } else {   
                    const newEnemyPokemon = getNewEnemyPkm()
                    updateEnemyBench(newEnemyPokemon)
                    await handleChangeScript([`ᵖₖᵐₙ TRAINER BLUE sent out ${newEnemyPokemon.name.toUpperCase()}!`])
                }
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


    return (
        <div className='Table'>
            <h1>Defeat trainer Red!</h1>

            <BattleScreen myPokemon={myPokemon} enemyPokemon={enemyPokemon}
                menuType={menuType} setMenuType={setMenuType}
                script={script} myItems={myItems} handleUseItem={handleUseItem}
                handleClickMoveBtn={handleClickMoveBtn} myBench={myBench}
                handlePokemonSwitch={handlePokemonSwitch} handleClickPokemonAfterKO={handleClickPokemonAfterKO}
            />
        </div>
    )
}
