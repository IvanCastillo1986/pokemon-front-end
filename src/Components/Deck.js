import React, { useState, useEffect, useRef } from 'react'
import { capitalize } from '../Helper/capitalize'
import { convertToBattlePokemon } from '../Helper/convertToBattlePokemon'

import BattleCard from './BattleCard'


export default function Deck({ pokemon }) {
    
    const [basicPokemon, setBasicPokemon] = useState([])
    const [battlePokemon, setBattlePokemon] = useState([])
    const [yourDeck, setYourDeck] = useState([])
    const [starterPokemon, setStarterPokemon] = useState({})
    // const [isLoading, setIsLoading] = useState(true)
    const isMounted = useRef(false)

    const basicPokemonIds = [10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,
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
        // Also, refs do not use state, so it doesn't trigger re-renders. Refs also persist across renders.

        if (isMounted.current) {
            let pokeArr = []
            
            for (const id of basicPokemonIds) {
                pokeArr.push(pokemon[id - 1])
            }
            setBasicPokemon(pokeArr)    
            // setIsLoading(false)
        } else {
            isMounted.current = true
        }
        
    }, [pokemon])

    useEffect(() => {
        // This will not cause an error on the first useEffect call when component mounts because the array is empty, instead of undefined
        setBattlePokemon(convertToBattlePokemon(basicPokemon))
        
    }, [basicPokemon])

    useEffect(() => {
        // Choose 7 random cards from the battlePokemon
        // on each of 7 iterations, choose a random number between 0 and battlePokemon.length
        if (battlePokemon.length) {
            let deckArr = []
            for (let i = 0; i < 7; i++) {
                // add each card to yourDeck
                deckArr.push(battlePokemon[Math.floor(Math.random() * (battlePokemon.length))])
            }
            setYourDeck(deckArr)
        }
    }, [battlePokemon])

    // This let's the player choose their starter Pokemon
    const handleClick = (e) => {
        let starterPokemonArr = convertToBattlePokemon(pokemon.filter(mon => 
            mon.name === 'bulbasaur' || mon.name === 'charmander' || mon.name === 'squirtle'
        ))
        switch(e.target.className) {
            case 'Grass-btn':
                setStarterPokemon(starterPokemonArr[0]);
                break;
            case 'Fire-btn':
                setStarterPokemon(starterPokemonArr[1]);
                break;
            case 'Water-btn':
                setStarterPokemon(starterPokemonArr[2]);
                break;
        }
    };

    // Player:
    //         "Hey! Welcome to Pokemon Play!"
    //         "to choose a random deck.
    //         "Which type is your favorite?"
    //         Green, Red, Blue

    //         "Great! This is your new Pokemon:"
    //          Bulbasaur, Charmander, or Squirtle
    //          And the rest of deck. Decide if I'll say something before revealing the rest of deck.
    //          Remove ability to recieve more than one of starter Pokemon in random deck.
    //          Add CSS to render the rest of deck inline.
    //         "They're all basic Pokemon, so you'll need to level them up before you can evolve them."
    //         "I know! Let's take them out to the arena and get some training in."

    // if (isLoading) return <h1>...Loading</h1>

    return (
        <div className='Deck'>
            <h1>Hey, welcome to Pokemon Play!</h1>
            <p>Click a button below to choose your first Pokemon.<br />
            Your comrade through thick and thin.</p>
            {Object.keys(starterPokemon).length === 0 
            ?
                <>
                <p>Which type is your favorite?</p>
                <div className='Buttons'>
                    <button className='Grass-btn' onClick={handleClick}>Grass</button>
                    <button className='Fire-btn' onClick={handleClick}>Fire</button>
                    <button className='Water-btn' onClick={handleClick}>Water</button>
                </div>
                </>
            :
                <>
                <p>Congrats! Your new starter Pokemon is {starterPokemon.name}.<br />
                You two will be best of friends!</p>
                <BattleCard key={pokemon.id} pokemon={starterPokemon} />
                <p>And these are the rest of your new Pokemon</p>
                <div className='RandomDeck'>
                    {yourDeck.map(pokemon => {
                        return (
                            <BattleCard className='Card' key={pokemon.id} pokemon={pokemon} />
                            )
                        })}
                </div>
                </>
            }

            {/* Stop this from rendering duplicate pokemon */}
            {/* <div>
                {Object.keys(starterPokemon).length > 0 ? 
                yourDeck.map(pokemon => {
                    return (
                        <BattleCard key={pokemon.id} pokemon={pokemon} />
                        )
                    })
                    : null
                }
            </div> */}
        </div>
    )
}
