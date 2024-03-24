import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'

import pokeball from '../Images/pokeball.png'
import pokeball_icon from '../Images/pokeball_icon.png'
import pokeball_icon_open from '../Images/pokeball_icon_open.png'

import Hamburger from './Hamburger'
import DropdownMenu from './DropdownMenu'

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

export default function Navbar() {

    const {user, setUser} = useContext(UserContext)

    const [showMenu, setShowMenu] = useState(false)
    const [signedIn, setSignedIn] = useState(false)

    // when window size changes, this gets triggered 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const history = useHistory()

    const handleAccountClick = () => {
        // show menuComponent when clicked
        setShowMenu(!showMenu)
    }
    

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
            
            <div className="overlay" onClick={() => setShowMenu(false)} style={{"display" : showMenu ? "block" : "none"}}></div>
            
            <div><Link to="/"><img src={pokeball} style={{height: "100px"}} alt="pokeball" /></Link></div>
            
            {windowWidth >= 900
            ?
            <>
                <Link to="/cards">Cards</Link>
                <Link to="/pokedex">Pokedex</Link>
                <Link to="/play">Play</Link>

                <div className='account'>
                    <span  onClick={handleAccountClick}>Account</span>
                    <img src={showMenu ? pokeball_icon_open : pokeball_icon} alt="pokeball closed" />
                    
                    {/* Dropdown div */}
                    { showMenu &&
                        <DropdownMenu handleAccountClick={handleAccountClick} />
                    }

                </div>
            </>
            :
            <div className='account'>
                <Hamburger handleAccountClick={handleAccountClick} />

                {
                    showMenu &&
                    <DropdownMenu handleAccountClick={handleAccountClick} />
                }
            </div>
            }
        </nav>
    )
}
