import React, { useState } from 'react'

import Menu from './Menu'
import './BattleScreen.css'




export default function BattleScreen({ myPokemon, enemyPokemon,
    menuType, setMenuType, script, myItems, handleUseItem,
    handleClickMoveBtn, myBench, handlePokemonSwitch, handleClickPokemonAfterKO
}) {



    return (
        <div className='BattleScreen'>
            <div className='top-section'>
                <div className='player-data'>
                    <p className='player'>Player 2</p>
                    <p className='pokename'>{enemyPokemon.name}</p>
                    <hr />
                    <p className='pokelvl'>:L{enemyPokemon.lvl}</p>
                    <p className='pokehp'>{enemyPokemon.remaining_hp}/{enemyPokemon.hp}</p>
                </div>
                <div className='sprite-container-p2'>
                    <img className='player2-sprite' src={enemyPokemon.front_img}/>
                </div>
            </div>

            <div className='middle-section'>
                <div className='sprite-container-p1'>
                    <img className='player1-sprite' src={myPokemon.rear_img}/>
                </div>
                <div className='player-data'>
                    <p className='player'>Player 1</p>
                    <p className='pokename'>{myPokemon.name}</p>
                    <hr />
                    <p className='pokelvl'>:L{myPokemon.lvl}</p>
                    <p className='pokehp'>{myPokemon.remaining_hp}/{myPokemon.hp}</p>
                </div>
            </div>

            <div className='bottom-section'>
                <Menu 
                    menuType={menuType} setMenuType={setMenuType}
                    script={script} myItems={myItems} handleUseItem={handleUseItem} myPokemon={myPokemon} 
                    handleClickMoveBtn={handleClickMoveBtn} myBench={myBench} 
                    handlePokemonSwitch={handlePokemonSwitch} handleClickPokemonAfterKO={handleClickPokemonAfterKO}
                />
            </div>
        </div>
    )

}
