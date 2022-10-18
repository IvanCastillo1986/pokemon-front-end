import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import './Pokedex.css'
import axios from 'axios'
import { useLayoutEffect } from 'react'


export default function Pokedex({ pokemon }) {

    const [currentPokemon, setCurrentPokemon] = useState(pokemon[0])
    const [divStyle, setDivStyle] = useState({})
    const [isOn, setIsOn] = useState(false)
    
    // console.log('currentPokemon', currentPokemon)
    
    // If we are rendering from a Pokemon
    const location = useLocation()
    // if location.state is defined, optional chaining
    let searchInput = location.state?.searchInput

    
    useEffect(() => {

        if (!pokemon.length == 0) {
            setCurrentPokemon(pokemon[0])
        }

    }, [currentPokemon])

    useLayoutEffect(() => {
        if (!pokemon.length == 0) {

            setDivStyle({
                backgroundImage: `url(${currentPokemon?.sprites.other["official-artwork"].front_default})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                margin: 'auto',
            })
        }
    }, [pokemon])

    console.log('pokemon.length', pokemon.length)

    const togglePowerOn = () => {
        setIsOn(true)
        console.log('power is on')
        if (pokemon.length) {
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
                            pokemon.length ? <div className='onScreen border' style={divStyle}/> : <div className='onScreen border'>...Loading</div>
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
                <div className='BlackBox border'></div>
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
