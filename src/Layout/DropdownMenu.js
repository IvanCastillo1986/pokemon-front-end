import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'



export default function DropdownMenu({ handleAccountClick }) {

    const {user, setUser} = useContext(UserContext)
    const history = useHistory()


    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            setUser({})
            sessionStorage.clear()

            history.push("/logout")
        })
        .catch(err => console.log('Error signing out:', err))
    }


    return (
        <div className='DropdownMenu' onClick={handleAccountClick} >
            {user.currentUser &&
                <ul>
                    <li onClick={() => history.push('/my-account')}>My Account</li>
                    <li onClick={() => history.push('/cards')}>Cards</li>
                    <li onClick={() => history.push('/pokedex')}>Pokedex</li>
                    <li onClick={() => history.push('/play')}>Play</li>
                    <li onClick={handleSignOut}>Logout</li>
                </ul>
            }
            
            {!user.currentUser &&
                <ul>
                    <li onClick={() => history.push('/cards')}>Cards</li>
                    <li onClick={() => history.push('/pokedex')}>Pokedex</li>
                    <li onClick={() => history.push('/login')}>Login</li>
                    <li onClick={() => history.push('/register')}>Register</li>
                </ul>
            }
        </div>
    )
}
