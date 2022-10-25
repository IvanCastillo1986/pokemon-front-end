// Dependencies
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './Layout/Navbar'
import CardsPage from './Pages/CardsPage'

// Pages
import Home from './Pages/Home'
import FourOFour from './Pages/FourOFour'
import Pokedex from './Components/Pokedex'
import Play from './Pages/Play'

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
  console.log(pokemon)

  // Use these calls to get info on pokemon evolutions
  useEffect(() => {
      // axios.get(`https://pokeapi.co/api/v2/evolution-chain/2/`)
      // .then(res => {
      //   console.log(res.data)
      // })

      axios.get(`https://pokeapi.co/api/v2/pokemon-species/1/`)
      .then(res => {
        console.log(res.data)
      })
  }, [])

  function findFirstTwoLearnedMoves(pokemon) {
    const pokemoves = []
    for (const pokemove of pokemon.moves) {
        if (pokemove.version_group_details[0].level_learned_at > 1) {
            pokemoves.push(pokemove)
            console.log(pokemove.move.name)
            console.log(pokemove.version_group_details[0].level_learned_at)
        }
        if (pokemoves.length == 2) break
    }
    return pokemoves
  }
  // findFirstTwoLearnedMoves(pokemon[2])
  // console.log(findFirstTwoLearnedMoves(pokemon[2]))



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
