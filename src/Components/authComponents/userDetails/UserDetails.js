import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { UserContext } from '../../../UserContext'

import './UserDetails.css'


{/*
    Will display the user's data:
        name, email, deck, date account was created
*/}

export default function UserDetails() {

    const [authUser, setAuthUser] = useState(null)
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    console.log(user, setUser)
    
    
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('UserDetails user:', user)
                setAuthUser(user)
                setUser(user)
            } else {
                setAuthUser(null)
            }
        })
        
        return () => {
            listen()
        }
        
    }, [])
    
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log('Signed out successfully')
            history.push("/logout")
        })
        .catch(err => console.log('Error signing out:', err))
    }
    

    
    return (
        <div className="UserDetails">
            <h2>My Account</h2>

            <div className='UserDetails__user-div'>
                <p>Signed in as {authUser && authUser.email}</p>

                <h2>Do you want to log out?</h2>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

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
