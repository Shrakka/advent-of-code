import { parseLines } from "../commons/utils";

export function combineFirstAndLastDigits(line: string) {
  const matches = [...line.matchAll(/[0-9]/g)];
  const firstDigit = matches.at(0)![0];
  const lastDigit = matches.at(-1)![0];
  return parseInt(`${firstDigit}${lastDigit}`);
}

export function combineFirstAndLastDigitLetters(line: string) {
  const digitMap: Record<string, string> = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",

    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
  };
  const pattern = Object.keys(digitMap).join("|");
  const lookAheadPattern = `(?=(${pattern}))`; // https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/
  const regex = new RegExp(lookAheadPattern, "g");
  const matches = [...line.matchAll(regex)];
  const firstDigit = digitMap[matches.at(0)![1]];
  const lastDigit = digitMap[matches.at(-1)![1]];
  return parseInt(`${firstDigit}${lastDigit}`);
}


export async function resolve(filename: string, combine: (_: string) => number) {
  const lines = await parseLines(filename, __dirname);
  return lines
    .map(combine)
    .reduce((sum, nb) => sum + nb);
}

export async function resolveFirstDemo() {
  return resolve("day1.input.demo1.txt", combineFirstAndLastDigits);
}

export async function resolveFirst() {
  return resolve("day1.input.txt", combineFirstAndLastDigits);
}

export async function resolveSecondDemo() {
  return resolve("day1.input.demo2.txt", combineFirstAndLastDigitLetters);
}

export async function resolveSecond() {
  return resolve("day1.input.txt", combineFirstAndLastDigitLetters);
}
