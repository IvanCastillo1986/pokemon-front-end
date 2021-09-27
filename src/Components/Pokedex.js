import React from 'react'



export default function Pokedex({ pokemon }) {



    return (
        <div className='PokedexPage'>

        <div className='TopBar'></div>
        <div className='Pokedex'>
            <div className='LeftHalf'>
                <div className='Console'>
                    <div className='EmptySpace'></div>
                    <div className='ScreenPlate'>
                        <div className='Screen'></div>
                    </div>
                    <div className='NESController'>
                        <div className='JoystickContainer'>
                            <div className='Joystick'></div>
                        </div>
                        <div className='ButtonHolder'>
                            <div className='ButtonPair1'>
                                <div className='Button1 Pause'></div>
                                <div className='Button2 Pause'></div>
                            </div>
                            <div className='TurquoiseSquare'></div>
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
                <div className='BlackBox'></div>
                <div className='BlueBox'></div>
                <span className='Button3 Pause'></span> <span className='Button4 Pause'></span>
            </div>
        </div>

        </div>
    )
}
