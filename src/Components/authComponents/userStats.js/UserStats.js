import React, { useContext} from 'react'
import { UserContext } from '../../../UserContext'

import { capitalize } from '../../../Helper/capitalize'

import './UserStats.css'



export default function UserStats() {

    const {user} = useContext(UserContext)

    
    return (
        <div className='UserStats'>
            <h1>My stats</h1>
            <div className='win-loss'>
                <div className='win'>
                    <p>Wins:</p>
                    <p>{user.currentUser.wins}</p>
                </div>
                <div className='loss'>
                    <p>Losses:</p>
                    <p>{user.currentUser.losses}</p>
                </div>
            </div>
            <h1 className='pokemon-header'>My Pokemon</h1>
            <ul>
                {user.currentPokemon.map(pokemon => {
                    return (
                    <div key={pokemon.id}>
                        <li>
                            <p className='label'>Name:</p> <p className='content'>{capitalize(pokemon.name)}</p> 
                            <p className='label'>Type:</p> <p className='content'>{capitalize(pokemon.type1)}{pokemon.type2 && `, ${capitalize(pokemon.type2)}`}</p>
                            <p className='label'>Moves:</p> <p className='content'>{capitalize(pokemon.move1)}, {capitalize(pokemon.move2)}</p>
                            <p className='label'>Level:</p> <p className='content'>{pokemon.lvl}</p>
                            <p className='label'>Exp:</p> <p className='content'>{pokemon.exp}</p>
                            <span className='label'>Attack:</span> <span className='content'>{pokemon.atk}</span>
                            <span className='label'>Defense:</span> <span className='content'>{pokemon.def}</span>
                            <span className='label'>Special Attack:</span> <span className='content'>{pokemon.special_atk}</span>
                            <span className='label'>Special Defense:</span> <span className='content'>{pokemon.special_def}</span>
                            <span className='label'>Speed:</span> <span className='content'>{pokemon.speed}</span>
                        </li>
                        <hr />
                    </div>)
                })}
            </ul>
        </div>
    )
}
