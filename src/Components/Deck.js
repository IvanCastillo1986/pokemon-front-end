import React, { useState, useEffect, useRef } from 'react'
import { convertToBattlePokemon } from '../Helper/convertToBattlePokemon'


export default function Deck({ pokemon }) {
    
    const [basicPokemon, setBasicPokemon] = useState([])
    const [battlePokemon, setBattlePokemon] = useState([])
    const [deck, setDeck] = useState([])
    const isMounted = useRef(false)
    console.log(isMounted)

    const basicPokemonIds = [1,4,7,10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,
    60,63,66,69,72,74,77,79,81,83,84,86,88,90,92,95,96,98,100,102,104,106,107,108,109,111,113,114,
    115,116,118,120,122,123,124,125,126,127,128,129,131,132,133,137,138,140,142,143,147]

    
    // Here, we will only pull a deck with basic Pokemon
    // Either make an API call, or choose from an array with id of only basic Pokemon
    useEffect(() => {
        // I needed to use the isMounted ref.
        // Otherwise, there will be an error of trying to run convertToBattlePokemon on undefined.
        // useEffect will first run on component mount, {pokemon} prop won't be ready from the API call, and setBasicPokemon will
        // output undefined objects into the array. 
        // Now that we updated 'basicPokemon' with undefined data, the second useEffect with the 'basicPokemon' dependency will read
        // the useless changes and run, and the convertToBattlePokemon function will try to 'read name of undefined' and crash.
        // isMounted ref keeps this useEffect if block from running until we have the {pokemon} data from the API call.
        // When the component mounts, we hit the else block and set isMounted ref to true
        // The component will automatically update when we get the API data prop, and this useEffect will run again, and we will
        // run the if block since isMounted.current is now true.
        // Since we now have the basicPokemon data ready, our second useEffect callback will run and convertToBattlePokemon will not 
        // cause error because we now have data.

        if (isMounted.current) {
            let pokeArr = []
            
            for (const id of basicPokemonIds) {
                pokeArr.push(pokemon[id - 1])
            }
            setBasicPokemon(pokeArr)    
        } else {
            isMounted.current = true
        }
        
    }, [pokemon])

    useEffect(() => {
        
        setBattlePokemon(convertToBattlePokemon(basicPokemon))
        
    }, [basicPokemon])

    return (
        <div>Deck</div>
    )
}
