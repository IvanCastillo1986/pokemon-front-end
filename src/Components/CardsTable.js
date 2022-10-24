import React from 'react'
import Card from '../Components/Card'
import '../Pages/Cards.css'



export default function CardsTable({pokemon}) {


    const pokemonCardsDisplay = pokemon.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />
    })
    
    return (
        <div className='CardsTable'>
            {pokemonCardsDisplay}
        </div>
    )
}
