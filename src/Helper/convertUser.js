// this file imports the Helper functions to update user/items when changes are made
// import { convertUsableItems } from "./itemFunctions"
const { convertUsableItems } = require("./itemFunctions")
const { assignDVs, calculateRaisedStats, raisePokemonStats } = require("./statsFunctions")

{/* FROM API: res.data = {user, userPokemon, userItems}
    const user = { 
        currentUser: res.data.user, 
        currentPokemon: res.data.userPokemon,
        currentItems: res.data.userItems
    }
*/}
// this function takes in the API call user, and returns the new user with conversions applied
const convertUser = (user) => {
    console.log('user in convertUser:', user)
    
    const newUser = {
        currentUser: {...user.user},
        currentPokemon: [...user.userPokemon],
        currentItems: [...user.userItems]
    }

    // apply all changes to user properties here
    newUser.currentItems = convertUsableItems(newUser.currentItems)

    // create new array with DVs object (with deckId) for each Pokemon. Also assign hpDV.
    // const pokemonDVs = newUser.currentPokemon.map(pokemon => assignDVs(pokemon))
    
    // use pokemonDVs and lvl to calculate each Pokemon's current stats with raisePokemonStats([...userPokemon])
    // newUser.currentPokemon.forEach((pokemon) => {
    //     const matchingDvObj = pokemonDVs.find(dvObj => dvObj.deckId === pokemon.id)
    //     calculateRaisedStats(pokemon, matchingDvObj)
    // })

    raisePokemonStats(newUser.currentPokemon)

    return newUser
}



// it should be imported in files such as Login.js on signin, Play.js on refresh, and Table.js after user wins
module.exports = { convertUser }


// console.log(convertUser({
//     "user": {
//         "id": 1,
//         "email": "icastillo@live.com",
//         "uuid": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//         "has_chosen_starter": true,
//         "wins": 2,
//         "losses": 0
//     },
//     "userPokemon": [
//         {
//             "id": 6,
//             "name": "Bulbasaur",
//             "hp": 45,
//             "atk": 49,
//             "def": 49,
//             "special_atk": 65,
//             "special_def": 65,
//             "speed": 45,
//             "type1": "grass",
//             "type2": "poison",
//             "move1": "Tackle",
//             "move2": "Vine Whip",
//             "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
//             "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/1.png",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "pokemon_id": 1,
//             "exp": 10,
//             "lvl": 1
//         },
//         {
//             "id": 5,
//             "name": "Spearow",
//             "hp": 40,
//             "atk": 60,
//             "def": 30,
//             "special_atk": 31,
//             "special_def": 31,
//             "speed": 70,
//             "type1": "normal",
//             "type2": null,
//             "move1": "wing-attack",
//             "move2": "fury-attack",
//             "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/21.png",
//             "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/21.png",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "pokemon_id": 21,
//             "exp": 0,
//             "lvl": 1
//         },
//         {
//             "id": 1,
//             "name": "Clefairy",
//             "hp": 70,
//             "atk": 45,
//             "def": 48,
//             "special_atk": 60,
//             "special_def": 65,
//             "speed": 35,
//             "type1": "fairy",
//             "type2": null,
//             "move1": "double-slap",
//             "move2": "sing",
//             "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/35.png",
//             "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/35.png",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "pokemon_id": 35,
//             "exp": 152,
//             "lvl": 3
//         },
//         {
//             "id": 2,
//             "name": "Paras",
//             "hp": 35,
//             "atk": 70,
//             "def": 55,
//             "special_atk": 45,
//             "special_def": 55,
//             "speed": 25,
//             "type1": "bug",
//             "type2": null,
//             "move1": "absorb",
//             "move2": "growth",
//             "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/46.png",
//             "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/46.png",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "pokemon_id": 46,
//             "exp": 0,
//             "lvl": 1
//         },
//         {
//             "id": 3,
//             "name": "Voltorb",
//             "hp": 40,
//             "atk": 30,
//             "def": 50,
//             "special_atk": 55,
//             "special_def": 55,
//             "speed": 110,
//             "type1": "electric",
//             "type2": null,
//             "move1": "sonic-boom",
//             "move2": "thunder-shock",
//             "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/100.png",
//             "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/100.png",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "pokemon_id": 100,
//             "exp": 110,
//             "lvl": 1
//         },
//         {
//             "id": 4,
//             "name": "Rhyhorn",
//             "hp": 80,
//             "atk": 85,
//             "def": 95,
//             "special_atk": 30,
//             "special_def": 30,
//             "speed": 25,
//             "type1": "ground",
//             "type2": null,
//             "move1": "stomp",
//             "move2": "fury-attack",
//             "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/111.png",
//             "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/111.png",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "pokemon_id": 111,
//             "exp": 0,
//             "lvl": 1
//         }
//     ],
//     "userItems": [
//         {
//             "id": 5,
//             "item_name": "potion",
//             "effect": "heal",
//             "hp_restored": 20,
//             "pp_restored": null,
//             "item_desc": "Restores 20 hp",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "item_id": 1
//         },
//         {
//             "id": 2,
//             "item_name": "potion",
//             "effect": "heal",
//             "hp_restored": 20,
//             "pp_restored": null,
//             "item_desc": "Restores 20 hp",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "item_id": 1
//         },
//         {
//             "id": 1,
//             "item_name": "potion",
//             "effect": "heal",
//             "hp_restored": 20,
//             "pp_restored": null,
//             "item_desc": "Restores 20 hp",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "item_id": 1
//         },
//         {
//             "id": 4,
//             "item_name": "super potion",
//             "effect": "heal",
//             "hp_restored": 50,
//             "pp_restored": null,
//             "item_desc": "Restores 50 hp",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "item_id": 2
//         },
//         {
//             "id": 3,
//             "item_name": "ether",
//             "effect": "restore",
//             "hp_restored": null,
//             "pp_restored": 10,
//             "item_desc": "Restores 10 pp",
//             "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
//             "item_id": 4
//         }
//     ]
// }))