import React, { useState, useEffect } from 'react'
import { auth } from '../../../firebase'
import { onAuthStateChanged } from 'firebase/auth'

import LogOut from '../logOut/LogOut'

import './UserDetails.css'


export default function UserDetails() {

    const [authUser, setAuthUser] = useState(null)

    {/*
        Will display the user's data:
            name, email, deck, date account was created
    */}

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('UserDetails user:', user)
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen()
        }

    }, [])


    return (
        <div className="UserDetails">
            <h2>My Account</h2>

            {authUser ? 
            <div className='UserDetails__user-div'>
                <p>Signed in as {authUser.email}</p>
                <LogOut />
            </div>
            :
            <p>Signed out</p>
            }

            {/* <p>{currentUser.username}</p>
            <p>Account E-mail: {currentUser.email}</p>
            <ul>
                <p>Pokemon:</p>
                {currentUser.deck && 
                currentUser.deck.map((pokemon, i) => {
                    return <li key={i}>{pokemon.name}</li>
                })}
            </ul> */}
        </div>
    )
}
