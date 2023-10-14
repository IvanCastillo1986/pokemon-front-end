import {useState, useEffect} from 'react'

// (key, initialValue)  =>  [value, setValue]  =>  [user, setUser]

const useSessionStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const storedValue = sessionStorage.getItem(key)

        return storedValue ? JSON.parse(storedValue) : initialValue
    })

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    // Here, we return an array much like the one returned by useState. 
    // We can access the value, and the function to change it!
    return [value, setValue]
}

export { useSessionStorage }