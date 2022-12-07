import React from 'react'
import { useLocation } from 'react-router-dom'


export default function Account() {

    const { currentUser } = useLocation().state
    console.log(currentUser)

    
    return (
        <div>
           This is your account information
        </div>
    )
}
