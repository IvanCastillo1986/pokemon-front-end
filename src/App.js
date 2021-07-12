// Dependencies
import React, {useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './Navbar'
import Cards from './Components/Cards'

// Pages
import Home from './Pages/Home'
import FourOFour from './Pages/FourOFour'



export default function App() {


  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cards" component={Cards} />
        <Route exact path="*" component={FourOFour} />
      </Switch>
    </div>
  )
}
