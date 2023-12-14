import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { UserContext } from '../../../UserContext'
import axios from 'axios'
import { convertUsableItems } from '../../../Helper/itemFunctions'
import { convertUser } from '../../../Helper/convertUser'

import "./LogIn.css"

const API = process.env.REACT_APP_API_URL



export default function LogIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userUnregistered, showUserUnregistered] = useState(false)
    const [wrongPassword, showWrongPassword] = useState(false)
    const { setUser } = useContext(UserContext)
    const history = useHistory()

    const handleSignIn = async (e) => {
        e.preventDefault()
        
        await signInWithEmailAndPassword (auth, email, password)
        .then((userCredentials) => {
            axios.get(`${API}/users/${userCredentials.user.uid}`)
            .then(res => {
                // res.data = { 
                //     currentUser: res.data.user, 
                //     currentPokemon: res.data.userPokemon,
                //     currentItems: convertUsableItems(res.data.userItems)
                // }

                // converts user to playable state before storing them
                const newUser = convertUser(res.data)
                setUser(newUser)
                sessionStorage.setItem('user', JSON.stringify(newUser))
            })
            history.push('/my-account')
        })
        .catch(err => {
            console.log(`Error in handleSignIn:`, err)
            if (err.code.includes('user-not-found')) showUserUnregistered(true)
            if (err.code.includes('wrong-password')) showWrongPassword(true)
        })
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        showUserUnregistered(false)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        showWrongPassword(false)
    }

    return (
        <div className="logIn">
            <h2>Log in</h2>

            <form onSubmit={handleSignIn}>
                <input type='email' placeholder='E-mail' onChange={handleEmailChange} value={email} />
                <input type='password' placeholder='Password' onChange={handlePasswordChange} value={password} />
                <input type='submit' value='Log In' />
            </form>
            { wrongPassword &&
            <p>Wrong password. Please check your password and try again.</p>
            }
            { userUnregistered &&
            <div>
                <p>User not found. If you've already registered, check the e-mail and try again.</p>
                <p>If you have not yet signed up, please visit the Register page.</p>
                <button onClick={() => history.push('/register')}>To Sign Up</button>
            </div>
            }
        </div>
    )
}
