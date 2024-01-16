const { typeMultiplier } = require("./typeMultiplier")

function applyEffect(atkType, defType) {
    // check if there is weakness or resistance. Returns .5, 1, 1.5
    const effect = typeMultiplier(atkType, defType)
    return effect
}

function calculateDmg(atkPkm, defPkm) {
    // dmg = ((2 * lvl / 5 + 2) * basePower * atk / def / 50 + 2) * typeModifier
    const dmg = (2 * atkPkm.lvl / 5 + 2) * 25 * atkPkm.atk / defPkm.def / 50 + 2

    return dmg
}

const atkPkm = {
    "id": 2,
    "name": "Paras",
    "hp": 9,
    "atk": 12,
    "def": 10,
    "special_atk": 9,
    "special_def": 10,
    "speed": 8,
    "type1": "bug",
    "type2": null,
    "move1": "absorb",
    "move2": "growth",
    "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/46.png",
    "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/46.png",
    "user_id": "7XzFvOUVS4eQHGI8ClxNbN7qY7b2",
    "pokemon_id": 46,
    "exp": 26,
    "lvl": 4,
    "remaining_hp": 9
}

const defPkm = {
    "id": 2007,
    "name": "Squirtle",
    "hp": 11,
    "atk": 11,
    "def": 12,
    "special_atk": 11,
    "special_def": 12,
    "speed": 10,
    "type1": "water",
    "type2": null,
    "move1": "bite",
    "move2": "water-gun",
    "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/7.png",
    "rear_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/back/6.png",
    "remaining_hp": 11,
    "pokemon_id": 7,
    "lvl": 5
}




module.exports = { calculateDmg, applyEffect }