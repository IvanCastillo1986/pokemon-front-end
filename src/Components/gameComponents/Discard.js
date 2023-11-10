import React from 'react'
import { capitalize } from '../../Helper/capitalize'


export default function Discard({ deadMon, discardPile }) {



    return (
        
        <div className='Discard'>
            <div className='player1Discard'>
                <h3>Player 1 KO</h3>
                {discardPile.player1Discard.map((mon, i) => {
                    return <p key={i}>{capitalize(mon.name)}</p>
                })}
            </div>
            <h2>Discard</h2>
            <div className='player2Discard'>
                <h3>Player 2 KO</h3>
                {discardPile.player2Discard.map((mon, i) => {
                    return <p key={i}>{capitalize(mon.name)}</p>
                })}
            </div>
        </div>
    )
}
