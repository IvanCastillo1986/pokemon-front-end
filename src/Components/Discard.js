import React from 'react'


export default function Discard({ deadMon }) {



    return (
        <div className='discard'>
            <span>KO</span>
            {deadMon.map((mon, i) => {
                return <span key={i}>{mon.name}</span>
            })}
        </div>
    )
}
