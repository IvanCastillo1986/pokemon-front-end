import React, { useState, useEffect } from 'react'

// Two Pokemon are battling each other side by side
    // When one pokemon has lost, flow goes to the next pair of pokemon to battle
// There is one attack button in the center
// The pokemon with the highest speed attacks first
    // The attack will be based on:    Player 1  -  Player 2
    //  remaining_hp = remaining_hp - ((atk * 3) - (def * 2))
// handleClick() is wrapped in setTimeOut function


export default function Battle({ round, deck1, deck2 }) {

    // const [HPleft1, setHPleft1] = useState(deck1[0].hp)
    // const [HPleft2, setHPleft2] = useState(deck2[0].hp)

    const handleAttack = (p1, p2) => {
        let attack1 = p1.atk
        let defense1 = p1.def
        let attack2 = p2.atk
        let defense2 = p2.def

    }


    return (
        <div>
            <h3>Round {round + 1}</h3>
            { deck1 && deck2 ?
                <div>
                    <span>Name: {}</span> - <span>Name: {}</span><br />
                    <span>HP: {}</span> - <span>HP: {}</span><br />
                    <button onClick={handleAttack}>Attack!</button>
                </div> :
                null
            }
        </div>
    )
}

// Player 1 attacks first!
// Zapdos uses Razor-Wind
// Poliwhirl loses * hp
