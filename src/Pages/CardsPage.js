import React from 'react'
import Search from '../Components/Search'
import CardsTable from '../Components/CardsTable'
import './Cards.css'

export default function CardsPage({pokemon}) {

    // This function prints every ability for each Pokemon{}
    // function printPokemonAndAbilities(pokemonArr) {
    
        // return a new Array[] with each pokemon{} and their abilities only
    //     return pokemonArr.map(mon => {
    //         const currentMon = { name: mon.name }

    //         for (let i = 0; i < mon.abilities.length; i++) {
    //             // abilities[]
    //             let abilityName = `ability_${i}`
    //             currentMon[abilityName] = mon.abilities[i].ability.name
    //         }
    //         return currentMon
    //     })
    // }
    // console.log(printPokemonAndAbilities(pokemon))

    // This function prints each move, and how many Pokemon has ability => {moveName: numOfPokemon}
    function countAbilities(pokemonArr) {
        const abilityCount = {}

        for (const pokemon of pokemonArr) {
            for (const item of pokemon.abilities) {
                if (!abilityCount.hasOwnProperty(item.ability.name)) abilityCount[item.ability.name] = 1
                else abilityCount[item.ability.name]++
            }
        }
        return abilityCount
    }
    console.log(countAbilities(pokemon))



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
