export const countSkill = (arr) => {
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
console.log(countSkill([
    "swords-dance",
    "cut",
    "fire-punch",
    "ice-punch",
    "string-shot",
    "harden",
    "gust",
    "headbutt"
]))

const countValues = (obj) => {
    const newObj = {}
    for (let value of obj) {
        if (newObj[value]) {
            console.log('will use later')
        }
    }
}


// This will break the build, because I was trying to mix Node.js style exports with ES6 exports (which is used by React)
// This is a Node.js export
// module.exports = { countSkill }