import React from 'react'
import { capitalize } from '../../Helper/capitalize'

import Script from './Script'







export default function Menu({
    menuType, setMenuType, script, myItems, handleUseItem, myPokemon, handleClickMoveBtn, myBench, 
    handlePokemonSwitch, handleClickPokemonAfterKO
}) {

    const menuClick = (menuType) => {
        setMenuType(menuType)
    }

    const renderItemMenu = () => {
        if (myItems.length > 0) {
            return <div className='itemMenu'>
                <span className='prompt'>Which item would you like to use?</span>
                    <div className='itemsContainer'>
                    {myItems.map((item) => {
                        return (
                        <div className='itemOption' key={item.item_name}>
                            <span 
                                className='name' onClick={() => handleUseItem(item, myPokemon)}
                            >
                                {item.item_name}
                            </span>
                            <span className='quantity'> x {item.quantity}</span>
                        </div>
                    )})}
                    </div>
                <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
            </div>
        } else {
            return <div className='noItemsDiv'>
                <span>You are out of items</span>
                <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
            </div>
        }
    }


    return (
        <div className='screen'>

            {menuType === 'script' &&
                <Script script={script} setMenuType={setMenuType} />
            }

            {menuType === 'main' &&
            <div className='mainTable'>
                <span className='fight' onClick={() => menuClick('fight')}>FIGHT</span>
                <span className='switch' onClick={() => menuClick('switch')}>SWITCH</span>
                <span className='item' onClick={() => menuClick('item')}>ITEM</span>
                <span className='defend'>DEFEND</span>
            </div> 
            }
            
            {menuType === 'fight' &&
            <div className='fightMenu'>
                <span onClick={() => handleClickMoveBtn(myPokemon.move1)}>
                    {capitalize(myPokemon.move1)}
                </span>
                <span onClick={() => handleClickMoveBtn(myPokemon.move2)}>
                    {capitalize(myPokemon.move2)}
                </span>

                <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
            </div>
            }

            {menuType === 'switch' &&
            <div className='switchMenu'>
                <span>Which Pokemon would you like to switch to?</span>
                <div className='switchOptions'>
                    {myBench.map((pokemon, i) => {
                        return <span onClick={handlePokemonSwitch} key={i}>{pokemon.name.toUpperCase()}</span>
                    })}
                </div>
                <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
            </div>
            }

            {menuType === 'item' && 
                renderItemMenu()
            }

            {menuType === 'newPokemonAfterKO' &&
            <div className='switchMenu'>
                <span>Which Pokemon would you like to use next?</span>
                <div className='switchOptions'>
                    {myBench.map((pokemon, i) => {
                        return <span onClick={(e) => handleClickPokemonAfterKO(e)} key={i}>{pokemon.name}</span>
                    })}
                </div>
            </div>
            }

            {menuType === 'playerWonMenu' &&
            <div className='playerWonMenu'>
                {/* after scripts are done running, set this menu to display */}
                <h1>You've won the match</h1>
            </div>
            }

            {menuType === 'playerLostMenu' &&
            <div className='playerLostMenu'>
                {/* after scripts are done running, set this menu to display */}
                <h1>You've lost the match</h1>
            </div>
            }

        </div> 
    )
}
