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
                <span className='switch' onClick={() => menuClick('switch')}>ᵖₖᵐₙ</span>
                <span className='item' onClick={() => menuClick('item')}>ITEM</span>
                <span className='defend'>DEFEND</span>
            </div> 
            }
            
            {menuType === 'fight' &&
            <div className='fightMenu'>
                <span className='first-move' onClick={() => handleClickMoveBtn(myPokemon.move1)}>
                    {capitalize(myPokemon.move1)}
                </span>
                <span className='second-move' onClick={() => handleClickMoveBtn(myPokemon.move2)}>
                    {capitalize(myPokemon.move2)}
                </span>

                <span className='backBtn' onClick={() => menuClick('main')}>Back</span>
            </div>
            }

            {menuType === 'switch' &&
            <div className='switchMenu'>
                <p>Bring out which POKEMON?</p>
                <div className='switchOptions'>
                    {myBench.map((pokemon, i) => {
                        return <div className='switchOption' onClick={() => handlePokemonSwitch(pokemon.name)} key={i}>
                            <span className='pokeName'>{pokemon.name.toUpperCase()}</span> 
                            <span className='L'>Level</span><span className='lvl'>{pokemon.lvl}</span>
                            <span className='L'>HP</span><span className='lvl'>{pokemon.remaining_hp}/ {pokemon.hp}</span>
                        </div>
                    })}
                </div>
                <span onClick={() => menuClick('main')} className='backBtn'>Back</span>
            </div>
            }

            {menuType === 'item' && 
                renderItemMenu()
            }

            {/* This menu needs to be different from switchMenu. It uses a different function to switch KO'd Pokemon */}
            {menuType === 'newPokemonAfterKO' &&
            <div className='switchMenu'>
                <p>Bring out which POKEMON?</p>
                <div className='switchOptions'>
                    {myBench.map((pokemon) => {
                        return <div className='switchOption' onClick={() => handleClickPokemonAfterKO(pokemon.id)} key={pokemon.id}>
                            <span className='pokeName'>{pokemon.name.toUpperCase()}</span> 
                            <span className='L'>:L</span><span className='lvl'>{pokemon.lvl}</span>
                            <span className='hp'>HP {pokemon.remaining_hp}/ {pokemon.hp}</span>
                        </div>
                    })}
                </div>
            </div>
            }

            {menuType === 'playerWonMenu' &&
            <div className='playerWonMenu'>
                {/* after scripts are done running, set this menu to display */}
                <h2>Congrats! You've won the match</h2>
            </div>
            }

            {menuType === 'playerLostMenu' &&
            <div className='playerLostMenu'>
                {/* after scripts are done running, set this menu to display */}
                <h2>You lost. Try using weaknesses and items.</h2>
            </div>
            }

        </div> 
    )
}
