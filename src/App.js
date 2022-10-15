// Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './Navbar'
import CardsPage from './Pages/CardsPage'

// Pages
import Home from './Pages/Home'
import FourOFour from './Pages/FourOFour'
import Show from './Pages/Show'
import New from './Pages/New'
import Battle from './Pages/Battle'


export default function App() {


  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cards/new" component={New} /> {/* New card page not currently being used */}
        <Route exact path="/pokedex" component={Show} />
        <Route path="/battle" component={Battle} />
        <Route exact path="/cards" component={CardsPage} />
        <Route exact path="/cards/:id" component={Show} />
        <Route exact path="*" component={FourOFour} />
      </Switch>
    </div>
  )
}
