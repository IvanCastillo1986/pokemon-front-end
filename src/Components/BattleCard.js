import '../Pages/Cards.css'

import { capitalize } from '../Helper/capitalize'


export default function BattleCard({ pokemon, battleCardStyle, nameStyle, statStyle, imgStyle }) {

    // Why couldn't I console log this?
    // console.log(cardStyle.battleCard)
    

    return (
        <div className='BattleCard' style={battleCardStyle} >
            <div className='Name' style={nameStyle} >{pokemon.name}</div>
            <div className='Row1' style={statStyle} >
                <span className='HP'>{pokemon.hp}HP</span> <span className='Type'>{pokemon.type}</span>
            </div>
            <div className='Row2'>
                <img className='Image' src={pokemon.image} alt={pokemon.name} style={imgStyle} />
            </div>
            <div className='Moves'>
                <span className='Move'>{capitalize(pokemon.move1.move.name)}</span><br/>
                <span className='Move'>{capitalize(pokemon.move2.move.name)}</span>
            </div>
            <div style={statStyle} >
                <span className='Atk'>Atk: {pokemon.atk}</span> <span className='Def'>Def: {pokemon.def}</span>
            </div>
            <span style={statStyle} className='Spd'>Spd: {pokemon.spd}</span>
        </div>
    )
}
