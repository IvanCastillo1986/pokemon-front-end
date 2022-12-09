import React from 'react'
import { CardDeck } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import './Account.css'


export default function Account() {

    const { currentUser } = useLocation().state
    console.log(currentUser)

    {/*
        Will display the user's data:
            name, email, deck, date account was created
    */}



    return (
        <div className="account">
            <h1>My Account</h1>
            <p>{currentUser.username}</p>
            <p>Account E-mail: {currentUser.email}</p>
            <ul>
                <p>Pokemon:</p>
                {currentUser.deck && 
                currentUser.deck.map((pokemon, i) => {
                    return <li key={i}>{pokemon.name}</li>
                })}
            </ul>
        </div>
    )
}
