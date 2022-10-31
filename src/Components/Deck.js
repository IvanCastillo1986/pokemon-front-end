import React, { useState, useEffect, useRef } from 'react'
import { capitalize } from '../Helper/capitalize'
import { convertToBattlePokemon } from '../Helper/convertToBattlePokemon'

import BattleCard from './BattleCard'

import './BattleCard.css'


export default function Deck({ pokemon, handleCurrentComponent }) {
    
    const [basicPokemon, setBasicPokemon] = useState([])
    const [battlePokemon, setBattlePokemon] = useState([])
    const [yourDeck, setYourDeck] = useState([])
    const [starterPokemon, setStarterPokemon] = useState({})
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
        console.log('useEffect #1')

        // if (isMounted.current) {
        if (pokemon.length) {

            let pokeArr = []
            
            for (const id of basicPokemonIds) {
                pokeArr.push(pokemon[id - 1])
            }
            setBasicPokemon(pokeArr)
        }
        // } else {
        //     isMounted.current = true
        // }
        
    }, [pokemon])

    useEffect(() => {
        // This will not cause an error on the first useEffect call when component mounts because the array is empty, instead of undefined
        console.log('useEffect #2')
        console.log(basicPokemon)
        if (basicPokemon.length) {
            setBattlePokemon(convertToBattlePokemon(basicPokemon))
        }
        
    }, [basicPokemon])

    useEffect(() => {
        console.log('useEffect #3')
        // Choose 4 random cards from battlePokemon[]
        // on each of 4 iterations, choose a random number between 0 and battlePokemon.length
        if (battlePokemon.length) {
            console.log(battlePokemon)

            let deckArr = []
            let usedIdx = new Set()

            for (let i = 0; i < 5; i++) {
                // convert to battle pokemon, add each card to yourDeck (without duplicates)
                let randomNum = Math.floor(Math.random() * (battlePokemon.length))

                if (usedIdx.has(randomNum)) {
                    i--
                }
                else {
                    deckArr.push(battlePokemon[randomNum])
                    usedIdx.add(randomNum)
                }
            }
            setYourDeck(deckArr)
        }
    }, [battlePokemon])

    // This let's the player choose their starter Pokemon
    const handleClick = (e) => {

        console.log('click starter')
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


    return (
        pokemon.length ?

        <div className='Deck'>
            <h1>Hey, welcome to Pokemon Play!</h1>
            {Object.keys(starterPokemon).length === 0 
            ?
                <>
                <p>Click a button below to choose your first Pokemon.<br />
                Your comrade through thick and thin.</p>
                <p>Which type is your favorite?</p>
                <div className='Buttons'>
                    <button className='Grass-btn' onClick={handleClick}>Grass</button>
                    <button className='Fire-btn' onClick={handleClick}>Fire</button>
                    <button className='Water-btn' onClick={handleClick}>Water</button>
                </div>
                </>
            :
                <>
                <p>Congrats! Your new starter Pokemon is {capitalize(starterPokemon.name)}.<br />
                You two will be best of friends!</p>
                <BattleCard key={pokemon.id} pokemon={starterPokemon} />
                <p>And this is the rest of your deck:</p>
                <div className='RandomDeck'>
                    {yourDeck.map((pokemon, i) => {
                        return (
                            <BattleCard className='BattleCard' key={i} pokemon={pokemon} />
                            )
                        })}
                </div>
                <p  className='ArenaPrompt'>These are all basic-level Pokemon. This means that they have not evolved yet.<br />
                You will need to evolve them through experience and levels. <br />
                Some are able to evolve, which means they are relatively weak, but have the ability to become very strong.<br />
                Some Pokemon can not evolve, but these Pokemon are stronger than most other basic-level Pokemon who can evolve.<br/>
                However, these Pokemon are not as strong as many level 1 or level 2 Pokemon who have already evolved.</p>
                <p>Click the button below when you're ready to enter the Arena and test out your deck!</p>
                {/* Link this button to the Arena with deck props, and remove the Deck component */}
                <button onClick={() => handleCurrentComponent('arena')}>Go to Arena</button>
                </>
            }
        </div>

        : 
        <div>
            <h1>Hey, welcome to Pokemon Play!</h1>
            <p>Please wait while the page loads.<br />
            We promise, it's worth it!</p>
        </div>
    )
}
