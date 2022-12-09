import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './Register.css'

import axios from 'axios'
const API = process.env.REACT_APP_API_URL


export default function Register() {
    
    const history = useHistory()

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [emailsInDatabase, setEmailsInDatabase] = useState([])
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)

    // Gathers the users' emails, so that accounts aren't repeated when registering new account
    useEffect(() => {
        const usersEmailArray = []

        axios.get(`${API}/users`)
        .then(res => {
            res.data.forEach(user => usersEmailArray.push(user.email))
            setEmailsInDatabase(usersEmailArray)
        })
    }, [])
    
{/*
    This page will handle all of the user account information.
    On the Play page, the user should not be able to play until they've registered an account.

    Navbar will have an Account drop menu

    There will be a different page for each of these:
    Account
    Register
    MyAccount
*/}

    // ADD ERROR HANDLING IN CASE MORE THAN ONE MATCH WITH THE SAME EMAIL IS ALREADY IN DATABASE

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (emailsInDatabase.includes(user.email)) {
            console.log('Sorry, that e-mail has already been registered')
            setEmailAlreadyExists(true)
        }
        else {
            axios.post(API + '/users', user)
            .then(() => history.push('/account', {currentUser: user}))
            .catch(c => console.error("catch", c))
        }
    }

    // Checks if confirm password field matches the already entered password field
    function doPasswordsMatch() {
        if (passwordConfirm !== user.password.slice(0, passwordConfirm.length)) return false

        return true
    }


    return (
        <div className='Register' onSubmit={handleSubmit}>
            <h1>Register Page</h1>
            <form action="">
                <label htmlFor="username">Full Name</label>
                <input 
                    name="username" type="text" 
                    placeholder="John Doe" 
                    onChange={handleChange}
                    required 
                /><br />
                
                <label htmlFor="email">E-mail</label>
                <input 
                    name="email" type="email" 
                    placeholder="johndoe@email.com" 
                    onChange={handleChange}
                    required 
                /><br />
                <label style={{visibility: emailAlreadyExists ? "visible" : "hidden", color: "red"}}>
                    E-mail already exists. Log in instead.
                </label>
                
                <label htmlFor="password">Password</label>
                <input 
                    name="password" type="password" 
                    minLength="6" title="Must be 6 characters long" 
                    onChange={handleChange}
                    required 
                /><br />
                
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                    name="confirm-password" type="password" 
                    minLength="6" title="Must be same as password" 
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required 
                />
                <label style={{visibility: doPasswordsMatch() ? "hidden" : "visible", color: "red"}}>Password does not match</label>
                <br />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
