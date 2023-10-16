import React, { useContext } from 'react'
import { UserContext } from '../../../UserContext'

import UserStatus from '../../../Components/authComponents/userStatus/UserStatus'
import UserStats from '../../../Components/authComponents/userStats.js/UserStats'

import './Account.css'


export default function Account() {

    const { user } = useContext(UserContext)
    console.log('user:', user)
    console.log('sessionUser:', JSON.parse(sessionStorage.getItem('user')))

    return (
        <div className="Account">
            <h1>My Account</h1>
            <UserStatus />
            {Object.keys(user).length > 0 &&
            <UserStats />
            }
            
        </div>
    )
}
