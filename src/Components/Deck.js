import React, { useState, useEffect } from 'react'
import { capitalize } from '../Helper/capitalize'
import { convertToBattlePokemon } from '../Helper/convertToBattlePokemon'

import BattleCard from './BattleCard'

import './BattleCard.css'


// This component let's player choose their starter Pokemon, and randomly chooses player and AI decks
export default function Deck(
    { pokemon, handleCurrentComponent, setStarterPokemon, starterPokemon, setYourDeck, yourDeck, setAiDeck }
) {
    
    const [battlePokemon, setBattlePokemon] = useState([])

    const basicPokemonIds = [10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,
    60,63,66,69,72,74,77,79,81,83,84,86,88,90,92,95,96,98,100,102,104,106,107,108,109,111,113,114,
    115,116,118,120,122,123,124,125,126,127,128,129,131,132,133,137,138,140,142,143,147]

    
    // Here, we will only pull a deck with basic Pokemon
    useEffect(() => {

        if (pokemon.length) {

            let pokeArr = []
            
            for (const id of basicPokemonIds) {
                pokeArr.push(pokemon[id - 1])
            }
            setBattlePokemon(convertToBattlePokemon(pokeArr))
        }
        
    }, [pokemon])

    // This useEffect sets up your deck and the AI opponent's deck, including an AI starter Pokemon
    useEffect(() => {

        // Choose 5 random cards from battlePokemon[]
        if (battlePokemon.length) {

            let deckArr = []
            const usedIdx = new Set()

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

    // This handleClick let's the player choose their starter Pokemon, and sets the AI's deck
    const handleClick = (e) => {

        let starterPokemonArr = convertToBattlePokemon(pokemon.filter(mon => 
            mon.name === 'bulbasaur' || mon.name === 'charmander' || mon.name === 'squirtle'
        ))
        switch(e.target.className) {
            case 'Grass-btn':
                setStarterPokemon(starterPokemonArr[0]);
                starterPokemonArr.splice(0, 1)
                break;
            case 'Fire-btn':
                setStarterPokemon(starterPokemonArr[1]);
                starterPokemonArr.splice(1, 1)
                break;
            case 'Water-btn':
                setStarterPokemon(starterPokemonArr[2]);
                starterPokemonArr.splice(2, 1)
                break;
        }

        // This sets the aiDeck, plus starter Pokemon not chosen by player
        let deckArr = []
        const usedIdx = new Set()

        for (let i = 0; i < 5; i++) {
            let randomNum = Math.floor(Math.random() * (battlePokemon.length))

            if (usedIdx.has(randomNum)) {
                i--
            }
            else {
                deckArr.push(battlePokemon[randomNum])
                usedIdx.add(randomNum)
            }
        }
        let aiStarter = starterPokemonArr[Math.floor(Math.random() * 2)]
        
        setAiDeck([aiStarter].concat(deckArr))
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
                {/* Link this button to the Arena with deck props, and unmount the Deck component */}
                <button className='ArenaPromptBtn' onClick={() => handleCurrentComponent('arena')}>
                    Go to Arena
                </button>
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
