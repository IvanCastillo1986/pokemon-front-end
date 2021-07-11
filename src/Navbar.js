import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <div className="NavBar">
            <Link to='/'>Home</Link>
            <Link to='/cards'>Cards</Link>
        </div>
    )
}
