import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


export default function Search() {

    const [idOrName, setIdOrName] = useState('')
    const history = useHistory()

    const handleChange = (e) => {
        const { value } = e.target
        setIdOrName(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // history.push(`/cards/${id}`)
        history.push(`/pokedex`, { searchInput: idOrName })
    }


    return (
        <div className='Search'>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="search">Search for pokemon by name or Pokedex #: </label>
                <input onChange={handleChange} type="text" name="" id="search" value={idOrName} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
