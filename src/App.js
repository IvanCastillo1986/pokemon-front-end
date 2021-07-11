// Dependencies
import React, {useState, useEffect} from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'

// Components
import NavBar from './Navbar'
import Home from './Components/Home'
import Cards from './Components/Cards'



export default function App() {

  const [pokemon, setPokemon] = useState([])
  
  useEffect(() => {
    const getPokemon = async () => {
      await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then(response => setPokemon(response.data))
      .then(response => console.log("Just called the pokemon API"))
    }
    getPokemon()
  }, [])

  return (
    <div className='App'>
      <NavBar />

      <Route exact path="/" component={Home} />
      <Route path="/cards" component={Cards} />
    </div>
  )
}
