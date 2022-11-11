let arr = [1,2,3]

let num = 8

arr.unshift(num)

console.log(arr)

console.log(Math.floor(Math.random() * 2))

let time = 2000

let firstCall = setTimeout(() => console.log('1st call'), time)
time += 2000
let secondCall = setTimeout(() => console.log('2nd call'), time)
time += 2000
let thirdCall = setTimeout(() => console.log('3rd call'), time)

// clearTimeout(secondCall)
// clearTimeout(thirdCall)



// console.log(setTimeout)