import React from 'react'



export default function Pokedex({ pokemon }) {



    return (
        <div className='PokedexPage'>

        <div className='TopBar'></div>
        <div className='Pokedex'>
            <div className='LeftHalf'>
                <div className='Console'>
                    <div className='EmptySpace'></div>
                    <div className='ScreenPlate border'>
                        <div className='Screen border'></div>
                    </div>
                    <div className='NESController'>
                        <div className='JoystickContainer'>
                            <div className='Joystick border'></div>
                        </div>
                        <div className='ButtonHolder'>
                            <div className='ButtonPair1'>
                                <div className='Button1 pause border'></div>
                                <div className='Button2 pause border'></div>
                            </div>
                            <div className='GreenSquare border'></div>
                        </div>
                        <div className='DpadContainer'>
                            <div className='Dpad'></div>
                        </div>
                    </div>
                </div>
                <div className='Separator'></div>
            </div>
            <div className='RightHalf'>
                <div className='EmptySpace'></div>
                <div className='BlackBox border'></div>
                <div className='BlueBox border'></div>
                <div className='ButtonPair2'>
                    <span className='Button3 pause border'></span>
                    <span className='Button4 pause border'></span>
                </div>
                <div className='BoxLightContainer'>
                    <div className='DoubleButtons border radius'></div>
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
