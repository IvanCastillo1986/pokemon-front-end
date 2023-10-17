import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import './LogOut.css'



export default function LogOut() {

    const history = useHistory()


    return (
        <div className='LogOut'>
            
            <h2>You are signed out</h2>
            <p>Please go to our Log In page and sign in</p>

            <button onClick={() => history.push('/login')}>To Log In</button>
        </div>
    )
}
