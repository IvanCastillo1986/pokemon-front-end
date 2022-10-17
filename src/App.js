// Dependencies
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './Navbar'
import CardsPage from './Pages/CardsPage'

// Pages
import Home from './Pages/Home'
import FourOFour from './Pages/FourOFour'
import Show from './Pages/Show'
import Pokedex from './Components/Pokedex'
import Battle from './Pages/Battle'

import axios from 'axios'


export default function App() {


  // Setting up local cache of original 151 Pokemon, to be used across components
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    // Takes roughly 6-7 seconds
    const getPokemon = async () => {
      let pokemonArr = []
      for (let id = 1; id <= 151; id++) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => {
          // In React, we aren't allowed to mutate the original state array, so we can't use push()
          pokemonArr.push(res.data)
        })
      }
      setPokemon(pokemonArr)
    }
    getPokemon()

  }, [])




  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cards" render={() => <CardsPage pokemon={pokemon} />} />
        <Route exact path="/pokedex" render={() => <Pokedex pokemon={pokemon} />} />
        <Route path="/battle" component={Battle} />
        <Route exact path="*" component={FourOFour} />
      </Switch>
    </div>
  )
}
