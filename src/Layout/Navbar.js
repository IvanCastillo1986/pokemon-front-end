import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'
import pokeball from '../Images/pokeball.png'
import pokeball_icon from '../Images/pokeball_icon.png'
import pokeball_icon_open from '../Images/pokeball_icon_open.png'

import Hamburger from './Hamburger'

import './Navbar.css'

/*
If not signed in:
Account
    Sign In
    Register

If signed in:
Account
    My Account
    Sign Out
*/

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

    const [showOverlay, setShowOverlay] = useState(false)
    const [signedIn, setSignedIn] = useState(false)

    // when window size changes, this gets triggered 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const history = useHistory()

    
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        // adds eventListener to window{}, which uses 'resize' to determine if innerWidth is being changed
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [window.innerWidth])
    

    return (
        <nav className="Navbar">
            
            <div className="overlay" onClick={() => setShowOverlay(!showOverlay)} style={{"display" : showOverlay ? "block" : "none"}}></div>
            
            <div><Link to="/"><img src={pokeball} style={{height: "100px"}} alt="pokeball" /></Link></div>
            
            {windowWidth >= 860
            ?
            <>
                <Link to="/cards">Cards</Link>
                <Link to="/pokedex">Pokedex</Link>
                <Link to="/play">Play</Link>

                <div className='account-div' onClick={() => setShowOverlay(!showOverlay)}>
                    <div className='account'>
                        <span>Account</span>
                        <img src={showOverlay ? pokeball_icon_open : pokeball_icon} alt="pokeball closed" />
                    </div>
                    {showOverlay && signedIn &&
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
                    {showOverlay && !signedIn &&
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
            </>
            :
            <Hamburger />
            }
        </nav>
    )
}
