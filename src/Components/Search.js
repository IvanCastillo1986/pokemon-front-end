import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


export default function Search() {

    const [idOrNameInput, setIdOrNameInput] = useState('')
    const history = useHistory()

    const handleChange = (e) => {
        const { value } = e.target
        setIdOrNameInput(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // history.push(`/cards/${id}`)
        history.push(`/pokedex`, { searchInput: idOrNameInput })
    }


    return (
        <div className='Search'>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="search">Search for pokemon by name or Pokedex #: </label>
                <input onChange={handleChange} type="text" name="" id="search" value={idOrNameInput} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
