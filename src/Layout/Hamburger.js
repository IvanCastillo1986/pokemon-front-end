import React from 'react'

import './Hamburger.css'


export default function Hamburger({ handleAccountClick }) {
    return (
        <div className='Hamburger' onClick={handleAccountClick}>
            <span className='burger burger1'/>
            <span className='burger burger2'/>
            <span className='burger burger3'/>
        </div>
    )
}
