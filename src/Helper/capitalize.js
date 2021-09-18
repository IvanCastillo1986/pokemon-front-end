const capitalize = (name) => {
    // take in a string
    // split string into array on each character
    const splitStr = name.split('')

    // capitalize only first item in array:
        // save the first item capitalized in one variable
        // save every item except the first one in another variable
    const firstChar = splitStr[0].toUpperCase()
    const others = splitStr.slice(1)

    // return the two variables joined into string
    return firstChar + others.join('')
}

// console.log(capitalize(''))

module.exports = {capitalize}