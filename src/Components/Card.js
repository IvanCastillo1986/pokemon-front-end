import React from 'react'

export default function Card({ pokemon }) {



    return (
        <div className='Card'>
            <div className='Name'>{pokemon.name}</div>
            <div className='Row1'>
                <span className='HP'>{pokemon.stats[0].base_stat}HP</span> <span className='Type'>{pokemon.types[0].type.name}</span>
            </div>
            <div className='Row2'>
                <img className='Image' src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
            </div>
            <div>
                <span className='Ability'>
                    { pokemon.abilities[1]
                    ?
                        pokemon.abilities[1].ability.name
                    :
                        pokemon.abilities[0].ability.name
                    }
                </span>
            </div>
            <div>
                <span className='Atk'>Atk: {pokemon.stats[1].base_stat}</span> <span className='Def'>Def: {pokemon.stats[2].base_stat}</span>
            </div>
            <span className='Spd'>Spd: {pokemon.stats[5].base_stat}</span>
        </div>
    )
}
