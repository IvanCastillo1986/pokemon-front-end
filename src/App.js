// Dependencies
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserContext } from './UserContext'
import axios from 'axios'
import { findFirstTwoLearnedMoves } from './Helper/convertToBattlePokemon'

import './App.css'

// Components
import NavBar from './Layout/Navbar'

// Pages
import Home from './Pages/Home'
import CardsPage from './Pages/CardsPage'
import Pokedex from './Components/Pokedex'
import Play from './Pages/play/Play'
import Account from './Pages/authPages/account/Account'
import LogIn from './Pages/authPages/logIn/LogIn'
import LogOut from './Pages/authPages/logOut/LogOut'
import Register from './Pages/authPages/register/Register'
import FourOFour from './Pages/FourOFour'



export default function App() {

  // Setting up local cache of original 151 Pokemon, to be used across components
  const [pokemon, setPokemon] = useState([])
  // Everytime App or its children render with sessionStorage, we get the user from storage
  const sessionUser = JSON.parse(sessionStorage.getItem('user')) || {}
  const [user, setUser] = useState(sessionUser)
  
  
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

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [sessionUser])


  return (
    <div className='App'>
      <UserContext.Provider value={{user, setUser}}>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cards" render={() => <CardsPage pokemon={pokemon} />} />
          <Route exact path="/pokedex" render={() => <Pokedex pokemon={pokemon} />} />
          <Route path="/play" render={() => Object.keys(user).length > 0 ? <Play /> : <LogOut />} />
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
  