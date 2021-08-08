import React, { useState } from 'react'

export default function Card({ pokemon }) {

    const [pokemonStats] = useState({
        name: pokemon.name,
        hp: pokemon.stats[0].base_stat,
        image: pokemon.sprites.other.dream_world.front_default,
        move: pokemon.moves[0].move.name,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat
    })

    console.log(pokemonStats)

    return (
        <div className='Card'>
            <div className='Name'>{pokemon.name}</div>
            <div className='Row1'>
                <span className='HP'>{pokemon.stats[0].base_stat}HP</span> <span className='Type'>{pokemon.types[0].type.name}</span>
            </div>
            <div className='Row2'>
                <img className='Image' src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
            </div>
            <div>
                <span className='Move'>{pokemon.moves[0].move.name}</span>
            </div>
            <div>
                <span className='Atk'>Atk: {pokemon.stats[1].base_stat}</span> <span className='Def'>Def: {pokemon.stats[2].base_stat}</span>
            </div>
            <span className='Spd'>Spd: {pokemon.stats[5].base_stat}</span>
        </div>
    )
}
