const countSkill = (arr) => {
    const obj = {count: 0}
    // takes in an array
    // iterates through array
        // if move does not exist, add move to object with value of 0
        // if move exists in array, increments amount of each move
    for (let move of arr) {
        if (obj.hasOwnProperty(move)) {
            obj[move]++
            obj.count++
        } else {
            obj[move] = 1
            obj.count++
        }
    }
    return obj
}

const countValues = (obj) => {
    const newObj = {}
    for (let value of obj) {
        if (newObj[value]) {
            
        }
    }
}



module.exports = { countSkill }