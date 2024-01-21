import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../../../firebase'
import { UserContext } from "../../../UserContext"
import { convertUser } from '../../../Helper/convertUser'
import axios from 'axios'

// import NetworkError from "../../NetworkError"

import './Register.css'

import { createUserWithEmailAndPassword } from 'firebase/auth'
const API = process.env.REACT_APP_API_URL


export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordTooShort, showPasswordTooShort] = useState(false)
    const [userAlreadyExists, showUserAlreadyExists] = useState(false)

    const { setUser } = useContext(UserContext)

    const history = useHistory()


    // Make API call to retrieve new user's items
    const register = (e) => {

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {

            // create new user with newly created firebase user data
            const newUser = {
                email: userCredentials.user.email,
                uuid: userCredentials.user.uid,
            }

            // here we not only create the user, 1 currentItem, and empty currentPokemon
            axios.post(`${API}/users`, newUser)
            .then(res => {
                sessionStorage.clear()
                // Don't convert user yet! Will cause error because currentPokemon is empty
                const user = convertUser(res.data)
                console.log('user after registering:', user)
                
                sessionStorage.setItem("user", JSON.stringify(user))
                setUser(user)
            })
            .catch(err => {
                console.log('error adding user:', err)
            })

            history.push("/my-account")
        })
        .catch(err => {
            console.log('Error in createUserWithEmailAndPassword', err)

            if (err.code.includes('auth/weak-password')) showPasswordTooShort(true)
            if (err.code.includes('auth/email-already-in-use')) showUserAlreadyExists(true)
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        // if server is reachable, then register user
        axios.get(`${API}`)
        .then(() => {
            register()
        }).catch(err => {
            console.log('Network Error in <Register />:', err)
            history.push('/network-error')
        })
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        showUserAlreadyExists(false)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        showPasswordTooShort(false)
    }


    return (
        <div className='Register'>
            <h2>Register</h2>
            
            <form onSubmit={handleRegister}>
                <input type='email' placeholder='E-mail' value={email} onChange={handleEmailChange} />
                <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
                <input type='submit' value='Register' />
            </form>
            
            { passwordTooShort &&
            <p>Password should be at least 6 characters</p>
            }
            
            { userAlreadyExists &&
            <div>
                <p>User already exists. Please sign in existing user instead</p>
                <button onClick={() => history.push('/login')}>To Sign In</button>
            </div>
            }
        </div>
    )
}
