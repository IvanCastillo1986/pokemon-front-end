function getNewLvlFromExp(currentExp) {
  let level = 1;
  let expRequired = Math.floor(Math.pow(level + 1, 3) / 5);

  while (currentExp >= expRequired) {
    level++;
    expRequired = Math.floor(Math.pow(level + 1, 3) / 5);
  }

  return level - 1;
}

const currentExperience = 1165;
const pokemonLevel = getNewLvlFromExp(currentExperience);
console.log(`The Pokemon is at level ${pokemonLevel} with ${currentExperience} experience.`);


/* 
Decide how much each stat will increase (some stats might not even increase. Research this)
    
*/



module.exports = { getNewLvlFromExp };