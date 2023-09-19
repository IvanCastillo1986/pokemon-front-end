import React from 'react'


import './Account.css'
import LogIn from '../../Components/auth/logIn/LogIn'
import Register from '../../Components/auth/register/Register'
import UserDetails from '../../Components/auth/userDetails/UserDetails'


export default function Account() {

    



    return (
        <div className="account">
            <h1>Account Page</h1>

            <LogIn />

            <Register />

            <UserDetails />
            
        </div>
    )
}
