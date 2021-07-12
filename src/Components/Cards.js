import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Cards.css'


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

    const pokemonMap = pokemon.map((pokemon, i) => {
        return (
            <div className='Card' key={i}>
                <span>{pokemon.name}</span> <span>{pokemon.stats[0].base_stat}HP</span> <span>{pokemon.types[0].type.name}</span>
                <div><img src={pokemon.sprites.front_default} alt={pokemon.name} /></div>
                <span>Atk: {pokemon.stats[1].base_stat}</span>

            </div>
        )
    })
    
    return (
        <>
            <h1>Cards</h1>
            <div className='CardsTable'>
                {finishedCall ? pokemonMap : null}
            </div>
        </>
    )
}
