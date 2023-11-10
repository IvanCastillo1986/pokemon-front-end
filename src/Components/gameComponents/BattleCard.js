import '../../Pages/Cards.css'

// import { capitalize } from '../Helper/capitalize'


export default function BattleCard({ pokemon, battleCardStyle, nameStyle, statStyle, imgStyle }) {

    // Why couldn't I console log this?
    // console.log(cardStyle.battleCard)
    

    return (
        <div className='BattleCard' style={battleCardStyle} >
            <div className='Name' style={nameStyle} >{pokemon.name}</div>
            <div className='Row1' style={statStyle} >
                <span className='HP'>{pokemon.hp}HP</span> <span className='Type'>{pokemon.type1}</span>
            </div>
            <div className='Row2'>
                <img className='Image' src={pokemon.front_img} alt={pokemon.name} style={imgStyle} />
            </div>
            <div className='Moves'>
                <span className='Move'>{pokemon.move1}</span><br/>
                <span className='Move'>{pokemon.move2}</span>
            </div>
            <div style={statStyle} >
                <span className='Atk'>Atk: {pokemon.atk}</span> <span className='Def'>Def: {pokemon.def}</span>
            </div>
            <span style={statStyle} className='Spd'>Spd: {pokemon.speed}</span>
        </div>
    )
}
