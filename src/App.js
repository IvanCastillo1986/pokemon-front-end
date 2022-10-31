// Dependencies
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './Layout/Navbar'

// Pages
import Home from './Pages/Home'
import CardsPage from './Pages/CardsPage'
import Pokedex from './Components/Pokedex'
import Play from './Pages/Play'
import FourOFour from './Pages/FourOFour'

import axios from 'axios'
import { findFirstTwoLearnedMoves } from './Helper/convertToBattlePokemon'


export default function App() {


  // Setting up local cache of original 151 Pokemon, to be used across components
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    
    // For some reason, I can't benchmark this IIFE(Immediately Invoked Function Expression) function
    // Takes roughly 6 seconds
    (async function () {
      let pokemonArr = []
      for (let id = 1; id <= 151; id++) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => {
          const pokemon = res.data

          // Adding first two learned moves to each Pokemon
          const twoMoves = findFirstTwoLearnedMoves(pokemon)
          pokemon.twoMoves = twoMoves

          pokemonArr.push(pokemon)
        })
      }
      setPokemon(pokemonArr)
    })();

  }, []);


  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cards" render={() => <CardsPage pokemon={pokemon} />} />
        <Route exact path="/pokedex" render={() => <Pokedex pokemon={pokemon} />} />
        <Route path="/play" render={() => <Play pokemon={pokemon} />} />
        <Route exact path="*" component={FourOFour} />
      </Switch>
    </div>
  )
}
