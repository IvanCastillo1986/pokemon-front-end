// Dependencies
import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './Navbar'
import Home from './Components/Home'
import Cards from './Components/Cards'



export default function App() {

  return (
    <div className='App'>
      <NavBar />

      <Route exact path="/" component={Home} />
      <Route path="/cards" component={Cards} />
    </div>
  )
}
