import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../../../firebase'
import { UserContext } from "../../../UserContext"
import { basicPokemonIds } from '../../../Helper/basicPokemonIds'
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
    
    function createRandomStarterDeck(arr) {
        // populate this array with 5 randomPokemon, to return
        const randomPokemonArr = []
        // creates a shallow copy of basicPokemonids to mutate so we have no repeats
        const eliminationArr = [...arr]

        // this loop adds 5 pokeIds from basicPokemonIds[] to randomPokemonArr[]
        // const basicPokemonIds = [10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,
        // 60,63,66,69,72,74,77,79,81,84,86,88,90,92,96,98,100,102,104,109,111,116,118,120,129,133,138,140,147]
        for (let i = 0; i < 5; i++) {
            const randomNum = eliminationArr[Math.floor(Math.random() * (eliminationArr.length))]

            randomPokemonArr.push(randomNum)
            eliminationArr.splice(randomNum, 1)
        }
        // we now have randomPokemonArr[] populated with 5 random ids, which aren't repeated
        return randomPokemonArr
    }

    const register = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {

            const newUser = {
                email: userCredentials.user.email,
                uuid: userCredentials.user.uid,
                has_chosen_starter: false
            }

            // here we not only create the user, but also send the 5 randomly generated numbers to create deck
            axios.post(`${API}/users`, [newUser, createRandomStarterDeck(basicPokemonIds)])
            .then(res => {
                
                setUser({
                    currentUser: res.data.user, 
                    currentDeck: res.data.userDeck,
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
