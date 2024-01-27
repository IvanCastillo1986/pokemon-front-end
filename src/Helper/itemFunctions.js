// This file contains all the functions to be performed on user items from back-end



// This function takes an array of items, and decides where it belongs via convertedItems
// It then mutates the convertedItems array and adds quantity and bagIds to each item
// Also removes bag id (we don't need this, since used items will be deleted)
const convertUsableItems = (itemsArr) => {
    const itemsAlreadyAddedToOutput = new Set();

    // Will eventually output items like this:
    // {item_id: 1, bagIdArr: [], name: "potion", hp_restored: 20, item_desc: "Restores 20 hp", quantity: 0},
    const convertedItems = [
        {}, // potion
        {}, // super potion
        {}, // lemonade
        {}, // ether
    ];
    
    for (let i = 0; i < itemsArr.length; i++) {
        const item = itemsArr[i];
        const { item_id } = item;

        if (itemsAlreadyAddedToOutput.has(item_id)) {
            // grabs item already in output array, increment quantity and add id to bagIdArr
            const convertedItem = convertedItems[item_id - 1];

            convertedItem.quantity++;
            convertedItem.bagIdArr.push(item.id);
        } else {
            // add new properties, remove id property
            item.quantity = 1;
            item.bagIdArr = [item.id];
            delete item.id;
            
            convertedItems[item_id - 1] = item;
            itemsAlreadyAddedToOutput.add(item_id);
        }
        
    }

    // if item in output array is empty, remove from array
    for (let i = 0; i < convertedItems.length; i++) {
        const item = convertedItems[i];
        if (!Object.keys(item).length) {
            convertedItems.splice(i, 1);
            i--;
        }
    }

    return convertedItems;
};


// This function decrements item onClick, and it also removes item if quantity reaches 0
const decrementItemQuantity = (itemsArr, itemName) => {
    const decrementedArr = [...itemsArr];

    for (let i = 0; i < decrementedArr.length; i++) {
        const item = decrementedArr[i];
        if (item.item_name === itemName) {
            item.quantity--;
            item.bagIdArr.shift();
        }
        if (item.quantity < 1) {
            decrementedArr.splice(i, 1);
            i--;
        }
    }

    return decrementedArr;
};


const applyItem = (item, pokemon) => {
    const effect = item.effect;

    if (effect === 'heal') {
        // for restoring hp, doesn't go over max hp
        pokemon.remaining_hp += item.hp_restored;
        if (pokemon.hp < pokemon.remaining_hp) pokemon.remaining_hp = pokemon.hp;

        return pokemon;
    } else if (effect === 'restore') {
        // for restoring pp
        // pokemon.pp += item.pp_restored
        return pokemon;
    } else if (effect === 'status') {
        // for restoring status
    }
};

const itemLegend = {
    1: 'potion',
    2: 'super potion',
    3: 'lemonade',
    4: 'ether'
};
// Returns a number from 1 to numOfItems
const randomItemNameAndId = (numOfItems) => {
    const min = 0;
    const max = numOfItems;
    const id = Math.ceil(Math.random() * (max - min) + min);

    const wonItemName = itemLegend[id];

    return { wonItemName, wonItemId: id};
};

function createBagIdsFromGame(currentItems) {
    const bagIdsFromGame = [];
    currentItems.forEach(item => {
        item.bagIdArr.forEach(id => bagIdsFromGame.push(id));
    });
    return bagIdsFromGame;
};



export { convertUsableItems, decrementItemQuantity, applyItem, randomItemNameAndId, createBagIdsFromGame };

