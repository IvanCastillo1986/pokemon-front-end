import React, { useState, useEffect } from 'react'



export default function Arena({ yourDeck, aiDeck }) {
    {/* 
    This component will recieve the Deck component's playerDeck, and it will render a random deck of starter
    pokemon for the AI opponent. 
    */}

    const [myDeck, setMyDeck] = useState(yourDeck)

    



    return (
        <div>
            Arena
        </div>
    )
}
