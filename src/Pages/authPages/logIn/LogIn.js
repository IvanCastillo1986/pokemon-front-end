import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { UserContext } from '../../../UserContext'
import axios from 'axios'

import "./LogIn.css"

const API = process.env.REACT_APP_API_URL



export default function LogIn() {

    // this component will use form to trigger login function to firebase

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, setUser } = useContext(UserContext)
    const history = useHistory()

    const handleSignIn = (e) => {
        e.preventDefault()
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            axios.get(`${API}/users/${userCredentials.user.uid}`)
            .then(res => {
                setUser({ currentUser: res.data.user, currentDeck: res.data.userDeck })
            })

            setEmail('')
            setPassword('')
            history.push('/my-account')
        }).catch(err => console.log(`Error in handleSignIn:`, err))
    }

    return (
        <div className="logIn">
            <h2>Log in</h2>

            <form onSubmit={handleSignIn}>
                <input type='email' placeholder='E-mail' onChange={e => setEmail(e.target.value)} value={email} />
                <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password} />
                <input type='submit' value='Log In' />
            </form>
        </div>
    )
}
