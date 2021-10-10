import React from 'react'



export default function Pokedex({ pokemon }) {



    return (
        <div className='PokedexPage'>

        <div className='TopBar'>
            <div className='EmptySpace1'></div>
        </div>
        <div className='Pokedex'>
            <div className='LeftHalf'>
                <div className='Console'>
                    <div className='ScreenPlate border shadow'>
                        <div className='Screen border'></div>
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
                    <div className='DoubleButtons border radius shadow'></div>
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
