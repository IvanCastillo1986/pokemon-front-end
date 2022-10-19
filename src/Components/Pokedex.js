import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import './Pokedex.css'
import { capitalize } from '../Helper/capitalize'


export default function Pokedex({ pokemon }) {

    const [currentPokemon, setCurrentPokemon] = useState(pokemon[0])
    const [divStyle, setDivStyle] = useState({})
    const [isOn, setIsOn] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [inputError, setInputError] = useState('')
    
    // If we are rendering from a Pokemon
    const location = useLocation()
    // if location.state is defined, optional chaining

    
    useEffect(() => {
        
        // If we have pokemon[] ready from API call, sets currentPokemon
        if (!pokemon.length == 0) {
            setCurrentPokemon(pokemon[0])
        }
        // If we have a currentPokemon, sets screen to white when on, with image of current pokemon
        if (currentPokemon) {
            
            setDivStyle({
                backgroundImage: `url(${currentPokemon?.sprites.other["official-artwork"].front_default})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                margin: 'auto',
            })
        }
        // If pokemon[] does not contain a pokemon matching input name or id
        if (location.state) {
            setIsOn(true)
            if (typeof location.state.searchInput == 'string') {
                console.log('this is a string')
                let findPokemon = pokemon.find(mon => mon.name.toLowerCase() == location.state?.searchInput.toLowerCase())
                if (findPokemon) {
                    setCurrentPokemon(findPokemon)
                } else {
                    setInputError('Sorry, could not find that Pokemon in database. Choose from one of first 151 Pokemon.')
                }
            }
            // HANDLE ID SEARCHINPUT
            if (typeof location.state.searchInput == 'number') {
                console.log('this is a number')
            }
        }

    }, [pokemon, currentPokemon])


    const togglePowerOn = () => {
        setIsOn(true)
        console.log('power is on')
        if (currentPokemon) {
            setDivStyle({
                backgroundImage: `url(${currentPokemon?.sprites?.other["official-artwork"].front_default})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                margin: 'auto',
            })
        }
    }
    const togglePowerOff = () => {
        setIsOn(false)
        console.log('power is off')
    }

    // if (!pokemon.length) return <h1>...Loading</h1>

    return (
        <div className='PokedexPage'>

        <div className='TopBar'>
            <div className='Camera border light'>
                <div className='Glare1'></div>
                <div className='Glare2'></div>
            </div>
            <div className='LightContainer'>
                <div className='light FirstLight'></div>
                <div className='light SecondLight'></div>
                <div className='light ThirdLight'></div>
            </div>
            <div className='EmptySpace1'></div>
        </div>
        <div className='Pokedex'>
            <div className='LeftHalf'>
                <div className='Console'>
                    <div className='ScreenPlate border shadow'>
                        <div className='plateTop'>
                            <div className='screenLight'></div>
                            <div className='screenLight'></div>
                        </div>
                        
                        {/* This is the Pokedex screen */}
                        { isOn
                            ?
                                pokemon.length 
                                ? 
                                    // If searchInput Pokemon not found, show inputError. Otherwise show searchInput pokemon
                                    inputError
                                    ?
                                    <div className='onScreen border'>{inputError}</div>
                                    :
                                    <div className='onScreen border' style={divStyle}/> 
                                : 
                                <div className='onScreen border'>...Loading</div>
                            :
                            <div className='offScreen border'></div>
                        }
                        
                        <div className='plateBottom'>
                            <div className='screenLight bottomLight'></div>
                            <div className='plateSpeaker'>
                                <div className='speakerDiv' />
                                <div className='speakerDiv' />
                                <div className='speakerDiv' />
                                <div className='speakerDiv' />
                            </div>
                        </div>
                    </div>
                    <div className='NESController'>
                        <div className='JoystickContainer'>
                            <div className='Joystick border shadow'></div>
                        </div>
                        <div className='ButtonHolder'>
                            <div className='ButtonPair1'>
                                <div className='Button1 pause border'></div>
                                <div className='Button2 pause border'></div>
                            </div>
                            <div className='GreenSquare border'></div>
                        </div>
                        <div className='DpadContainer'>
                            <div className='Dpad center'>
                                <div className='innerCircle'></div>
                                <div className='Dpad top'></div>
                                <div className='Dpad right'></div>
                                <div className='Dpad bottom'></div>
                                <div className='Dpad left'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Separator'></div>
            </div>
            <div className='RightHalf'>
                <div className='EmptySpace2'></div>


                {/* Pokename and data is displayed here */}
                {
                currentPokemon && isOn
                ?
                    inputError 
                    ?
                    <div className='BlackBox border'>...awaiting valid Pokemon Entry</div>
                    :
                    <div className='BlackBox border'>
                        <h3>{currentPokemon && capitalize(currentPokemon.name)}</h3>
                        {/* Add rest of info:  types(for loop through types), weight, id#, base stats, etc. */}
                        {currentPokemon.types.map((obj, i) => {
                            return (
                                <p key={i}>Type {i + 1}: {obj.type.name}</p>
                            )
                        })}
                    </div>
                :
                    <div className='BlackBox border'/>
                }

                <div className='BlueBox border shadow'></div>
                <div className='ButtonPair2'>
                    <span className='Button3 pause border'></span>
                    <span className='Button4 pause border'></span>
                </div>
                <div className='BoxLightContainer'>
                    <div className='DoubleButtons border radius shadow'>
                        <div className='DoubleButtons DoubleButton1' onClick={togglePowerOn}>ON</div>
                        <div className='DoubleButtons ButtonSeparator' />
                        <div className='DoubleButtons DoubleButton2' onClick={togglePowerOff}>OFF</div>
                    </div>
                    <div className='BigYellow light border'></div>
                </div>
                <div className='RectangleContainer'>
                    <div className='Rectangle R1 border radius'></div>
                    <div className='Rectangle R2 border radius'></div>
                </div>

            </div>
        </div>

        </div>
    )
}
