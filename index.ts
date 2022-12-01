import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");

const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

const mostCaloriesCarriedByTopThreeElves = (input: string): number[] => {
  const elves = input.split(/\r?\n\r?\n/).map((elfStash) => {
    return elfStash.split(/\r?\n/).map((item) => parseInt(item));
  });

  const mostCaloriesCarriedByTopThreeElves = elves.reduce((acc, curr) => {
    const currCaloriesTotal = sum(curr);

    if (acc.length < 3) {
      acc.push(currCaloriesTotal);
      return acc;
    }

    const lowestCalories = Math.min(...acc);

    if (currCaloriesTotal > lowestCalories) {
      acc.splice(acc.indexOf(lowestCalories), 1, currCaloriesTotal);
    }

    return acc;
  }, []);

  return mostCaloriesCarriedByTopThreeElves;
};

const result = sum(mostCaloriesCarriedByTopThreeElves(input));

console.log(result);
