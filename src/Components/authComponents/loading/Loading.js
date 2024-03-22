import React from 'react'
import './Loading.css'



export default function Loading({ messagesArr }) {

    return (
        <div className='Loading'>
            <h3>Loading...</h3>
            {
                messagesArr &&
                messagesArr.map((message, idx) => {
                    return <p key={idx}>{message}</p>
                })
            }
        </div>
    )
}
