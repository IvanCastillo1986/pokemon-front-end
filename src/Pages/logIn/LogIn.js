import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import "./LogIn.css"

import axios from 'axios'
const API = process.env.REACT_APP_API_URL



export default function LogIn() {

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.get(API + '/users')
        .then(res => {
            const user = res.data.filter(item => item.email === email)
            console.log(user)
            history.push('/account', {currentUser: user})
        })
    }


    return (
        <div className="logIn">
            <h1>Log in</h1>

            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email" className='email'>E-mail: </label>
                <input type="email" name="email" id="email" className='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password" className='password'>Password: </label>
                <input type="password" name="password" id="password" className='password' onChange={(e) => setPassword(e.target.value)} />

                <input type="submit" value="Log In" id="submit" className='submit' />
            </form>
            <p>Not a Pokemon trainer yet?</p>
            <button onClick={() => history.push('/register')}>Register</button>
        </div>
    )
}
