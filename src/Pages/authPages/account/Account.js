import React, { useContext } from 'react'
import { UserContext } from '../../../UserContext'

import UserStatus from '../../../Components/authComponents/userStatus/UserStatus'
import UserStats from '../../../Components/authComponents/userStats.js/UserStats'

import './Account.css'
import LogOut from '../logOut/LogOut'


export default function Account() {

    const { user } = useContext(UserContext)



    return (
        <div className="Account">
            
            {Object.keys(user).length > 0 ?
            <>
                <UserStatus />
                <UserStats />
            </>
            :
            <LogOut />
            }
            
        </div>
    )
}
