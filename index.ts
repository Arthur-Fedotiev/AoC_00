import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");

const EnemyWinShapesMap = {
  A: "Z",
  B: "X",
  C: "Y",
};

const MyWinShapesMap = {
  A: "Y",
  B: "Z",
  C: "X",
};

const DrawShapesMap = {
  A: "X",
  B: "Y",
  C: "Z",
};

const MyShapesScore = {
  X: 1,
  Y: 2,
  Z: 3,
};

type EnemyShapeKeys = "A" | "B" | "C";
type MyShapeKeys = "X" | "Y" | "Z";

const getShapeScoreToLoose = (enemyShape: EnemyShapeKeys) => {
  const shape = EnemyWinShapesMap[enemyShape] as keyof typeof MyShapesScore;

  return MyShapesScore[shape];
};

const getShapeScoreToDraw = (enemyShape: EnemyShapeKeys) => {
  const shape = DrawShapesMap[enemyShape] as keyof typeof MyShapesScore;

  return MyShapesScore[shape];
};

const getShapeScoreToWin = (enemyShape: EnemyShapeKeys) => {
  const shape = MyWinShapesMap[enemyShape] as keyof typeof MyShapesScore;

  return MyShapesScore[shape];
};

const calcScoreForRound = (
  enemyShape: EnemyShapeKeys,
  myShape: MyShapeKeys
) => {
  const roundHandlersMap = {
    X: [0, getShapeScoreToLoose],
    Y: [3, getShapeScoreToDraw],
    Z: [6, getShapeScoreToWin],
  } as const;

  const roundScore = roundHandlersMap[myShape][0];
  const myShapeScore = roundHandlersMap[myShape][1](enemyShape);

  return myShapeScore + roundScore;
};

const calcScore = (input: string) => {
  const rounds = input
    .split(/\r?\n/)
    .map((line) => line.split(" ")) as unknown as [
    EnemyShapeKeys,
    MyShapeKeys
  ][];

  const totalScore = rounds.reduce((acc, [enemyShape, myShape]) => {
    return acc + calcScoreForRound(enemyShape, myShape);
  }, 0);

  return totalScore;
};

console.log(calcScore(input));
