import React, { useState } from 'react'



export default function Script({ script }) {


    // Script might recieve a certain number of arguments to determine how long it'll be active for.
    // If each setTimeout is 2 seconds, it means we either: 
        // pass in the amount of setTimeouts in an array to execute
        // create functions in Table and pass here to tell Script what it's



    return (
        <div className='script'>
            {script}
        </div>
    )
}
