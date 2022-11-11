import React, { useState, useEffect } from 'react'

import BattleCard from './BattleCard'

import { capitalize } from '../Helper/capitalize'
import { typeMultiplier } from '../Helper/typeMultiplier'



export default function Table({ 
    myPokemon, enemyPokemon, setMyPokemon, setEnemyPokemon, myBenchProp, enemyBenchProp, winner, setWinner, handlePokemonSwitch
}) {

    const [menuType, setMenuType] = useState('main')

    const [script, setScript] = useState("")
    // const [winner, setWinner] = useState(null)

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


    function combat (clickedMove) {

        let firstPkm, secondPkm, firstPkmMove, secondPkmMove

        setMenuType('script')
        
        let enemyMoveIdx = Math.floor(Math.random() * 2)

        // assign who attacks first, assign moves to each pkm
        if (myPokemon.spd < enemyPokemon.spd) {
            firstPkm = enemyPokemon; secondPkm = myPokemon;
            firstPkmMove = enemyMoveIdx === 0 ? enemyPokemon.move1.move.name : enemyPokemon.move2.move.name
            secondPkmMove = clickedMove
            // WHY AREN'T THESE  setState cMoves WORKING WHEN CALLED LATER? 
            // Seems like a delay to set new state, before new value can be accessed
            // setEnemyPokemon({...enemyPokemon, cMove: enemyMoveIdx === 0 ? enemyPokemon.move1.move.name : enemyPokemon.move2.move.name})
            // setMyPokemon(prevPokemon => ({...prevPokemon, cMove: clickedMove}))
            
            setScript('Enemy attacks first')
        } else {
            firstPkm = myPokemon; secondPkm = enemyPokemon;
            firstPkmMove = clickedMove
            secondPkmMove = enemyMoveIdx === 0 ? enemyPokemon.move1.move.name : enemyPokemon.move2.move.name

            setScript('You attack first')
        }

        // uppercase pokemonNames and moveNames for script
        const firstPkmName = capitalize(firstPkm.name).toUpperCase()
        const secondPkmName = capitalize(secondPkm.name).toUpperCase()
        firstPkmMove = capitalize(firstPkmMove).toUpperCase()
        secondPkmMove = capitalize(secondPkmMove).toUpperCase()
        console.log('Running properly so far')
        // apply the typeMultiplier in case a Pokemon's attack is strong or weak
        let firstEffect = typeMultiplier(firstPkm.type, secondPkm.type)
        let secondEffect = typeMultiplier(secondPkm.type, firstPkm.type)

        // calculate damage
        let firstDmg = Math.round((3 * firstPkm.atk * 5) / secondPkm.def * firstEffect)
        let secondDmg = Math.round((3 * secondPkm.atk * 5) / firstPkm.def * secondEffect)
        let time = 2000

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
                if (myPokemon.remaining_hp - firstDmg <= 0) {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: 0}) 
                    setWinner(myPokemon) 
                } else {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: enemyPokemon.remaining_hp - firstDmg})
                }
            } else {
                if (enemyPokemon.remaining_hp - firstDmg <= 0){
                    setMyPokemon({...myPokemon, remaining_hp: 0})
                    setWinner(enemyPokemon) 
                } else {
                    setMyPokemon({...myPokemon, remaining_hp: myPokemon.remaining_hp - firstDmg})
                }
            }
        }, time) 
        time += 2000
        
        setTimeout(() => setScript(`${secondPkmName} used ${secondPkmMove}!`), time)
        time += 2000
        
        if (secondEffect > 1) {
            setTimeout(() => setScript(`${secondPkmMove} is super effective!`), time)
            time += 2000
        } else if (secondEffect < 1) {
            setTimeout(() => setScript(`${secondPkmMove} is not very effective!`), time)
            time += 2000
        }
        setTimeout(() => {
            setScript(`${secondPkmName} does ${secondDmg} damage!`)
            if (secondPkm === myPokemon) {
                if (enemyPokemon.remaining_hp - secondDmg <= 0) {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: 0}) 
                    setWinner(myPokemon)
                } else {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: enemyPokemon.remaining_hp - secondDmg})
                }
            } else {
                if (myPokemon.remaining_hp - secondDmg <= 0) {
                    setMyPokemon({...myPokemon, remaining_hp: 0})
                    setWinner(enemyPokemon)
                } else {
                    setMyPokemon({...myPokemon, remaining_hp: myPokemon.remaining_hp - secondDmg})
                }
            }
        }, time)
        
        time += 2000

        setTimeout(() => {
            setMenuType('main')
            setScript('')
        }, time)
    }

    useEffect(() => {
        if (winner) {
            setScript(`${winner.name} has won the match`)
        }
    }, [winner])


    const fightClick = () => {
        setMenuType('fight')
    }
    const switchClick = () => {
        setMenuType('switch')
    }
    const itemClick = () => {
        setMenuType('item')
    }
    const defendClick = () => {
        setMenuType('defend')
    }
    const backClick = () => {
        setMenuType('main')
    }


    // Pokemon should stop attacking if it's hp reaches 0
    // A winner should be announced if a Pokemon dies
    // useEffect(() => {

    // }, [winner])


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
                    <span className='fight' onClick={fightClick}>FIGHT</span>
                    <span className='switch' onClick={switchClick}>SWITCH</span>
                    <span className='item'>ITEM</span>
                    <span className='defend'>DEFEND</span>
                </div> 
                }
                
                {menuType === 'fight' &&
                <div className='fightMenu'>
                    <span onClick={() => combat(myPokemon.move1.move.name)}>
                        {capitalize(myPokemon.move1.move.name)}
                    </span>
                    <span onClick={() => combat(myPokemon.move2.move.name)}>
                        {capitalize(myPokemon.move2.move.name)}
                    </span>

                    <span onClick={backClick} className='backBtn'>Back</span>
                </div>
                }

                {/* FINISH SWITCH FUNCTIONALITY */}
                {menuType === 'switch' &&
                <div className='switchMenu'>
                    <span>Which Pokemon would you like to switch to?</span>
                    <div className='switchOptions'>
                        {myBenchProp.map((mon, i) => {
                            return <span onClick={handlePokemonSwitch} key={i}>{capitalize(mon.name)}</span>
                        })}
                    </div>
                    <span onClick={backClick} className='backBtn'>Back</span>
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
