import React from 'react'

import BattleCard from './BattleCard'



export default function Table({ myPokemon, enemyPokemon }) {


    return (
        <div className='Table'>
            <div className='player1Table'>
                <BattleCard pokemon={myPokemon} />
            </div>

            <div className='screen'>

            </div>

            <div className='player2Table'>
                <BattleCard pokemon={enemyPokemon} />
            </div>
        </div>
    )
}
