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

            for (let id = 1; id <= 151; id++) {
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
    })
    
    return (
        <div className='CardsTable'>
            {finishedCall ? pokemonMap : <h1>Loading...</h1>}
        </div>
    )
}
