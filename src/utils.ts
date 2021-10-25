import { DEFAULT_UNIVERSE_SIZE } from './constants';

export type Universe = (0 | 1)[][];

export const calculateNextGeneration = (universe: Universe): Universe => {
  const updatedUniverse: Universe = [];
  for (let i = 0; i < universe.length; i++) {
    updatedUniverse.push([]);
    for (let j = 0; j < universe.length; j++) {
      const position = j - 1 < 0 ? 0 : j - 1;
      const isCorner = j === 0
      const topSiblings = (universe[i - 1] || []).slice(position, !isCorner ? position + 3 : position + 2);
      const middleSiblings = [universe[i][j - 1] || 0, universe[i][j + 1] || 0];
      const bottomSiblings = (universe[i + 1] || []).slice(position, !isCorner ? position + 3 : position + 2);
      const sum = [...topSiblings, ...middleSiblings, ...bottomSiblings].reduce((a, b) => +a + +b);

      if (universe[i][j]) {
        updatedUniverse[i].push(sum < 2 || sum > 3 ? 0 : 1); 
      } else {
        updatedUniverse[i].push(sum === 3 ? 1 : 0); 
      }
    }
  }
  return updatedUniverse;
}

const getRandom = () => Math.floor(Math.random() * 2) as 0 | 1

export const generateRandomUniverse = (): Universe => {
  const arr: Universe = [];
  for (let i = 0; i < DEFAULT_UNIVERSE_SIZE; i++) {
    arr.push([]);
    for (let j = 0; j < DEFAULT_UNIVERSE_SIZE; j++) {
      arr[i].push(getRandom())
    }
  }
  return arr;
}