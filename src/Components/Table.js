import React, { useState, useEffect } from 'react'

import BattleCard from './BattleCard'

import { capitalize } from '../Helper/capitalize'



export default function Table({ myPokemon, enemyPokemon }) {

    const [menuType, setMenuType] = useState('main')

    const [moveUsed, setMoveUsed] = useState(null)

    const [script, setScript] = useState("")

    {/* 
        For now, all attacks will have the same power, so dmg comes from Pokemon stats only.
        No exp or leveling system yet.

        Battle Sequence:
        PP will be very limited (2PP for good moves)
        During each turn (like TCG), you can choose between a few different options to replenish what you've lost.
        Either replenish PP, use a potion, increase dmg for next move, etc.
        
        Switching the Pokemon uses a turn, just like attacking.
    */}

    function combat (you, enemy, move) {
        // decide who attacks first
        let firstPkm = you
        let secondPkm = enemy
        
        // process damage
        let firstDmg = 5 + (firstPkm.atk - secondPkm.def / 2)
        let secondDmg = 5 + (secondPkm.atk - firstPkm.def / 2)
        
        if (enemy.spd > you.spd) {
            // console.log('you go second')
            firstPkm = enemy; secondPkm = you;

            setMenuType('script')
            setScript('Enemy attacks first')

            // Because the setTimeout is nested, we don't have to set different delays. So now it runs the nested 2 sec, and runs another 2 sec
            setTimeout(() => {
                setScript('Enemy does ' + firstDmg + ' damage')
                setTimeout(() => {
                    // console.log('setTimeout expired')
                    setMenuType('main')
                    setScript('')
                }, 2000)
            }, 2000)
            
        } else {
            // console.log('you go first')
            
            setMenuType('script')
            setScript('You attack first')
            
            setTimeout(() => {
                setScript('You do ' + firstDmg + ' damage')
                setTimeout(() => {
                    // console.log('setTimeout expired')
                    setMenuType('main')
                    setScript('')
                }, 2000)
            }, 2000)
        }

        // subtract damage from remaining hp
        secondPkm.remaining_hp -= firstDmg
        firstPkm.remaining_hp -= secondDmg
        
        // display attacks - remaining hp
        console.log(firstPkm)
        console.log(secondPkm)
    }




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
                    <span className='switch'>SWITCH</span>
                    <span className='item'>ITEM</span>
                    <span className='defend'>DEFEND</span>
                </div> 
                }
                
                {menuType === 'fight' &&
                <div className='fightMenu'>
                    <span onClick={() => combat(myPokemon, enemyPokemon, myPokemon.move1.move.name)}>{capitalize(myPokemon.move1.move.name)}</span>
                    <span>{capitalize(myPokemon.move2.move.name)}</span>
                    <span onClick={backClick}>Back</span>
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




// if (enemy.spd > you.spd) {
//     console.log('you go second')
//     firstPkm = enemy; secondPkm = you;
    
    // setScriptOn(true)
    // scriptRef.current = 1
    // console.log(scriptRef.current)
    // setTimeout(() => {scriptRef.current = 2}, 2000)
    // console.log(scriptRef.current)
    // setTimeout(() => {scriptRef.current = 3}, 4000)
    // console.log(scriptRef.current)

    // scriptRef.current = `${firstPkm.name} attacks first`
    // setTimeout(() => {scriptRef.current = ''}, 2000)
// } else {
    // console.log('you go first')
    
    // setScriptOn(true)
    // scriptRef.current = 1
    // console.log(scriptRef.current)
    // scriptRef.current = 2
    // console.log(scriptRef.current)
    // scriptRef.current = 3
    // console.log(scriptRef.current)
    
    // scriptRef.current = `${firstPkm.name} attacks first`
    // setTimeout(() => {scriptRef.current = ''}, 2000)

// }