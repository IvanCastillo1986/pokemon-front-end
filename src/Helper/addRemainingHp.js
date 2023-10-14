// This adds the remaining_hp property to every pokemon in an array
const addRemainingHp = (pokemonArr) => {
    return pokemonArr.map(pokemon => {
        pokemon.remaining_hp = pokemon.hp
        return pokemon
    })
}



const testArr = [
    {
      "id": 8,
      "name": "Charmander",
      "hp": 39,
      "atk": 52,
      "def": 43,
      "special_atk": 60,
      "special_def": 50,
      "speed": 65,
      "type1": "fire",
      "type2": null,
      "move1": "Scratch",
      "move2": "Ember",
      "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
      "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
      "pokemon_id": 4,
      "exp": 0,
      "lvl": 1
    },
    {
      "id": 3,
      "name": "Caterpie",
      "hp": 45,
      "atk": 30,
      "def": 35,
      "special_atk": 20,
      "special_def": 20,
      "speed": 45,
      "type1": "bug",
      "type2": null,
      "move1": "bug-bite",
      "move2": "tackle",
      "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
      "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10.png",
      "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
      "pokemon_id": 10,
      "exp": 0,
      "lvl": 1
    },
    {
      "id": 5,
      "name": "Spearow",
      "hp": 40,
      "atk": 60,
      "def": 30,
      "special_atk": 31,
      "special_def": 31,
      "speed": 70,
      "type1": "normal",
      "type2": null,
      "move1": "wing-attack",
      "move2": "fury-attack",
      "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
      "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/21.png",
      "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
      "pokemon_id": 21,
      "exp": 0,
      "lvl": 1
    },
    {
      "id": 1,
      "name": "Clefairy",
      "hp": 70,
      "atk": 45,
      "def": 48,
      "special_atk": 60,
      "special_def": 65,
      "speed": 35,
      "type1": "fairy",
      "type2": null,
      "move1": "double-slap",
      "move2": "sing",
      "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
      "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png",
      "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
      "pokemon_id": 35,
      "exp": 152,
      "lvl": 3
    },
    {
      "id": 2,
      "name": "Paras",
      "hp": 35,
      "atk": 70,
      "def": 55,
      "special_atk": 45,
      "special_def": 55,
      "speed": 25,
      "type1": "bug",
      "type2": null,
      "move1": "absorb",
      "move2": "growth",
      "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
      "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/46.png",
      "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
      "pokemon_id": 46,
      "exp": 0,
      "lvl": 1
    },
    {
      "id": 4,
      "name": "Rhyhorn",
      "hp": 80,
      "atk": 85,
      "def": 95,
      "special_atk": 30,
      "special_def": 30,
      "speed": 25,
      "type1": "ground",
      "type2": null,
      "move1": "stomp",
      "move2": "fury-attack",
      "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png",
      "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/111.png",
      "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
      "pokemon_id": 111,
      "exp": 0,
      "lvl": 1
    }
]


export { addRemainingHp }