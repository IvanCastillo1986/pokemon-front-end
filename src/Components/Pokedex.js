import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import './Pokedex.css'
import { capitalize } from '../Helper/capitalize'



export default function Pokedex({ pokemon }) {

    const [currentPokemon, setCurrentPokemon] = useState(pokemon[0])
    const [divStyle, setDivStyle] = useState({})
    const [isOn, setIsOn] = useState(false)
    const [inputError, setInputError] = useState('')
    const [blackBoxY, setBlackBoxY] = useState(0)
    
    // If we are pulling from SearchInput
    const location = useLocation()

    const blackBoxRef = useRef(null)

    useEffect(() => {
        // If we have pokemon[] ready from API call, sets currentPokemon
        if (pokemon.length) {
            setCurrentPokemon(pokemon[0])
        }

    }, [pokemon])
    
    useEffect(() => {

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
        // Sets currentPokemon to render, based on input from CardsPage Searchbar
        if (location.state) {
            setIsOn(true)
            const { searchInput } = location.state

            if (isNaN(Number(searchInput))) {
                let findPokemon = pokemon.find(mon => mon.name.toLowerCase() === searchInput.toLowerCase())
                if (findPokemon) {
                    setCurrentPokemon(findPokemon)
                } else {
                    setInputError('Sorry, could not find that Pokemon in database. Choose from one of first 151 Pokemon.')
                }
            }

            if (!isNaN(searchInput)) {
                if (searchInput <= 151 && searchInput >= 1) {
                    setCurrentPokemon(pokemon[searchInput - 1])
                } else {
                    setInputError('Sorry, the Pokemon id needs to be one of first 151 Pokemon.')
                }
            }
        }

    }, [currentPokemon])


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

    const dPadUp = () => {
        console.log('clicking up')

        if (currentPokemon) { // Assures no bug if pressed during ...Loading
            if (blackBoxY > 0) {
                setBlackBoxY(blackBoxY - 15)
                blackBoxRef.current.scrollTo(0, blackBoxY)
            }
        }
    }
    const dPadDown = () => {
        let blackBox = blackBoxRef.current
        console.log('clicking down')

        if (currentPokemon) { // Assures no bug if pressed during ...Loading
            if (blackBoxY < blackBox.scrollHeight - blackBox.clientHeight) {
                setBlackBoxY(prev => prev + 15)
                blackBox.scrollTo(0, blackBoxY)
            }
        }
    }
    // scrollHeight is 191px (the height of the element's content, including content not visible because of overflow)
    // clientHeight is 90
    // border is 8px
    // offSet height is 98px (because it's the clientHeight + border)

    const dPadRight = () => {
        console.log('clicking right')
        // we are setting currentPokemon using the same id, because we're retrieving the pokemon[index], and array[idx] starts at 0
        if (currentPokemon) { // Assures no bug if pressed during ...Loading
            if (currentPokemon.id === 151) {
                setCurrentPokemon(() => pokemon[0])
            } else {
                setCurrentPokemon(prev => pokemon[prev.id])
            }
        }
    }
    const dPadLeft = () => {
        console.log('clicking left')

        if (currentPokemon) {
            if (currentPokemon.id === 1) {
                setCurrentPokemon(() => pokemon[150])
            } else {
                setCurrentPokemon(() => pokemon[currentPokemon.id - 2])
            }
        }
    }


    return (
        <div className='PokedexPage'>

        <div className='TopBar'>
            <div className={isOn ? 'CameraOn light' : 'Camera border light'}
            >
                {!isOn && <div className='Glare1'></div>}
                {!isOn && <div className='Glare2'></div>}
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
                                <div className='Dpad top' onClick={() => {isOn && dPadUp()}} />
                                <div className='Dpad right' onClick={() => {isOn && dPadRight()}} />
                                <div className='Dpad bottom' onClick={() => {isOn && dPadDown()}} />
                                <div className='Dpad left' onClick={() => {isOn && dPadLeft()}} />
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
                    <div className='BlackBox border' ref={blackBoxRef} >
                        <h3>{currentPokemon && capitalize(currentPokemon.name)}</h3>
                        <p>ID# {currentPokemon.id}</p>
                        <p>Height: {currentPokemon.height} inches</p>
                        <p>Weight: {currentPokemon.weight} lbs.</p>
                        
                        {currentPokemon.types.map((obj, i) => {
                            return (
                                <p key={i}>Type {i + 1}: {capitalize(obj.type.name)}</p>
                            )
                        })}
                        {currentPokemon.twoMoves.map((obj, i) => {
                            return (
                                <p key={i}>Move {i + 1}: {capitalize(obj.move.name)}</p>
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
                    
                    {/* The ON and OFF buttons */}
                    <div className='DoubleButtons border radius shadow'>
                        <div className='DoubleButtons OnButton' onClick={togglePowerOn} style={isOn ? {background: 'gray'} : {}}>ON</div>
                        <div className='DoubleButtons ButtonSeparator' />
                        <div className='DoubleButtons OffButton' onClick={togglePowerOff}>OFF</div>
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
