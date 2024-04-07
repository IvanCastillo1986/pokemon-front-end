import React, { useState, useEffect } from 'react'

import { capitalize } from '../../Helper/capitalize'



export default function Bench({ myBenchProp, enemyBenchProp }) {


    const [myBench, setMyBench] = useState(null)
    const [enemyBench, setEnemyBench] = useState(null)

    // This detects when myBench prop has been changed, and triggers a re-render 
    // (why doesn't React re-render automatically when prop changes)
    useEffect(() => {
        setMyBench(myBenchProp)
        setEnemyBench(enemyBenchProp)
    }, [myBenchProp, enemyBenchProp])
    


    return (
        myBench &&
        <div className='Bench'>
            <h2>Bench</h2>

            <div className='player-benches'>
                <div className='player1Bench'>
                    <p className='player-header'>Player 1</p>
                    {myBench.map((pokemon, i) => {
                        return <p key={i}>{capitalize(pokemon.name)}: {pokemon.remaining_hp} HP</p>
                    })}
                </div>
                
                <div className='player2Bench'>
                    <p className='player-header'>Player 2</p>
                    {enemyBench.map((pokemon, i) => {
                        return <p key={i}>{capitalize(pokemon.name)}: {pokemon.remaining_hp} HP</p>
                    })}
                </div>
            </div>
        </div>
        
    )
}
