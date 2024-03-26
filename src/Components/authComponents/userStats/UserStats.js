import React, { useContext} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { UserContext } from '../../../UserContext'

import { capitalize } from '../../../Helper/capitalize'

import './UserStats.css'



export default function UserStats() {

    const { user } = useContext(UserContext)
    const history = useHistory()

    return (
        <div className='UserStats'>
            <h1>My stats</h1>
            <div className='win-loss'>
                <div className='win'>
                    <p>Wins:</p>
                    <p>{user.currentUser?.wins}</p>
                </div>
                <div className='loss'>
                    <p>Losses:</p>
                    <p>{user.currentUser?.losses}</p>
                </div>
            </div>

            <h1>My Items</h1>
            <ul className='my-items'>
                {user.currentItems.map(item => {
                    return (
                        <li className='item' key={item.item_id}>
                            <p className='item-name'>{capitalize(item.item_name)}</p>
                            <p>{item.item_desc}</p>
                            <p>Quantity: {item.bagIdArr.length}</p>
                        </li>
                    )
                })}
            </ul>

            <h1>My Pokemon</h1>
            {user.currentPokemon?.length > 5 // if user has chosen starter, then show their Pokemon
            ?
            <ul className='pokemon-list'>
                {user.currentPokemon.map(pokemon => {
                    return (
                    <div key={pokemon.id}>
                        <li className='pokemon'>
                            <div>
                                <span className='label'>Name:</span> 
                                <span className='content'>{capitalize(pokemon.name)}</span> 
                            </div>
                            <div>
                                <span className='label'>Type:</span> 
                                <span className='content'>{capitalize(pokemon.type1)}</span>
                                {pokemon.type2 && <span className='content'>{capitalize(pokemon.type2)}</span>}
                            </div>
                            <div>
                                <span className='label'>Moves:</span> 
                                <span className='content'>{capitalize(pokemon.move1)}</span>
                                <span className='content'>{capitalize(pokemon.move2)}</span>
                            </div>
                            <div>
                                <span className='label'>Level:</span> 
                                <span className='content stat-value'>{pokemon.lvl}</span>
                            </div>
                            <div>
                                <span className='label'>Exp:</span> 
                                <span className='content stat-value'>{pokemon.exp}</span>
                            </div>
                            <div>
                                <span className='label pokemon-stat'>Attack:</span> 
                                <span className='content stat-value'>{pokemon.atk}</span>
                            </div>
                            <div>
                                <span className='label pokemon-stat'>Defense:</span> 
                                <span className='content stat-value'>{pokemon.def}</span>
                            </div>
                            <div>
                                <span className='label pokemon-stat'>Special Attack:</span> 
                                <span className='content stat-value'>{pokemon.special_atk}</span>
                            </div>
                            <div>
                                <span className='label pokemon-stat'>Special Defense:</span> 
                                <span className='content stat-value'>{pokemon.special_def}</span>
                            </div>
                            <div>
                                <span className='label pokemon-stat'>Speed:</span> 
                                <span className='content stat-value'>{pokemon.speed}</span>
                            </div>
                        </li>
                        <hr />
                    </div>)
                })}
            </ul>
            :
            <div className='getDeck'>
                <p>You have no Pokemon yet. Go to the Play page and grab your deck!</p>
                <button onClick={() => history.push('/play')}>Play Page</button>
            </div>
            }
        </div>
    )
}
