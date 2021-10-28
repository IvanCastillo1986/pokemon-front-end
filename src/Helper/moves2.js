const moves2 = {
    "swords-dance": {
        name: "swords-dance",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "cut": {
        name: "cut",
        damage: 8,
        pp: 10,
        remaining_pp: 10,
    },
    "fire-punch": {
        name: "fire-punch",
        damage: 8,
        pp: 10,
        remaining_pp: 10,
    },
    "ice-punch": {
        name: "ice-punch",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "gust": {
        name: "gust",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "string-shot": {
        name: "string-shot",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "harden": {
        name: "harden",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "headbutt": {
        name: "headbutt",
        damage: 8,
        pp: 10,
        remaining_pp: 10,
    },
    "slam": {
        name: "slam",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "pay-day": {
        name: "pay-day",
        damage: 8,
        pp: 10,
        remaining_pp: 10,
    },
    "double-kick": {
        name: "double-kick",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "double-slap": {
        name: "double-slap",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "mega-punch": {
        name: "mega-punch",
        damage: 8,
        pp: 10,
        remaining_pp: 10,
    },
    "body-slam": {
        name: "body-slam",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "wing-attack": {
        name: "wing-attack",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "take-down": {
        name: "take-down",
        damage: 8,
        pp: 10,
        remaining_pp: 10,
    },
    "scratch": {
        name: "scratch",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "stomp": {
        name: "stomp",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "double-edge": {
        name: "double-edge",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "guillotine": {
        name: "guillotine",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "tackle": {
        name: "tackle",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "flamethrower": {
        name: "flamethrower",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "fury-attack": {
        name: "fury-attack",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "splash": {
        name: "splash",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "horn-drill": {
        name: "horn-drill",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "sand-attack": {
        name: "sand-attack",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "whirlwind": {
        name: "whirlwind",
        damage: 15,
        pp: 7,
        remaining_pp: 7,
    },
    "razor-wind": {
        name: "razor-wind",
        damage: 25,
        pp: 3,
        remaining_pp: 3,
    },
    "struggle": {
        name: "struggle",
        damage: 0,
        pp: 99,
        remaining_pp: 99
    }
}
// console.log(moves2["gust"])
// console.log(moves2["whirlwind"])
// console.log(moves2["guillotine"])
// console.log(moves2["slam"])
// console.log(moves2["wing-attack"])

module.exports = { moves2 }

// gust, whirlwind, guillotine, slam, wing-attack come up undefined when calling makeBattlePokemon()