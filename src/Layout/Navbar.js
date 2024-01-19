import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'
import pokeball from '../Images/pokeball.png'
import pokeball_icon from '../Images/pokeball_icon.png'
import pokeball_icon_open from '../Images/pokeball_icon_open.png'
import './Navbar.css'

// If not signed in:
    // Account
        // Sign In
        // Register
// If signed in:
    // Account
        // My Account
        // Sign Out
const unregisteredMenuItems = [
    {
        linkName: "Log In",
        url: '/login'
    },
    {
        linkName: 'Register',
        url: '/register'
    },
    {
        linkName: 'Account',
        url: '/my-account'
    },

]
const registeredMenuItems = [
    {
        linkName: 'My Account',
        url: '/account' 
    },
    {
        linkName: "Log Out",
        url: '/logout'
    }
]

export default function Navbar() {

    const {user} = useContext(UserContext)

    const [show, setShow] = useState(false)
    const [signedIn, setSignedIn] = useState(false)

    const history = useHistory()


    return (
        <nav className="Navbar">
            <div className="overlay" onClick={() => setShow(!show)} style={{"display" : show ? "block" : "none"}}></div>
            <div><Link to="/"><img src={pokeball} style={{height: "100px"}} alt="pokeball" /></Link></div>
            <Link to="/cards">Cards</Link>
            <Link to="/pokedex">Pokedex</Link>
            <Link to="/play">Play</Link>
            
            <div className='account-div' onClick={() => setShow(!show)}>
                <div className='account'>
                    <span>Account</span>
                    <img src={show ? pokeball_icon_open : pokeball_icon} alt="pokeball closed" />
                </div>
                {show && signedIn &&
                    <ul>
                    {registeredMenuItems.map((menuItem) => {
                        return (
                        <li key={menuItem.url.slice(1)} onClick={() => history.push(menuItem.url)}>
                            {menuItem.linkName}
                        </li>
                        )
                    })}
                    </ul>
                }
                {show && !signedIn &&
                    <ul>
                    {unregisteredMenuItems.map((menuItem) => {
                        return (
                        <li key={menuItem.url.slice(1)} onClick={() => history.push(menuItem.url)}>
                            {menuItem.linkName}
                        </li>
                        )
                    })}
                    </ul>
                }
            </div>
        </nav>
    )
}
