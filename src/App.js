// Dependencies
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserContext } from './UserContext'
import { user } from './UserContext'

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

  // REMEMBER THAT THIS USES REACT-ROUTER-DOM V5, NOT V6. THIS MEANS SWITCH INSTEAD OF ROUTES, ETC.

  // Setting up local cache of original 151 Pokemon, to be used across components
  const [pokemon, setPokemon] = useState([])
  const [user, setUser] = useState()
  
  const numOfPokemon = 151

  useEffect(() => {
    
    // For some reason, I can't benchmark this IIFE(Immediately Invoked Function Expression) function
    // Takes roughly 6 seconds
    (async function () {
      let pokemonArr = []
      for (let id = 1; id <= numOfPokemon; id++) {
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

{/* 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGafur2cuP4_nLvb6_i_VnkOao9vmIKk0",
  authDomain: "pokemon-card-website.firebaseapp.com",
  projectId: "pokemon-card-website",
  storageBucket: "pokemon-card-website.appspot.com",
  messagingSenderId: "468407471473",
  appId: "1:468407471473:web:e9612696a99310c34fbad0",
  measurementId: "G-607G448YE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/}