import React from 'react'
import { Link } from 'react-router-dom'
import pokeball from './Images/pokeball.png'

export default function Navbar() {

    return (
        <div className="NavBar">
            <div><img src={pokeball} style={{height: "100px"}} alt="pokeball" /></div>
            <Link to="/">Home</Link>
            <Link to="/cards">Cards</Link>
            <Link to="/cards/new">New</Link>
            <Link to="/cards/random">Battle</Link>
        </div>
    )
}
