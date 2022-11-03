import React from 'react'
import { Link } from 'react-router-dom'
import pokeball from '../Images/pokeball.png'
import './Navbar.css'


export default function Navbar() {

    return (
        <div className="Navbar">
            <div><img src={pokeball} style={{height: "100px"}} alt="pokeball" /></div>
            <Link to="/">Home</Link>
            <Link to="/cards">Cards</Link>
            <Link to="/pokedex">Pokedex</Link>
            <Link to="/play">Play</Link>
        </div>
    )
}
