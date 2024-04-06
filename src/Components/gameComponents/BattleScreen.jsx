import React, { useState } from 'react'

import './BattleScreen.css'




export default function BattleScreen({ testPokemon }) {

    const [pokemon1, setPokemon1] = useState(testPokemon[1])
    const [pokemon2, setPokemon2] = useState(testPokemon[0])

    console.log(pokemon1)
    console.log(pokemon2)


    return (
        <div className='BattleScreen'>
            <div className='top-section'>
                <div className='player2-data'>
                    <p className='pokename'>BLASTOISE</p>
                    <p className='pokelvl'>L77</p>
                    <p className='pokehp'>88/291</p>
                </div>
                <div className='sprite-container-p2'>
                    <img className='player2-sprite' src={pokemon2.sprites.versions['generation-iv']['diamond-pearl'].front_default}/>
                    {/* <img className='player2-sprite' src={pokemon2.front_img}/> */}
                </div>
            </div>
            <div className='middle-section'>
                <div className='sprite-container-p1'>
                    <img className='player1-sprite' src={pokemon1.sprites.versions['generation-iv']['diamond-pearl'].back_default}/>
                    {/* <img className='player1-sprite' src={pokemon1.rear_img}/> */}
                </div>
                <div className='player1-data'>
                    <p className='pokename'>AMPHAROS</p>
                    <p className='pokelvl'>L63</p>
                    <p className='pokehp'>222/222</p>
                </div>
            </div>
            <div className='bottom-section'>
                <div className='menu'>Menu</div>
            </div>
        </div>
    )
}
