import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from '../Components/Card'
import '../Pages/Cards.css'


export default function Cards() {

    const [pokemon, setPokemon] = useState([])
    const [finishedCall, setFinishedCall] = useState(false)

    useEffect(() => {
        
        // Measures how long it takes to populate pokemon array with 151 objects console.time - .timeEnd
        console.time('popArr')
        const getPokemon = async () => {
            let array = []
            
            for (let id = 1; id <= 9; id++) {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => {
                    array.push(response.data)
                })
            }
            setPokemon(array)
            console.log("Just finished loop in useEffect")
            setFinishedCall(true)
        }
        getPokemon()
        console.timeEnd('popArr')
        console.log("Last line of code in useEffect")
    }, [])

    const pokemonMap = pokemon.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />
        // return (
        //     <div className='Card' key={i}>
        //         <div className='Name'>{pokemon.name}</div>
        //         <div className='Row1'>
        //             <span className='HP'>{pokemon.stats[0].base_stat}HP</span> <span className='Type'>{pokemon.types[0].type.name}</span>
        //         </div>
        //         <div className='Row2'>
        //             <img className='Image' src={pokemon.sprites.front_default} alt={pokemon.name} />
        //         </div>
        //         <div>
        //             <span className='Move'>{pokemon.moves[0].move.name}</span>
        //         </div>
        //         <div>
        //             <span className='Atk'>Atk: {pokemon.stats[1].base_stat}</span> <span className='Def'>Def: {pokemon.stats[2].base_stat}</span>
        //         </div>
        //         <span className='Spd'>Spd: {pokemon.stats[5].base_stat}</span>
        //     </div>
        // )
    })
    
    return (
        <div className='CardsTable'>
            {finishedCall ? pokemonMap : null}
        </div>
    )
}
