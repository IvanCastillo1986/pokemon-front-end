import React, { useState, useEffect } from 'react'

import { capitalize } from '../Helper/capitalize'



export default function Bench({ myBenchProp, enemyBenchProp }) {


    const [myBench, setMyBench] = useState(null)
    const [enemyBench, setEnemyBench] = useState(enemyBenchProp)

    useEffect(() => {
        setMyBench(myBenchProp)
    }, [myBenchProp])
    


    return (
        myBench &&
        <div className='Bench'>
            <div className='player1Bench'>
                {myBench.map((pokemon, i) => {
                    return <p key={i}>{capitalize(pokemon.name)}: {pokemon.remaining_hp} HP</p>
                })}
            </div>
            
            <h2>Bench</h2>
            
            <div className='player2Bench'>
                {enemyBench.map((pokemon, i) => {
                    return <p key={i}>{capitalize(pokemon.name)}: {pokemon.remaining_hp} HP</p>
                })}
            </div>
        </div>
        
    )
}
