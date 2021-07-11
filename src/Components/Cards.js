import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Cards.css'


export default function Cards() {

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        let array = []
        
        console.time('popArr')
        for (let id = 1; id <= 151; id++) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                array.push(response.data)
                setPokemon(array)
            })
        }
        console.timeEnd('popArr')

    }, [])


    return (
        <div className='Cards'>
            <h1>Cards</h1>
            <ul>

            </ul>
        </div>
    )
}
