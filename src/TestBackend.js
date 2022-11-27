import React, { useState, useEffect } from 'react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'

const url = process.env.REACT_APP_API_URL

export default function TestBackend({ pokemon }) {

    const [nameInput, setNameInput] = useState("")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmitName = () => {

    }

    useEffect(() => {
        setLoading(true)
        axios.get(`${url}/users`)
        .then(res => {
            setUsers(res.data)
            setLoading(false)
        })
    }, [])

    return (
        <div className='testBackend'>
            <h1>Test the Back-end!</h1>
            <div>
                <label htmlFor="your-name">What is your name?</label>
                <input id="your-name" type="text" onChange={(e) => setNameInput(e.target.value)} />
                <input type="submit" value="Submit Name" />
            </div>

            <div className='showUsersDiv'>
                {loading ?
                    <p>...Loading</p>
                :
                    users.map((user, i) => {
                        return <p key={i}>{user.first_name} {user.last_name}</p>
                    })
                }
            </div>

        </div>
    )
}
