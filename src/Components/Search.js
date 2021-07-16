import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


export default function Search() {

    const [id, setId] = useState('')
    const history = useHistory()

    const handleChange = (e) => {
        const { value } = e.target
        setId(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/cards/${id}`)
    }


    return (
        <div className='Search'>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="search">Search for pokemon by name or Pokedex #: </label>
                <input onChange={handleChange} type="text" name="" id="search" value={id} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
