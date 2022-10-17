import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from '../Components/Card'
import { printMoves } from '../Helper/printMoves'
import { countSkill } from '../Helper/countSkill'
import '../Pages/Cards.css'



export default function CardsTable({pokemon}) {

    // const [pokemon, setPokemon] = useState([])
    // const [finishedCall, setFinishedCall] = useState(false)
    // const [moves2, setMoves2] = useState({})

    // const makeArr = (arr) => {
    //     const newArr = []
    //     for (let move of arr) {
    //         if (!newArr.includes(move)) {
    //             newArr.push(move)
    //         }
    //     }
    //     return newArr
    // }

    // useEffect(() => {
        
        // Measures how long it takes to populate pokemon array with 151 objects console.time - .timeEnd
        // console.time('popArr')
        // const getPokemon = async () => {
            // let array = []
        //     let moves1 = []
        //     let moves2 = []

            // for (let id = 1; id <= 151; id++) {
            //     await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            //     .then(response => {
            //         array.push(response.data)
                    // moves1.push(response.data.moves[0].move.name)
                    // moves1.push(pokemon.moves[0].move.name)
                    // response.data.moves[1] ? moves2.push(response.data.moves[1].move.name) : moves2.push('tackle')
                    // response.data.moves[1] ? moves2.push(response.data.moves[1].move.name) : moves2.push('tackle')
                // })
            // }
            // console.log(makeArr(moves2))
            // setPokemon(array)
            // setMoves2(countSkill(moves2))
            // console.log("Just finished loop in useEffect")
            // setFinishedCall(true)
        // }
        // }
        // getPokemon()
        // console.timeEnd('popArr')
        // console.log("Last line of code in useEffect")
    // }, [])
    // This is so that Ditto won't cause error because he only has one move
    // if (moves2) {
    //     const arrCount = Object.values(moves2)
    //     console.log(countSkill(arrCount))
        
    // }

    const pokemonMap = pokemon.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />
    })
    
    return (
        <div className='CardsTable'>
            {pokemonMap}
        </div>
    )
}
