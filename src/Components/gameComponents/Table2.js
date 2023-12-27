import React, { useState, useEffect, useContext } from 'react'
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


export default function Table2({ 
    myPokemon, enemyPokemon, setMyPokemon, setEnemyPokemon, myBenchProp, enemyBenchProp, setEnemyBench, 
    winner, setWinner, menuType, setMenuType, script, setScript, handleUseItem, myItems, deletedItemIds, 
    handlePokemonSwitch, handleNewPokemonAfterKO, discardPile, setDiscardPile, handleChangeScript
}) {


    const { user, setUser } = useContext(UserContext)

    const [deckExpArr, setDeckExpArr] = useState([])

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
            // setIMoveFirst(() => true, fastPkm = {...myPokemon}, slowPkm = {...enemyPokemon})
            // setFastPokemon(() => myPokemon)
            // setSlowPokemon(() => enemyPokemon)
        } else {
            fastPkm = {...enemyPokemon}
            slowPkm = {...myPokemon}
        }
        return { fastPkm, slowPkm }
    }

    const myAtkScript = `${myPokemon.name} used ${myMove}!`
    const enemyAtkScript = `Enemy ${enemyPokemon.name} used ${enemyMove}!`

    const superEffectiveScript = `It's super effective!`
    const notEffectiveScript = `It's not very effective...`

    const myPkmFainted = `${myPokemon.name} fainted!`
    const enemyPkmFainted = `Enemy ${enemyPokemon.name} fainted!`

    const iPickedPokemonScript = `Go ${myPokemon.name.toUpperCase()}!`
    const enemyPickedPokemonScript = `ᵖₖᵐₙ TRAINER BLUE sent out ${enemyPokemon.name.toUpperCase()}!`

    function applyEffect(atkType, defType) {
        // check if there is weakness or resistance. Returns .5, 1, 1.5
        const effect = typeMultiplier(atkType, defType)
        return effect
    }
    function ifEffectRunScript(effect) {
        // run script for type effect (if applied)
        if (effect > 1) {
            // setScript(superEffectiveScript)
            handleChangeScript(superEffectiveScript)
        } else if (effect < 1) {
            // setScript(notEffectiveScript)
            handleChangeScript(notEffectiveScript)
        }
    }

    // sets enemyBench, minus newly chosen Pokemon
    function updateEnemyBench(newEnemyPkm) {
        const newEnemyBench = enemyBenchProp.filter(mon => mon.name !== newEnemyPkm.name)
        setEnemyBench(newEnemyBench)
    }

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
            // setScript(myAtkScript)
            await handleChangeScript([`${myPokemon.name} used ${myMove}!`])
            hpAfterDmg = enemyPokemon.remaining_hp - dmg > 0 ? enemyPokemon.remaining_hp - dmg : 0
        } else {
            // setScript(enemyAtkScript)
            await handleChangeScript([`Enemy ${enemyPokemon.name} used ${enemyMove}!`])
            hpAfterDmg = myPokemon.remaining_hp - dmg > 0 ? myPokemon.remaining_hp - dmg : 0
        }
        
        // ifEffectRunScript(effect)
        
        defPkm.remaining_hp = hpAfterDmg

        if (iMoveFirst) {
            setEnemyPokemon(prevPkm => ({...prevPkm, remaining_hp: defPkm.remaining_hp}))
        } else {
            setMyPokemon(prevPkm => ({...prevPkm, remaining_hp: defPkm.remaining_hp}))
        }

        return defPkm
    }

    // Checks if defending Pokemon is dead. If true, run script and set in discardPile. Bring out next Pokemon.
    function ifDeadExecuteKnockout(checkedPkm) {
        // checks if pokemon is dead, adds to discard pile, executes getNewPokemonAfterKO()
        const isPokemonDead = checkedPkm.remaining_hp <= 0 ? true : false
        const imDead = checkedPkm.name == myPokemon.name ? true : false

        if (isPokemonDead) {
            if (imDead) {
                // send my pokemon to discard, run script, bring out my next pokemon
                setDiscardPile(prevDiscardPile => {
                    return {...prevDiscardPile, player1Discard: prevDiscardPile.player1Discard.concat(enemyPokemon)}
                })
                handleChangeScript(myPkmFainted)
                // setScript(myPkmFainted)
                getNewPokemonAfterKO(checkedPkm)
            } else {
                // send enemy pokemon to discard, bring out random pokemon
                setDiscardPile(prevDiscardPile => {
                    return {...prevDiscardPile, player2Discard: prevDiscardPile.player2Discard.concat(enemyPokemon)}
                })
                handleChangeScript(enemyPkmFainted)
                // setScript(enemyPkmFainted)
                getNewPokemonAfterKO(checkedPkm)
            }
        }
    }

    function getNewPokemonAfterKO(deadPkm) {
        // after KO, gets my new Pokemon or enemy's new Pokemon, and updates bench
        const imDead = myPokemon.name == deadPkm.name ? true : false
        
        if (imDead) {
            setMenuType('newPokemonAfterKO')
            // setScript(iPickedPokemonScript)
            handleChangeScript(iPickedPokemonScript)
        } else {
            const randomIdx = Math.floor(Math.random() * enemyBenchProp.length)
            const newEnemyPokemon = enemyBenchProp[randomIdx]
            setEnemyPokemon(newEnemyPokemon)
            // setScript(enemyPickedPokemonScript)
            handleChangeScript(enemyPickedPokemonScript)
            
            // Now, switch the enemy bench with the new bench minus KO'd Pokemon (my bench populated from handleNewPokemon())
            updateEnemyBench(newEnemyPokemon)
        }
    }

    // To be called twice in useEffect. One for defending slowPokemon input, and one for fastPokemon
    async function executeTurn(atkPkm, defPkm, myMove, enemyMove) {
        console.log(myMove, enemyMove)
        const defgPkm = await pokemonIsAttacked(atkPkm, defPkm, myMove, enemyMove)
        ifDeadExecuteKnockout(defgPkm)
    }

    async function handleClickMoveBtn(move) {
        const { myMove, enemyMove } = assignMoves(move) // should return enemy's moves. DONE WORKING PROPERLY
        const { fastPkm, slowPkm } = assignAttackOrder() // return which Pokemon attacks first and last. DONE WORKING PROPERLY
        await executeTurn(fastPkm, slowPkm, myMove, enemyMove) // perform everything resulting from atk, updating hp, dying, etc. DONE WORKING PROPERLY
        executeTurn(slowPkm, fastPkm, myMove, enemyMove)
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



    function newCombatFunc (clickedMove) {
        let firstPkm, secondPkm, firstPkmMove, secondPkmMove

        setMenuType('script')

        // assign who attacks first, assign moves to each pkm
        const enemyMove = setEnemyMove()

        // uppercase pokemonNames and moveNames for script
        const firstPkmName = formatName(firstPkm.name)
        const secondPkmName = formatName(secondPkm.name)
        firstPkmMove = formatName(firstPkmMove)
        secondPkmMove = formatName(secondPkmMove)

        // apply the typeMultiplier in case a Pokemon's attack type is strong or weak
        let firstEffect = typeMultiplier(firstPkm.type1, secondPkm.type1)
        let secondEffect = typeMultiplier(secondPkm.type1, firstPkm.type1)

        // calculate damage
        let firstDmg = statFluctuation( Math.round((3 * firstPkm.atk * 5) / secondPkm.def * firstEffect), .8, 1.2 )
        let secondDmg = statFluctuation( Math.round((3 * secondPkm.atk * 5) / firstPkm.def * secondEffect), .8, 1.2 )

        let time = 2000

        // Defining setTimeout ids so we can access them to cancel future timeouts from running if a Pokemon dies
        let secondMoveTimeout
        let superEffectiveTimeout
        let notEffectiveTimeout
        let executeDamageTimeout
        let mainMenuTimeout
        let damageScriptTimeout

        function clearFutureTimeouts() {
            clearTimeout(secondMoveTimeout)
            clearTimeout(superEffectiveTimeout)
            clearTimeout(notEffectiveTimeout)
            clearTimeout(executeDamageTimeout)
            clearTimeout(damageScriptTimeout)
        }

        setTimeout(() => setScript(`${firstPkmName} used ${firstPkmMove}!`), time)
        time += 2000
        if (firstEffect > 1) {
            setTimeout(() => setScript(`${firstPkmMove} is super effective!`), time)
            time += 2000
        } else if (firstEffect < 1) {
            setTimeout(() => setScript(`${firstPkmMove} is not very effective!`), time)
            time += 2000
        }

        
        setTimeout(() => {
            setScript(`${firstPkmName} does ${firstDmg} damage!`)
            // subtract damage from remaining hp
            if (firstPkm === myPokemon) {
                // if a Pokemon dies
                if (enemyPokemon.remaining_hp - firstDmg <= 0) {
                    clearFutureTimeouts()
                    clearTimeout(mainMenuTimeout)

                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player2Discard: prevDiscardPile.player2Discard.concat(enemyPokemon)}
                    })
                    setEnemyPokemon({...enemyPokemon, remaining_hp: 0})
                    setWinner({player: 1, pokemon: myPokemon})
                } else {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: enemyPokemon.remaining_hp - firstDmg})
                }
            } else {
                if (myPokemon.remaining_hp - firstDmg <= 0){
                    clearFutureTimeouts()
                    clearTimeout(mainMenuTimeout)

                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player1Discard: prevDiscardPile.player1Discard.concat(myPokemon)}
                    })
                    setMyPokemon({...myPokemon, remaining_hp: 0})
                    setWinner({player: 2, pokemon: enemyPokemon})
                } else {
                    setMyPokemon({...myPokemon, remaining_hp: myPokemon.remaining_hp - firstDmg})
                }
            }
        }, time) 
        time += 2000
        
        secondMoveTimeout = setTimeout(() => setScript(`${secondPkmName} used ${secondPkmMove}!`), time)
        time += 2000

        if (secondEffect > 1) {
            superEffectiveTimeout = setTimeout(() => setScript(`${secondPkmMove} is super effective!`), time)
            time += 2000
        } else if (secondEffect < 1) {
            notEffectiveTimeout = setTimeout(() => setScript(`${secondPkmMove} is not very effective!`), time)
            time += 2000
        }

        
        executeDamageTimeout = setTimeout(() => {
            setScript(`${secondPkmName} does ${secondDmg} damage!`)
            
            if (secondPkm === myPokemon) {
                if (enemyPokemon.remaining_hp - secondDmg <= 0) {
                    clearTimeout(mainMenuTimeout)
                    
                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player2Discard: prevDiscardPile.player2Discard.concat(enemyPokemon)}
                    })
                    setEnemyPokemon({...enemyPokemon, remaining_hp: 0}) 
                    setWinner({player: 1, pokemon: myPokemon})
                } else {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: enemyPokemon.remaining_hp - secondDmg})
                }
            } else {
                if (myPokemon.remaining_hp - secondDmg <= 0) {
                    clearTimeout(mainMenuTimeout)
                    
                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player1Discard: prevDiscardPile.player1Discard.concat(myPokemon)}
                    })
                    setMyPokemon({...myPokemon, remaining_hp: 0})
                    setWinner({player: 2, pokemon: enemyPokemon})
                } else {
                    setMyPokemon({...myPokemon, remaining_hp: myPokemon.remaining_hp - secondDmg})
                }
            }
        }, time)
        
        time += 2000

        
        mainMenuTimeout = setTimeout(() => {
            setMenuType('main')
            setScript('')
        }, time)

    }

    /* 
        After the match, this useEffect updates each of the player's decks row with won exp, and new item.
        This happens even if they refresh. It'll give incentive to finish match.

        ToDo: display the item that the player has just won
    */
    useEffect(() => {
        
        // handles what happens when a Pokemon dies. {winner} prop has been set to round-winning player
        async function pokemonDies() {
        if (winner) {
            const { currentUser, currentItems } = JSON.parse(sessionStorage.getItem('user'))
            
            // if user's Pokemon has beat an opponent Pokemon
            if (winner.player === 1) {
                
                // Everytime the user is declared winner, create a new deckExpArrItem,
                // and newDeckExpArr copy, to be either stored or sent to API at end of match
                const newDeckExpArr = [...deckExpArr]

                // currentPokemon's data to add to new deck exp update array
                // (this is only needed because .put() fails with no body)
                const deckExpObj = {
                    uuid: myPokemon.user_id,
                    pokemon_id: myPokemon.pokemon_id,
                    exp: myPokemon.exp,
                    lvl: myPokemon.lvl
                }
                const deckId = myPokemon.id
                // expToAdd will be changed with a function once we have AI trainers
                const expToAdd = 10
                // find Pokemon in deckExpArr that has the same deckId: 
                const idxOfPokemonInDeck = newDeckExpArr.findIndex(deck => deck.deckId === deckId)

                
                // if pokemon found, add to current deck item's expAdded property
                if (idxOfPokemonInDeck > -1) {
                    newDeckExpArr[idxOfPokemonInDeck].expAdded += expToAdd
                } else {
                    // else, add new item to deckExpArr
                    const newDeckItem = { deckExpObj, deckId, expAdded: expToAdd }
                    newDeckExpArr.push(newDeckItem)
                }
                

                setScript(`
                ${capitalize(discardPile.player2Discard[discardPile.player2Discard.length - 1].name).toUpperCase()} has fainted`
                )
                
                if (enemyBenchProp.length === 0 && // if the enemy's last Pokemon has been KO'd
                    discardPile.player2Discard[discardPile.player2Discard.length - 1].name === enemyPokemon.name
                ) {
                    setScript('Congrats! You have won the match!')

                    // API call to delete each of User's used bagItems from deletedItemIds[int]
                    const deletedItemsPromises = deletedItemIds.map(itemId => {
                        return axios.delete(`${API}/bags/${currentUser.uuid}?bagId=${itemId}`)
                    })
                    
                    await Promise.all(deletedItemsPromises)
                        .then(resArray => {
                            console.log('Deleted bag items resArray:', resArray)
                        }).catch(err => console.log('error deleting user bag items after winning:', err.message))

                    
                    // API call to add a random won item to user's bag
                    const randomBagItem = { user_id: user.currentUser.uuid, item_id: randomItem(3) }
                    const wonItem = await axios.post(`${API}/bags`, randomBagItem)
                        .then(res => {
                            return res.data
                        })
                        .catch(err => console.log('errorAddingRandomItem:', err.message))
                    console.log('The user has just won:', wonItem)
                    

                    // API put call to update user's Deck for each obj in deckExpArr, plus exp
                    const deckExpPromises = newDeckExpArr.map(deckItem => {
                        return axios.put(`${API}/decks/${deckItem.deckId}?expAdded=${deckItem.expAdded}`, 
                        deckItem.deckExpObj)
                    })
                    
                    // make api call to deck, and save decks with updated exp, to be added to currentPokemon
                    await Promise.all(deckExpPromises)
                        .then(resArray => {
                            // console.log('deckExpPromisesw resArray:', resArray)
                        }).catch(err => console.log('error updating deck after win with Promise.all:', err.message))


                    // AFTER we have updated our decks and waited:
                    // update current user with new values, and new exp
                    const winningUser = {
                        email: currentUser.email,
                        uuid: currentUser.uuid,
                        has_chosen_starter: true,
                        wins: currentUser.wins + 1,
                        losses: currentUser.losses
                    }

                    // update user and return user with query to that gets user's pokemon as well
                    axios.put(`${API}/users/${currentUser.uuid}?getPokemon=true`, winningUser)
                        .then(res => {
                            const newSessionUser = {
                                currentUser: res.data.updatedUser,
                                currentPokemon: res.data.updatedUserPokemon,
                                currentItems: convertUsableItems(res.data.updatedItems)
                            }
                            sessionStorage.setItem('user', JSON.stringify(newSessionUser))
                            setUser(newSessionUser)
                            console.log('newSessionUser after winning:', newSessionUser)
                        }).catch(err => console.log('error updating winning user:', err.message))

                } else { // if the enemy still has Pokemon in their bench
                    // setDeckExpArr(prevArr => [...prevArr, deckExpArrItem])
                    setDeckExpArr(newDeckExpArr)

                    const enemyPkmIdx = Math.floor(Math.random() * enemyBenchProp.length)
                    const newEnemyPokemon = enemyBenchProp[enemyPkmIdx]
                    const newEnemyBench = enemyBenchProp.filter(mon => mon.name !== newEnemyPokemon.name)
                    
                    setTimeout(() => {
                        setEnemyPokemon(newEnemyPokemon)
                        setEnemyBench(newEnemyBench)
                        setTimeout(() => setScript(
                            `Enemy has chosen ${capitalize(newEnemyPokemon.name).toUpperCase()}!`), 
                        100)
                    }, 2000)
                    setTimeout(() => setMenuType('main'), 4000)
                }

            } else { // if player 1's Pokemon has fainted
                setScript(
                    `${capitalize(discardPile.player1Discard[discardPile.player1Discard.length - 1].name).toUpperCase()} has fainted`
                )
                setTimeout(() => setMenuType('newPokemon'), 2000)
            }

            setTimeout(() => setScript(`${capitalize(winner.pokemon.name).toUpperCase()} has won the match`), 2000)
        }
        } // pokemonDies() closes
        // pokemonDies()
    }, [winner])


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
                    {/* Each item's structure:
                    {item_id: 1, bagIdArr: [6,5,2], item_name: "potion", quantity: 3} */}
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
                {/* {menuType === 'switch-pokemon' &&
                    <div className='script'>
                        Go! {myPokemon.name.toUpperCase()}
                    </div>
                } */}

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
                        {myBenchProp.map((mon, i) => {
                            return <span onClick={handlePokemonSwitch} key={i}>{capitalize(mon.name)}</span>
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
                        {myBenchProp.map((mon, i) => {
                            return <span onClick={handleNewPokemonAfterKO} key={i}>{mon.name}</span>
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
