// This file contains all the functions to be performed on user items from back-end



// This function takes an array of items, and decides where it belongs via convertedItems
// It then mutates the convertedItems array and adds quantity and bagIds to each item
// Also removes bag id (we don't need this, since used items will be deleted)
const convertUsableItems = (itemsArr) => {
    const itemsAlreadyAddedToOutput = new Set()

    // Will eventually output items like this:
    // {item_id: 1, bagIdArr: [], name: "potion", hp_restored: 20, item_desc: "Restores 20 hp", quantity: 0},
    const convertedItems = [
        {}, // potion
        {}, // super potion
        {}, // lemonade
        {}, // ether
    ]

    for (let i = 0; i < itemsArr.length; i++) {
        const item = itemsArr[i]
        const { item_id } = item

        if (itemsAlreadyAddedToOutput.has(item_id)) {
            // grabs item already in output array, increment quantity and add id to bagIdArr
            const convertedItem = convertedItems[item_id - 1]

            convertedItem.quantity++
            convertedItem.bagIdArr.push(item.id)
        } else {
            // add new properties, remove id property
            item.quantity = 1
            item.bagIdArr = [item.id]
            delete item.id
            
            convertedItems[item_id - 1] = item
            itemsAlreadyAddedToOutput.add(item_id)
        }
        
    }

    // if item in output array is empty, remove from array
    for (let i = 0; i < convertedItems.length; i++) {
        const item = convertedItems[i]
        if (!Object.keys(item).length) {
            convertedItems.splice(i, 1)
            i--
        }
    }

    return convertedItems
}


// This function decrements item onClick, and it also removes item if quantity reaches 0
const decrementItemQuantity = (itemsArr, itemName) => {
    const decrementedArr = [...itemsArr]

    for (let i = 0; i < decrementedArr.length; i++) {
        const item = decrementedArr[i]
        if (item.item_name === itemName) {
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


const applyItem = (item, pokemon) => {
    const effect = item.effect

    if (effect === 'heal') {
        // for restoring hp, doesn't go over max hp
        pokemon.remaining_hp += item.hp_restored
        if (pokemon.hp < pokemon.remaining_hp) pokemon.remaining_hp = pokemon.hp

        return pokemon
    } else if (effect === 'restore') {
        // for restoring pp
        // pokemon.pp += item.pp_restored
        return pokemon
    } else if (effect === 'status') {
        // for restoring status
    }
}


// Returns a number from 1 to numOfItems
const randomItem = (numOfItems) => {
    const min = 0
    const max = numOfItems

    return Math.ceil(Math.random() * (max - min) + min)
}



module.exports = { convertUsableItems, decrementItemQuantity, applyItem, randomItem }

// console.log(applyItem(
//     {
//         "id": 2,
//         "item_name": "super potion",
//         "effect": 'heal',
//         "hp_restored": 50,
//         "pp_restored": null,
//         "item_desc": "Restores 50 hp"
//     }, 
//     {
//         "id": 6,
//         "name": "Bulbasaur",
//         "hp": 45,
//         "remaining_hp": 45,
//         "atk": 49,
//         "def": 49,
//         "special_atk": 65,
//         "special_def": 65,
//         "speed": 45,
//         "type1": "grass",
//         "type2": "poison",
//         "move1": "Tackle",
//         "move2": "Vine Whip",
//         "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
//         "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
//         "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//         "pokemon_id": 1,
//         "exp": 10,
//         "lvl": 1
//     }
// ))



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
