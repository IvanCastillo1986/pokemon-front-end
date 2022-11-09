import React, { useState, useEffect } from 'react'

import BattleCard from './BattleCard'

import { capitalize } from '../Helper/capitalize'
import { typeMultiplier } from '../Helper/typeMultiplier'



export default function Table({ myPokemon, enemyPokemon, setMyPokemon, setEnemyPokemon }) {

    const [menuType, setMenuType] = useState('main')

    const [script, setScript] = useState("")
    const [winner, setWinner] = useState(null)

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
    function hasPokemonDied() {
        // Here we check if a Pokemon has died
        // If it did, the Pokemon's HP becomes 0, and set winner
        if (myPokemon.remaining_hp <= 0) {
            myPokemon.remaining_hp = 0
            setWinner(enemyPokemon)
        } else if (enemyPokemon.remaining_hp <= 0) {
            enemyPokemon.remaining_hp = 0
            setWinner(myPokemon)
        }
    }

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
        // uppercase moveNames for script
        firstPkm.cMove = capitalize(firstPkm.cMove).toUpperCase()
        secondPkm.cMove = capitalize(secondPkm.cMove).toUpperCase()

        // apply the typeMultiplier in case a Pokemon's attack is strong or weak
        let firstEffect = typeMultiplier(firstPkm.type, secondPkm.type)
        let secondEffect = typeMultiplier(secondPkm.type, firstPkm.type)

        // calculate damage
        let firstDmg = Math.round((3 * firstPkm.atk * 5) / secondPkm.def * firstEffect)
        let secondDmg = Math.round((3 * secondPkm.atk * 5) / firstPkm.def * secondEffect)
        let time = 2000

        setTimeout(() => setScript(`${firstPkm.name} used ${firstPkm.cMove}!`), time)
        time += 2000
        if (firstEffect > 1) {
            setTimeout(() => setScript(`${firstPkm.cMove} is super effective!`), time)
            time += 2000
        } else if (firstEffect < 1) {
            setTimeout(() => setScript(`${firstPkm.cMove} is not very effective!`), time)
            time += 2000
        }

        setTimeout(() => {
            setScript(`${firstPkm.name} does ${firstDmg} damage!`)
            // subtract damage from remaining hp
            secondPkm.remaining_hp -= firstDmg
        }, time) 
        hasPokemonDied()
        time += 2000
        
        setTimeout(() => setScript(`${secondPkm.name} used ${secondPkm.cMove}!`), time)
        time += 2000
        
        if (secondEffect > 1) {
            setTimeout(() => setScript(`${secondPkm.cMove} is super effective!`), time)
            time += 2000
        } else if (secondEffect < 1) {
            setTimeout(() => setScript(`${secondPkm.cMove} is not very effective!`), time)
            time += 2000
        }
        setTimeout(() => {
            setScript(`${secondPkm.name} does ${secondDmg} damage!`)
            firstPkm.remaining_hp -= secondDmg
        }, time)
        hasPokemonDied()
        time += 2000

        setTimeout(() => {
            setMenuType('main')
            setScript('')
        }, time)
    }

    useEffect(() => {
        console.log(myPokemon.remaining_hp)
        console.log(enemyPokemon.remaining_hp)
        hasPokemonDied()
    }, [myPokemon.remaining_hp, enemyPokemon.remaining_hp])

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
