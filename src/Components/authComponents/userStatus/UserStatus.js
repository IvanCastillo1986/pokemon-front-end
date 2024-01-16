import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { UserContext } from '../../../UserContext'

import './UserStatus.css'


/*
    Will display the user's data:
        name, email, deck, date account was created
*/

export default function UserStatus() {

    const [authUser, setAuthUser] = useState(null)
    const { setUser } = useContext(UserContext)
    
    const history = useHistory()
    
    
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setAuthUser(firebaseUser)
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
            setUser({})
            sessionStorage.clear()

            history.push("/logout")
        })
        .catch(err => console.log('Error signing out:', err))
    }
    

    return (
        <div className="UserStatus">

            {authUser &&

            <div className='user-div'>
                <h1>My Account</h1>
                
                <p>Signed in as <span>{authUser && authUser.email}</span></p>

                <h2>Do you want to log out?</h2>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            }
        </div>
    )
}