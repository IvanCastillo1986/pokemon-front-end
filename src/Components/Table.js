import React, { useState, useEffect } from 'react'

import BattleCard from './BattleCard'

import { capitalize } from '../Helper/capitalize'
import { typeMultiplier } from '../Helper/typeMultiplier'



export default function Table({ myPokemon, enemyPokemon }) {

    const [menuType, setMenuType] = useState('main')

    const [script, setScript] = useState("")

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

    function combat (you, enemy, move) {
        // Keeping code dryer since we'll only use upperCased names in script
        you.name = capitalize(you.name).toUpperCase()
        enemy.name = capitalize(enemy.name).toUpperCase()

        let firstPkm, secondPkm

        setMenuType('script')
        
        let moveIdx = Math.floor(Math.random() * 2)

        // assign who attacks first, assign moves to each pkm
        if (enemy.spd > you.spd) {
            firstPkm = enemy; secondPkm = you;
            firstPkm.cMove = moveIdx === 0 ? enemy.move1.move.name : enemy.move2.move.name
            secondPkm.cMove = move

            setScript('Enemy attacks first')
        } else {
            firstPkm = you; secondPkm = enemy;
            firstPkm.cMove = move
            secondPkm.cMove = moveIdx === 0 ? enemy.move1.move.name : enemy.move2.move.name

            setScript('You attack first')
        }
        let firstEffect = typeMultiplier(firstPkm.type, secondPkm.type)
        let secondEffect = typeMultiplier(secondPkm.type, firstPkm.type)

        console.log(firstEffect)
        console.log(secondEffect)

        // calculate damage
        let firstDmg = Math.round((3 * firstPkm.atk * 5) / secondPkm.def * firstEffect)
        let secondDmg = Math.round((3 * secondPkm.atk * 5) / firstPkm.def * secondEffect)
        let time = 1

        setTimeout(() => setScript(`${firstPkm.name} used ${capitalize(firstPkm.cMove).toUpperCase()}!`), 2000)
        if (firstEffect > 1) setTimeout(() => setScript(`${firstPkm.cMove} is super effective!`), 3000)
        else if (firstEffect < 1) setTimeout(() => setScript(`${firstPkm.cMove} is not very effective!`), 3000)

        setTimeout(() => {
            setScript(`${firstPkm.name} does ${firstDmg} damage!`)
            // subtract damage from remaining hp
            secondPkm.remaining_hp -= firstDmg
        }, 4000) 
        setTimeout(() => setScript(`${secondPkm.name} used ${capitalize(secondPkm.cMove.toUpperCase())}!`), 6000)
        setTimeout(() => {
            setScript(`${secondPkm.name} does ${secondDmg} damage!`)
            firstPkm.remaining_hp -= secondDmg
        }, 8000)
        setTimeout(() => {
            setMenuType('main')
            setScript('')
        }, 10000)
        
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
                    <span onClick={() => combat(myPokemon, enemyPokemon, myPokemon.move1.move.name)}>
                        {capitalize(myPokemon.move1.move.name)}
                    </span>
                    <span onClick={() => combat(myPokemon, enemyPokemon, myPokemon.move2.move.name)}>
                        {capitalize(myPokemon.move2.move.name)}
                    </span>

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
