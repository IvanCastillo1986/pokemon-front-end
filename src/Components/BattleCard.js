import '../Pages/Cards.css'



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
                <span className='Move'>{pokemon.move1}</span><br/>
                <span className='Move'>{pokemon.move2}</span>
            </div>
            <div>
                <span className='Atk'>Atk: {pokemon.atk}</span> <span className='Def'>Def: {pokemon.def}</span>
            </div>
            <span className='Spd'>Spd: {pokemon.spd}</span>
        </div>
    )
}
