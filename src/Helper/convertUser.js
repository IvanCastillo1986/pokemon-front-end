// this file imports the Helper functions to update user/items when changes are made
const { convertUsableItems } = require("./itemFunctions")
const { raisePokemonStats } = require("./statsFunctions")

{/* FROM API: res.data = {user, userPokemon, userItems}
    const user = { 
        currentUser: res.data.user, 
        currentPokemon: res.data.userPokemon,
        currentItems: res.data.userItems
    }
*/}
// this function takes in the API call user, and returns the new user with conversions applied
const convertUser = (user) => {
    
    const newUser = {
        currentUser: {...user.user},
        currentPokemon: [...user.userPokemon],
        currentItems: [...user.userItems]
    }
    
    // apply all changes to user properties here
    newUser.currentItems = convertUsableItems(newUser.currentItems)

    // check so that user Registration doesn't break here
    if (newUser.currentPokemon.length) raisePokemonStats(newUser.currentPokemon)

    return newUser
}



// it should be imported in files such as Login.js on signin, Play.js on refresh, and Table.js after user wins
export { convertUser }

