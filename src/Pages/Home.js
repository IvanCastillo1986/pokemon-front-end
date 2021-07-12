import React from 'react'
import mew from './Images/mew.png'

export default function Home() {

    return (
        <div>
            <h1>Welcome to my Pokemon page!</h1>
            <img src={mew} alt="Mew" />
        </div>
    )
}
