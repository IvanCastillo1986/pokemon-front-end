import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'

import './LogOut.css'



export default function LogOut() {

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log('Signed out successfully')
        })
        .catch(err => console.log('Error signing out:', err))
    }


    return (
        <div className='LogOut'>
            <h2>Do you want to log out?</h2>

            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}
