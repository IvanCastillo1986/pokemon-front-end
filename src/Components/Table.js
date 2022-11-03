import React, { useState, useEffect } from 'react'

import BattleCard from './BattleCard'

import { capitalize } from '../Helper/capitalize'



export default function Table({ myPokemon, enemyPokemon }) {


    {/* 
        For now, all attacks will have the same power, so dmg comes from Pokemon stats only.
        No exp or leveling system yet.

        Battle Sequence:
        PP will be very limited (2PP for good moves)
        During each turn (like TCG), you can choose between a few different options to replenish what you've lost.
        Either replenish PP, use a potion, increase dmg for next move, etc.
        
        Switching the Pokemon uses a turn, just like attacking.
    */}

    const [mainTableOn, setMainTableOn] = useState(true)
    


    return (
        <div className='Table'>
            <div className='player1Table'>
                <BattleCard pokemon={myPokemon} />
            </div>

            <div className='screen'>
                {mainTableOn &&
                <div className='mainTable'>
                    <span className='fight'>FIGHT</span>
                    <span className='switch'>SWITCH</span>
                    <span className='item'>ITEM</span>
                    <span className='defend'>DEFEND</span>
                </div>
                }
            </div>

            


            <div className='player2Table'>
                <BattleCard pokemon={enemyPokemon} />
            </div>
        </div>
    )
}
