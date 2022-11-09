// It will output the effectiveness, default is 1
// This function will calculate dmg based on the Pokemon's types
// The moves don't currently have types, so only Pokemon types matter
// If your pokemon is strong vs a certain type, the effectiveness increases
// If the enemy is resistant vs your type, the effectiveness drops
// This runs for each move in movesArr, to accumulate multiplier for both types
// It also runs for each enemyType in enemyTypeArr
// ** For now will only use type 1. Will implement type 2 when types are applied to moves. Then, uncomment lines **
// Test case after implementing Move Types: 
    // args = (Move Type, [Enemy Pokemon types]) : 'grass', ['bug', 'poison']


function typeMultiplier (type, enemyType) {
    // default multiplier
    let effectiveness = 1

    // for each type, check against each enemyType

    if (type === 'grass') {
        // enemyTypeArr.forEach(enemyType => {
            // first check against types that you're strong against
            switch (enemyType) {
                case 'water': case 'ground': case 'rock':
                    effectiveness += .5;
            } 
            // next check against types that you're not effective against
            switch (enemyType) {
                case 'flying': case 'poison': case 'bug': case 'steel': case 'fire': case 'grass':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'poison') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'grass': case 'fairy':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'poison': case 'ground': case 'rock': case 'ghost':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'fire') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'bug': case 'grass': case 'ice': case 'steel':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'rock': case 'fire': case 'water': case 'dragon':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'flying') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'fighting': case 'bug': case 'grass':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'rock': case 'steel': case 'electric':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'water') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'ground': case 'rock': case 'fire': case 'steel':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'water': case 'grass': case 'dragon':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'bug') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'grass': case 'psychic':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'fighting': case 'flying': case 'poison': case 'ghost': case 'steel': case 'fire': case 'fairy':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'normal') {
        // enemyTypeArr.forEach(enemyType => {
            
            // This type is strong against nothing!!

            switch (enemyType) {
                case 'rock': case 'steel': case 'ghost':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'electric') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'flying': case 'water': case 'steel':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'ground': case 'grass': case 'electric': case 'dragon':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'ground') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'poison': case 'rock': case 'fire': case 'electric':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'flying': case 'bug': case 'grass':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'fairy') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'fighting': case 'dragon':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'poison': case 'steel': case 'fire':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'fighting') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'normal': case 'rock': case 'ice':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'flying': case 'poison': case 'bug': case 'psychic': case 'fairy':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'psychic') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'fighting': case 'poison':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'steel': case 'psychic': case 'dark':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'rock') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'flying': case 'bug': case 'fire': case 'ice':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'fighting': case 'ground': case 'steel':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'steel') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'rock': case 'ice': case 'fairy':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'steel': case 'fire': case 'water': case 'electric':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'ice') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'flying': case 'ground': case 'grass': case 'dragon':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'steel': case 'fire': case 'water': case 'ice':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'ghost') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'psychic':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'normal': case 'dark':
                    effectiveness -= .5;
            }
        // })
    } else if (type === 'dragon') {
        // enemyTypeArr.forEach(enemyType => {
            switch (enemyType) {
                case 'fairy':
                    effectiveness += .5;
            }
            switch (enemyType) {
                case 'steel': case 'fairy':
                    effectiveness -= .5;
            }
        // })
    }


    return effectiveness
}

// Some test cases:
// console.log(typeMultiplier('grass', 'water'))
// console.log(typeMultiplier('fire', 'water'))
// console.log(typeMultiplier('water', 'grass'))
// console.log(typeMultiplier('water', 'fire'))
// console.log(typeMultiplier('ghost', 'grass'))
// console.log(typeMultiplier('ghost', 'normal'))
// console.log(typeMultiplier('normal', 'ghost'))

/* [
    "grass" strong against  ground, rock, water  -  weak to  flying, poison, bug, steel, fire, grass
    "poison" strong against  grass, fairy - weak to  poison, ground, rock, ghost
    "fire" strong against  bug, grass, ice, steel - weak to  rock, fire, water, dragon
    "flying" strong against  fighting, bug, grass - weak to  rock, steel, electric
    "water" strong against  ground, rock, fire, steel - weak to  water, grass, dragon
    "bug" strong against  grass, psychic - weak to  fighting, flying, poison, ghost, steel, fire, fairy
    "normal" strong against  ghost - weak to  rock, steel
    "electric" strong against  flying, water, steel - weak to  ground, grass, electric, dragon
    "ground" strong against  poison, rock, fire, electric - weak to  flying, bug, grass
    "fairy" strong against  fighting, dragon - weak to  poinson, steel, fire
    "fighting" strong against  normal, rock, ice - weak to  flying, poison, bug, psychic, fairy
    "psychic" strong against  fighting, poison - weak to  steel, psychic, dark
    "rock" strong against  flying, bug, fire, ice - weak to  fighting, ground, steel
    "steel" strong against  rock, ice, fairy - weak to  steel, fire, water, electric
    "ice" strong against  flying, ground, grass, dragon - weak to  steel, fire, water, ice
    "ghost" strong against  psychic, normal - weak to  normal, dark
    "dragon" strong against  fairy - weak to  steel, fairy
] */

export { typeMultiplier }