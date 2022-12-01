import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");

const mostCaloriesCarriedByTopThreeElves = (input: string) => {
  const elves = input.split(/\r?\n\r?\n/).map((elfStash) => {
    return elfStash.split(/\r?\n/).map((item) => parseInt(item));
  });

  const mostCaloriesCarriedByTopThreeElves = elves.reduce((acc, curr) => {
    const currCaloriesTotal = curr.reduce((acc, curr) => acc + curr, 0);

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

  console.log(
    "mostCalories",
    mostCaloriesCarriedByTopThreeElves.reduce((acc, curr) => acc + curr, 0)
  );
};

mostCaloriesCarriedByTopThreeElves(input);
