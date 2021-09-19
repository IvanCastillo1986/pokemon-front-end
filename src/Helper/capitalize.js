const capitalize = (name) => {
    const splitStr = name.split('')
    const firstChar = splitStr[0].toUpperCase()
    const others = splitStr.slice(1)
    return firstChar + others.join('')
}


const capitalizeObject = (object) => {
    object.name = capitalize(object.name)
    return object
}


module.exports = { capitalize, capitalizeObject }