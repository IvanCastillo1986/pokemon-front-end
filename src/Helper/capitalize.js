const capitalize = (name) => {

    let splitStr = name.split('')
    let firstChar = splitStr[0].toUpperCase()
    let others = splitStr.slice(1)
    let newName = firstChar + others.join('')

    if (newName.includes('-')) {

        let spaced = newName.replace('-', ' ')
        let spaceSplit = spaced.split(' ')
        let firstWord = spaceSplit[0]
        let nextWord = spaceSplit[1]
        let newSplit = nextWord.split('')
        let newFirstChar = nextWord[0].toUpperCase()
        let newOthers = newSplit.slice(1)
        let secondWord = newFirstChar + newOthers.join('')
        let finalWord = firstWord + ' ' + secondWord
        
        return finalWord
    }
    return newName
}
// capitalize also removes hyphens    

const capitalizeObject = (object) => {
    object.name = capitalize(object.name)
    return object
}


export { capitalize, capitalizeObject };
// module.exports = { capitalize, capitalizeObject }