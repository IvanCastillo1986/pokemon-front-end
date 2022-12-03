import React, {useState, useEffect} from 'react'

import './Register.css'



export default function Register() {

    const [user, setUser] = useState({})
    
{/*
    This page will handle all of the user account information.
    On the Play page, the user should not be able to play until they've registered an account.

    Navbar will have an Account drop menu

    There will be a different page for each of these:
    Account
    Register
    MyAccount
*/}


    return (
        <div className='User'>
            <h1>Register Page</h1>
            <form action="">
                <label htmlFor="">What is your user name?</label><input name="userName" type="text" />
            </form>
        </div>
    )
}
