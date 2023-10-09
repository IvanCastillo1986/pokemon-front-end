import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../../../firebase'
import { UserContext } from "../../../UserContext"
import { createRandomPokemonIds } from '../../../Helper/createRandomPokemonIds'
import axios from 'axios'

import './Register.css'

import { createUserWithEmailAndPassword } from 'firebase/auth'
const API = process.env.REACT_APP_API_URL


export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setUser } = useContext(UserContext)

    const history = useHistory()

    // Make API call to create new user
    // Add user to UserContext
        // add hasChosenStarter flag, set to false until they choose from Play page

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
                setUser({
                    currentUser: res.data.user, 
                    currentPokemon: res.data.userPokemon
                })
            })
            .catch(err => console.log('error adding user:', err))
            history.push("/my-account")
        })
        .catch(err => console.log('Error in createUserWithEmailAndPassword', err))
    }


    return (
        <div className='Register'>
            <h2>Register</h2>
            
            <form onSubmit={register}>
                <input type='email' placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <input type='submit' value='Register' />
            </form>
        </div>
    )
}
