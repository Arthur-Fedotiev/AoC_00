import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");

const upperCharMap: Record<string, number> = {
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

const lowerCharMap: Record<string, number> = Object.keys(upperCharMap).reduce(
  (alphabet, curr) => ({
    ...alphabet,
    [curr.toLowerCase()]: upperCharMap[curr] - 26,
  }),
  {}
);

const getRuckSaks = (input: string) => input.split(/\r?\n/g);
const getElvesGroups = (rucksacks: string[], groupSize = 3) => {
  const groups: string[][] = [];

  for (let i = 0; i < rucksacks.length; i += groupSize) {
    const group = rucksacks.slice(i, i + groupSize);

    groups.push(group);
  }

  return groups;
};

const findCommonItem = ([ruck1, ruck2, ruck3]: string[]): string =>
  ruck1.split("").find((item) => ruck2.includes(item) && ruck3.includes(item))!;

const calcScoreOutOfItemsItems = (duplicatedItems: string[]) =>
  duplicatedItems.reduce(
    (total, item) => (upperCharMap[item] ?? lowerCharMap[item]) + total,
    0
  );

const result = calcScoreOutOfItemsItems(
  getElvesGroups(getRuckSaks(input)).map(findCommonItem)
);

console.log("result", result);
