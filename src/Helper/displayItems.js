// this function takes an array of items, finds duplicates, and 
// returns an object with  {name, id, quantity} 

const legend = {
    1: {id: 1, itemName: "potion", quantity: null},
    2: {id: 2, itemName: "super potion ", quantity: null},
    3: {id: 3, itemName: "lemonade", quantity: null},
    4: {id: 4, itemName: "ether", quantity: null},
}

const displayItems = (itemsArr) => {
    const counter = {}

    for (const item of itemsArr) {
        const id = item.item_id

        if (id in counter) {
            counter[id]++
        } else {
            counter[id] = 1
        }
    }

    const duplicateItemsArr = []

    for (const id in counter) {
        const item = legend[id]
        item.quantity = counter[id]
        duplicateItemsArr.push(item)
    }

    return duplicateItemsArr
}

module.exports = { displayItems }








// TEST FUNCTION
// console.log(displayItems([
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
//       "id": 2,
//       "item_name": "super potion",
//       "effect": null,
//       "hp_restored": null,
//       "pp_restored": 10,
//       "item_desc": "Restores 10 pp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 2
//     },
//     {
//       "id": 2,
//       "item_name": "super potion",
//       "effect": null,
//       "hp_restored": null,
//       "pp_restored": 10,
//       "item_desc": "Restores 10 pp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 2
//     },
//     {
//       "id": 2,
//       "item_name": "super potion",
//       "effect": null,
//       "hp_restored": null,
//       "pp_restored": 10,
//       "item_desc": "Restores 10 pp",
//       "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//       "item_id": 2
//     }
// ]))
