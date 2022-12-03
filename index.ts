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

// console.log(lowerCharMap);

const getRuckSaks = (input: string) => input.split(/\r?\n/g);
const getCompartments = (rucksacks: string[]) =>
  rucksacks.map((rucksack) => [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ]);

const findDuplicatedItem = (compartment1: string, compartment2: string) =>
  compartment1.split("").find((item1) => compartment2.includes(item1));

const calcScoreOfDuplicatedItems = (duplicatedItems: string[]) =>
  duplicatedItems.reduce(
    (total, item) => (upperCharMap[item] ?? lowerCharMap[item]) + total,
    0
  );

const compartments = getCompartments(getRuckSaks(input));
const duplicatedItems = compartments.map(
  ([comp1, comp2]) => findDuplicatedItem(comp1, comp2) as string
);

const result = calcScoreOfDuplicatedItems(duplicatedItems);

console.log("getRuckSaks(input)", getRuckSaks(input)[1]);

console.log("result", result);
