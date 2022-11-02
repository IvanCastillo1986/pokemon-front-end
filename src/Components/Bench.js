import React, { useState, useEffect } from 'react'

import { capitalize } from '../Helper/capitalize'



export default function Bench({ myBenchProp, enemyBenchProp }) {

    const [myBench, setMyBench] = useState(myBenchProp)
    const [enemyBench, setEnemyBench] = useState(enemyBenchProp)
    


    return (
        <>
        <div className='Bench'>
            <div className='player1Bench'>
                {myBench.map((pokemon, i) => {
                    return (<>
                        <p key={i}>{capitalize(pokemon.name)}: {pokemon.hp} HP</p>
                        </>)
                })}
            </div>
                <h2>Bench</h2>
            
            <div className='player2Bench'>
                {enemyBench.map((pokemon, i) => {
                    return (<>
                        <p key={i}>{capitalize(pokemon.name)}: {pokemon.hp} HP</p>
                        </>)
                })}
            </div>
        </div>
        </>
    )
}
