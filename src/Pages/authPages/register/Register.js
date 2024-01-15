import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../../../firebase'
import { UserContext } from "../../../UserContext"
import { createRandomPokemonIds } from '../../../Helper/createRandomPokemonIds'
import { convertUser } from '../../../Helper/convertUser'
import axios from 'axios'

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
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {

            // create new user with newly created firebase user data
            const newUser = {
                email: userCredentials.user.email,
                uuid: userCredentials.user.uid,
                has_chosen_starter: false
            }

            // here we not only create the user, but also send the 5 random pokeIds array to create deck
            axios.post(`${API}/users`, [newUser, createRandomPokemonIds(5)])
            .then(res => {
                const user = convertUser(res.data)
                
                sessionStorage.setItem("user", JSON.stringify(user))
                setUser(user)
            })
            .catch(err => console.log('error adding user:', err))

            history.push("/my-account")
        })
        .catch(err => {
            console.log('Error in createUserWithEmailAndPassword', err.message)

            if (err.code.includes('auth/weak-password')) showPasswordTooShort(true)
            if (err.code.includes('auth/email-already-in-use')) showUserAlreadyExists(true)
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
            
            <form onSubmit={register}>
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
