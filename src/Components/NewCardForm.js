import React from 'react'


export default function NewCardForm() {

    return (
        <div className='NewCard'>
            <form className='NewCardForm' action="">
                <label htmlFor="name">Name:</label>
                <input type="text" id='name' />
                <label htmlFor="hp">HP:</label>
                <input type="text" id='hp' />
                <label htmlFor="type">Type:</label>
                <input type="text" id='type' />
                <label htmlFor="move">Move:</label>
                <input type="text" id='move' />
                <label htmlFor="attack">Attack:</label>
                <input type="text" id='attack' />
                <label htmlFor="defense">Defense:</label>
                <input type="text" id='defense' />
                <label htmlFor="speed">Speed:</label>
                <input type="text" id='speed' />
            </form>
        </div>
    )
}
