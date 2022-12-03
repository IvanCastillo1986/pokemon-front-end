import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'



export default function LogIn() {

    const history = useHistory()


    return (
        <div>
            <h1>Log in here!</h1>
            <p>Not a Pokemon trainer yet?</p>
            <button onClick={() => history.push('/register')}>Register</button>
        </div>
    )
}
