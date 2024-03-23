import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

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

// const unregisteredMenuItems = [
//     {
//         linkName: 'Log In',
//         url: '/login'
//     },
//     {
//         linkName: 'Register',
//         url: '/register'
//     },
//     {
//         linkName: 'Account',
//         url: '/my-account'
//     },
// ]
// const registeredMenuItems = [
//     {
//         linkName: 'My Account',
//         url: '/my-account' 
//     },
//     {
//         linkName: 'Log Out',
//         url: '/logout'
//     }
// ]

export default function Navbar() {

    const {user, setUser} = useContext(UserContext)
    // console.log(user.currentUser)

    const [showMenu, setShowMenu] = useState(false)
    const [signedIn, setSignedIn] = useState(false)

    // when window size changes, this gets triggered 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const history = useHistory()

    const handleAccountClick = () => {
        // Add menuComponent when clicked
        setShowMenu(!showMenu)
    }

    
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            setUser({})
            sessionStorage.clear()

            history.push("/logout")
        })
        .catch(err => console.log('Error signing out:', err))
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
            
            {windowWidth >= 860
            ?
            <>
                <Link to="/cards">Cards</Link>
                <Link to="/pokedex">Pokedex</Link>
                <Link to="/play">Play</Link>
                <div className='account'>
                    <span  onClick={handleAccountClick}>Account</span>
                    <img src={showMenu ? pokeball_icon_open : pokeball_icon} alt="pokeball closed" />
                    { showMenu &&
                    <div className='dropdown-div'>
                        
                        {user.currentUser &&
                            <ul>
                                <li to='/logout' onClick={handleSignOut}>Logout</li>
                                <Link to='/my-account'>My Account</Link>
                            </ul>
                        }
                        
                        {!user.currentUser &&
                            <ul>
                                <Link to='/login'>Login</Link>
                                <Link to='/register'>Register</Link>
                            </ul>
                        }
                    </div> // closes 'dropdown-div'
                    }
                </div> {/* closes 'account' div */}
            </>
            :
            <Hamburger />
            }
        </nav>
    )
}
