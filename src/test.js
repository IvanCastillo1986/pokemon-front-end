let arr = [1,2,3]

let num = 8

arr.unshift(num)

console.log(arr)

console.log(Math.floor(Math.random() * 2))

setTimeout(() => console.log('1st call'), 2000)
setTimeout(() => console.log('2nd call'), 6000)
setTimeout(() => console.log('3rd call'), 4000)


console.log(setTimeout)