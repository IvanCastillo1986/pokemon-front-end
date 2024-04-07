import React from 'react'
import { capitalize } from '../../Helper/capitalize'


export default function Discard({ deadMon, discardPile }) {

/*
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
*/

    return (
        
        <div className='Discard'>
            <h2>Discard</h2>
            
            <div className='player-benches'>
                <div className='player1Discard'>
                    <h3>Player 1 KO</h3>
                    {discardPile.player1Discard.map((mon, i) => {
                        return <p key={i}>{capitalize(mon.name)}</p>
                    })}
                </div>
                <div className='player2Discard'>
                    <h3>Player 2 KO</h3>
                    {discardPile.player2Discard.map((mon, i) => {
                        return <p key={i}>{capitalize(mon.name)}</p>
                    })}
                </div>
            </div>
        </div>
    )
}
