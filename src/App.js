// Dependencies
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserContext } from './UserContext'

import './App.css'

// Components
import NavBar from './Layout/Navbar'

// Pages
import Home from './Pages/Home'
import CardsPage from './Pages/CardsPage'
import Pokedex from './Components/Pokedex'
import Play from './Pages/Play'
import Account from './Pages/authPages/account/Account'
import LogIn from './Pages/authPages/logIn/LogIn'
import LogOut from './Pages/authPages/logOut/LogOut'
import Register from './Pages/authPages/register/Register'
import FourOFour from './Pages/FourOFour'

import axios from 'axios'
import { findFirstTwoLearnedMoves } from './Helper/convertToBattlePokemon'


export default function App() {

  // Setting up local cache of original 151 Pokemon, to be used across components
  const [pokemon, setPokemon] = useState([])
  const [user, setUser] = useState({})
  
  const numOfPokemon = 151;
  useEffect(() => {
    
    // For some reason, I can't benchmark this IIFE(Immediately Invoked Function Expression) function
    // Takes roughly 6 seconds
    (async function () {
      let pokemonArr = []
      
      // Creating a variable, which stores 151 nulls within an array, and maps through these nulls
      // to declare a Promise within each null arr element to be made later
      // [axios.get(`https://pokeapi.co/api/v2/pokemon/${1}/`), axios.get(`https://pokeapi.co/api/v2/pokemon/${2}/`), null]
      const pokemonApiPromises = new Array(numOfPokemon)
        .fill(null)
        .map((d, i) => axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`))

      // Promise takes an array of Promises, and executes them all. 
      // The Promises are not returned in the same order (or awaited), but are stored in array in same order
      Promise.all(
        pokemonApiPromises
      ).then(resArray => {
        
        // pokemonResArray is returned and ready.
        resArray.forEach((res) => {

          const pokemon = res.data
          
          const twoMoves = findFirstTwoLearnedMoves(pokemon)
          pokemon.twoMoves = twoMoves
          
          pokemonArr.push(pokemon)
        })
        
        setPokemon(pokemonArr)
      })
  
    })();

  }, []);


  return (
    <div className='App'>
      <UserContext.Provider value={{user, setUser}}>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cards" render={() => <CardsPage pokemon={pokemon} />} />
          <Route exact path="/pokedex" render={() => <Pokedex pokemon={pokemon} />} />
          <Route path="/play" render={() => <Play pokemon={pokemon} />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/login" render={() => <LogIn />} />
          <Route path="/logout" render={() => <LogOut />} />
          <Route path="/my-account" render={() => <Account />} />
          <Route exact path="*" component={FourOFour} />
        </Switch>
      </UserContext.Provider>
    </div>
  )
}
