function getNewLvlFromExp(currentExp) {
  let level = 1;
  let expRequired = Math.floor(Math.pow(level + 1, 3) / 5);

  while (currentExp >= expRequired) {
    level++;
    expRequired = Math.floor(Math.pow(level + 1, 3) / 5);
  }

  return level - 1;
};



export { getNewLvlFromExp };