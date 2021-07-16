import React from 'react'
import mew from '../Images/mew.png'

export default function Home() {

    return (
        <div className='Home'>
            <h1>Welcome to my Pokemon page!</h1>
            <div><img src={mew} alt="Mew" className='center' /></div>
        </div>
    )
}
