import { readFileSync } from "fs";
import { ElfAssignment } from "./ElfAssignment";
import { clamp } from "./util";

const input = readFileSync("./input.txt", "utf-8");
const clampZeroOne = (num: number) => clamp(num, 0, 1);

const PAIR_DELIMINATOR = ",";

const toElfAssignments = (pairRange: string): [ElfAssignment, ElfAssignment] =>
  pairRange
    .split(PAIR_DELIMINATOR)
    .map((elfRangeString) => new ElfAssignment(elfRangeString)) as [
    ElfAssignment,
    ElfAssignment
  ];

const getElfAssignments = (input: string): [ElfAssignment, ElfAssignment][] =>
  input.split(/\r?\n/g).filter(Boolean).map(toElfAssignments);

const countContainedByAssignments = (
  elfAssignments: [ElfAssignment, ElfAssignment][]
): number =>
  elfAssignments.reduce(
    (total, [firstElfAssignment, secondElfAssignment]) =>
      total +
      clampZeroOne(
        firstElfAssignment.amIFullyContainedBy(secondElfAssignment) +
          secondElfAssignment.amIFullyContainedBy(firstElfAssignment)
      ),
    0
  );

const countOverlaps = (
  elfAssignments: [ElfAssignment, ElfAssignment][]
): number =>
  elfAssignments.reduce((total, [firstElfAssignment, secondElfAssignment]) => {
    const overlaps = clampZeroOne(
      firstElfAssignment.hasOverlapWith(secondElfAssignment) +
        secondElfAssignment.hasOverlapWith(firstElfAssignment)
    );
    return total + overlaps;
  }, 0);

const elfAssignments = getElfAssignments(input);

const part1Result = countContainedByAssignments(elfAssignments);
const part2Result = countOverlaps(elfAssignments);

console.log(part1Result);
console.log(part2Result);
