import React from 'react'
import { capitalize } from '../Helper/capitalize'


export default function Discard({ deadMon }) {



    return (
        
        <div className='Discard'>
            <div className='player1Discard'>
                <h3>Player 1 KO</h3>
                {deadMon.map((mon, i) => {
                    return <p key={i}>{capitalize(mon.name)}</p>
                })}
            </div>
            <h2>Discard</h2>
            <div className='player2Discard'>
                <h3>Player 2 KO</h3>
            </div>
        </div>
    )
}
