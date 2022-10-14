const printMoves = (arr) => {
    // this function will take a list of all Pokemon's moves, and reduce them to only one instance 
    // of each move if there are repeats
    const newArr = []
    for (let move of arr) {
        if (!newArr.includes(move)) {
            newArr.push(move)
        }
    }
    return newArr
}


export { printMoves }
// module.exports = {printMoves}