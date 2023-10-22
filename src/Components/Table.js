import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'

import BattleCard from './BattleCard'

import { capitalize } from '../Helper/capitalize'
import { typeMultiplier } from '../Helper/typeMultiplier'

const API = process.env.REACT_APP_API_URL



export default function Table({ 
    myPokemon, enemyPokemon, setMyPokemon, setEnemyPokemon, myBenchProp, enemyBenchProp, setEnemyBench, winner, setWinner,
    menuType, setMenuType, handlePokemonSwitch, handleNewPokemon, discardPile, setDiscardPile
}) {

    const { setUser } = useContext(UserContext)
    const [script, setScript] = useState("")
    const [deckExpArr, setDeckExpArr] = useState([])


    {/* 

        Calculate move damage.
        (((.4 * Level + 2) * Atk * MovePower) / EnemyDefense) * Multipliers
        let firstDmg = (2.4 * atk * 5) / def

        Add weaknesses and resistances.

        For now, all attacks will have the same power, so dmg comes from Pokemon stats only.
        No exp or leveling system yet.

        Battle Sequence:
        Build a back-end to add move details
        PP will be very limited (2PP for good moves)
        During each turn (like TCG), you can choose between a few different options to replenish what you've lost.
        Either replenish PP, use a potion, increase dmg for next move, etc.
        
        Switching the Pokemon uses a turn, just like attacking.
    */}

    // randomize the stat between two different values (ex: speed = dmg * .7 and 1.3)
    function statFluctuation(stat, minVal, maxVal) {
        return Math.floor((Math.random() * (maxVal - minVal) + minVal) * stat)
    }
    function enemyAttacksFirst(myspeed, enemyspeed) {
        myspeed = statFluctuation(myPokemon.speed, .7, 1.3)
        enemyspeed = statFluctuation(enemyPokemon.speed, .7, 1.3)
        
        return enemyspeed > myspeed
    }
    function setEnemyMove() {
        const enemyMoveIdx = Math.floor(Math.random() * 2)
        return enemyMoveIdx === 0 ? enemyPokemon.move1 : enemyPokemon.move2
    }
    // Eventually we won't need this, after refactoring
    function formatName(name) {
        return capitalize(name).toUpperCase()
    }
    

    function combat (clickedMove) {

        let firstPkm, secondPkm, firstPkmMove, secondPkmMove

        setMenuType('script')

        // assign who attacks first, assign moves to each pkm
        const enemyMove = setEnemyMove()

        if (enemyAttacksFirst(myPokemon.speed, enemyPokemon.speed)) {
            firstPkm = enemyPokemon; secondPkm = myPokemon;
            firstPkmMove = enemyMove
            secondPkmMove = clickedMove
            // WHY AREN'T THESE  setState cMoves WORKING WHEN CALLED LATER? 
            // Seems like a delay to set new state, before new value can be accessed
            // setEnemyPokemon({...enemyPokemon, cMove: enemyMoveIdx === 0 ? enemyPokemon.move1.move.name : enemyPokemon.move2.move.name})
            // setMyPokemon(prevPokemon => ({...prevPokemon, cMove: clickedMove}))
            
            setScript('Enemy attacks first')
        } else {
            firstPkm = myPokemon; secondPkm = enemyPokemon;
            firstPkmMove = clickedMove
            secondPkmMove = enemyMove

            setScript('You attack first')
        }


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
    console.log(myPokemon)

    /* ToDo
        add temporary pokemon object, or array, which holds the won exp
        After the match, update each of the player's decks row with won exp
        This happens whether they win or lose. It'll give incentive to finish match.
    */

    useEffect(() => {
        
        // handles what happens when a Pokemon dies. {winner} prop has been set to round-winning player
        if (winner) {
            const { currentUser } = JSON.parse(sessionStorage.getItem('user'))
            
            // if user's Pokemon has beat an opponent Pokemon
            if (winner.player === 1) {
                
                // Everytime the user is declared winner, create a new deckExpArrItem,
                // to be either kept or sent to API at end of match
                const deckExpObj = {
                    uuid: myPokemon.user_id,
                    pokemon_id: myPokemon.pokemon_id,
                    exp: myPokemon.exp + 30,
                    lvl: myPokemon.lvl
                }
                const deckId = myPokemon.id
                const deckExpArrItem = { deckExpObj, deckId }


                setScript(`
                ${capitalize(discardPile.player2Discard[discardPile.player2Discard.length - 1].name).toUpperCase()} has fainted`
                )
                
                if (enemyBenchProp.length === 0 && // if the enemy's last Pokemon has been KO'd
                    discardPile.player2Discard[discardPile.player2Discard.length - 1].name === enemyPokemon.name
                ) {
                    setScript('Congrats! You have won the match!')

                    const winningUser = {
                        email: currentUser.email,
                        uuid: currentUser.uuid,
                        has_chosen_starter: true,
                        wins: currentUser.wins + 1,
                        losses: currentUser.losses
                    }

                    axios.put(`${API}/users/${currentUser.uuid}`, winningUser)
                    .then(res => {
                        
                        const { currentPokemon } = JSON.parse(sessionStorage.getItem('user'))
                        const newSessionUser = {
                            currentUser: res.data,
                            currentPokemon
                        }
                        sessionStorage.setItem('user', JSON.stringify(newSessionUser))
                        setUser(newSessionUser)
                    }).catch(err => console.log('error updating winning user:', err.message))

                    // send a put call to api to update user's Deck for each obj in deckExpArr
                    // add the winning Pokemon's 
                    const finalDeckExpArr = [...deckExpArr, deckExpArrItem]
                    console.log('finalDeckExpArr', finalDeckExpArr)
                    const deckExpPromises = finalDeckExpArr.map(deckItem => {
                        return axios.put(`${API}/decks/${deckItem.deckId}`, deckItem.deckExpObj)
                    })
                    
                    // axios.put(`${API}/decks/${deckExpObj.deckId}`, finalDeckExpArr)
                    Promise.all(deckExpPromises)
                    .then(resArray => {
                        console.log(resArray)
                        resArray.forEach(res => {
                            // const enemyPokemon = res.data
                            // enemyPokemon.remaining_hp = 1
                            // aiDeckArr.push(enemyPokemon)
                            console.log(res.data)
                        })
                        // HERE I AM SETTING opponentDeck WITHIN STORAGE INSTEAD OF useState OR UserContext
                        // sessionStorage.setItem('opponentDeck', JSON.stringify(aiDeckArr))
                    }).catch(err => console.log('error updating deck after win with Promise.all:', err.message))

                } else { // if the enemy still has Pokemon in their bench
                    setDeckExpArr(prevArr => [...prevArr, deckExpArrItem])

                    const enemyPkmIdx = Math.floor(Math.random() * enemyBenchProp.length)
                    const newEnemyPokemon = enemyBenchProp[enemyPkmIdx]
                    const newEnemyBench = enemyBenchProp.filter(mon => mon.name !== newEnemyPokemon.name)
                    
                    setTimeout(() => {
                        setEnemyPokemon(newEnemyPokemon)
                        setEnemyBench(newEnemyBench)
                        setTimeout(() => setScript(`Enemy has chosen ${capitalize(newEnemyPokemon.name).toUpperCase()}!`), 100)                    
                    }, 2000)
                    setTimeout(() => setMenuType('main'), 4000)
                }

            } else { // if player 1's Pokemon has fainted
                setScript(`${capitalize(discardPile.player1Discard[discardPile.player1Discard.length - 1].name).toUpperCase()} has fainted`)
                setTimeout(() => setMenuType('newPokemon'), 2000)
            }

            setTimeout(() => setScript(`${capitalize(winner.pokemon.name).toUpperCase()} has won the match`), 2000)
        }
    }, [winner])


    const menuClick = (menuType) => {
        setMenuType(menuType)
    }


    return (
        <div className='Table'>
            <div className='player1Table'>
                <p className='hp-display'>HP: {myPokemon.remaining_hp}/{myPokemon.hp}</p>
                <BattleCard pokemon={myPokemon} />
            </div>
                
            <div className='screen'>

                {menuType === 'script' &&
                <div className='script'>
                    <p>{script}</p>
                </div>
                }

                {menuType === 'main' &&
                <div className='mainTable'>
                    <span className='fight' onClick={() => menuClick('fight')}>FIGHT</span>
                    <span className='switch' onClick={() => menuClick('switch')}>SWITCH</span>
                    <span className='item'>ITEM</span>
                    <span className='defend'>DEFEND</span>
                </div> 
                }
                
                {menuType === 'fight' &&
                <div className='fightMenu'>
                    <span onClick={() => combat(myPokemon.move1)}>
                        {capitalize(myPokemon.move1)}
                    </span>
                    <span onClick={() => combat(myPokemon.move2)}>
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

                {menuType === 'newPokemon' &&
                <div className='switchMenu'>
                    <span>Which Pokemon would you like to use next?</span>
                    <div className='switchOptions'>
                        {myBenchProp.map((mon, i) => {
                            return <span onClick={handleNewPokemon} key={i}>{mon.name}</span>
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
