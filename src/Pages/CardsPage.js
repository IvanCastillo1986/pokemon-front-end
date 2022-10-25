import React from 'react'
import Search from '../Components/Search'
import CardsTable from '../Components/CardsTable'
import './Cards.css'

export default function CardsPage({pokemon}) {


    return (

        pokemon.length 
        ?
        <div className='Cards'>
            <h1>Cards</h1>
            <Search />
            <CardsTable pokemon={pokemon} />
        </div>
        : 
        <h1>...Loading</h1> 
        
    )
}
