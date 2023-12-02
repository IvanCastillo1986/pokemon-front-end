// This file contains all the functions to be performed on user items from back-end



// This function takes an array of items, and decides where it belongs via convertedItems
// It then mutates the convertedItems array and adds quantity and bagIds to each item
const convertUsableItems = (itemsArr) => {
    const convertedItems = [
        {item_id: 1, bagIdArr: [], name: "potion", quantity: 0},
        {item_id: 2, bagIdArr: [], name: "super potion ", quantity: 0},
        {item_id: 3, bagIdArr: [], name: "lemonade", quantity: 0},
        {item_id: 4, bagIdArr: [], name: "ether", quantity: 0},
    ]
    
    for (const item of itemsArr) {
        const currentItem = convertedItems[item.item_id - 1]
        currentItem.quantity++
        currentItem.bagIdArr.push(item.id)
    }

    // if item quantity in output array is 0, remove from array
    for (let i = 0; i < convertedItems.length; i++) {
        const item = convertedItems[i]
        if (item.quantity < 1) convertedItems.splice(i, 1)
    }

    return convertedItems
}

// This function decrements item onClick, and it also removes item if quantity reaches 0
const decrementItemQuantity = (itemsArr, itemName) => {
    const decrementedArr = [...itemsArr]

    for (let i = 0; i < decrementedArr.length; i++) {
        const item = decrementedArr[i]
        if (item.name === itemName) {
            item.quantity--
            item.bagIdArr.shift()
        }
        if (item.quantity < 1) {
            decrementedArr.splice(i, 1)
            i--
        }
    }

    return decrementedArr
}

const applyItem = (item) => {

}

module.exports = { convertUsableItems, decrementItemQuantity }








// TEST FUNCTION
// console.log(convertUsableItems([
//     {
//       "id": 4,
//       "item_name": "potion",
//       "effect": null,
//       "hp_restored": 20,
//       "pp_restored": null,
//       "item_desc": "Restores 20 hp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 1
//     },
//     {
//       "id": 3,
//       "item_name": "potion",
//       "effect": null,
//       "hp_restored": 20,
//       "pp_restored": null,
//       "item_desc": "Restores 20 hp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 1
//     },
//     {
//       "id": 1,
//       "item_name": "potion",
//       "effect": null,
//       "hp_restored": 20,
//       "pp_restored": null,
//       "item_desc": "Restores 20 hp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 1
//     },
//     {
//       "id": 2,
//       "item_name": "ether",
//       "effect": null,
//       "hp_restored": null,
//       "pp_restored": 10,
//       "item_desc": "Restores 10 pp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 4
//     },
//     {
//       "id": 5,
//       "item_name": "super potion",
//       "effect": null,
//       "hp_restored": null,
//       "pp_restored": 10,
//       "item_desc": "Restores 10 pp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 2
//     },
//     {
//       "id": 6,
//       "item_name": "super potion",
//       "effect": null,
//       "hp_restored": null,
//       "pp_restored": 10,
//       "item_desc": "Restores 10 pp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 2
//     },
//     {
//       "id": 7,
//       "item_name": "super potion",
//       "effect": null,
//       "hp_restored": null,
//       "pp_restored": 10,
//       "item_desc": "Restores 10 pp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 2
//     }
// ]))
