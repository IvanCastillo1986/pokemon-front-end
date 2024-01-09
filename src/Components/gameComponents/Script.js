import React from 'react'

export const handleChangeScript = async (currentScriptArr, setMenuType, setScript) => {
    console.log(setMenuType)
    setMenuType('script')

    // will run scriptArr, starting with first index, and increment script time by 2000ms on each el
    for (let i = 0; i < currentScriptArr.length; i++) {

        setScript(currentScriptArr[i])
        await new Promise(res => setTimeout(res, 500))
    }
    
    setMenuType('main')
}

export default function Script({ script }) {

    // const [script, setScript] = useState('')
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
