import '../Pages/Cards.css'
import { capitalize } from '../Helper/capitalize'



export default function Card({ pokemon }) {


    return (
        <div className='Card'>
            <div className='Name'>{pokemon.name}</div>
            <div className='Row1'>
                <span className='HP'>{pokemon.hp}HP</span> <span className='Type'>{pokemon.type}</span>
            </div>
            <div className='Row2'>
                <img className='Image' src={pokemon.image} alt={pokemon.name} />
            </div>
            <div>
                <span className='Move'>{capitalize(pokemon.move1.move.name)}</span><br/>
                <span className='Move'>{capitalize(pokemon.move2.move.name)}</span>
            </div>
            <div>
                <span className='Atk'>Atk: {pokemon.atk}</span> <span className='Def'>Def: {pokemon.def}</span>
            </div>
            <span className='Spd'>Spd: {pokemon.spd}</span>
        </div>
    )
}
