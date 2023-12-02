import { readFile } from "node:fs/promises";
import { join } from "node:path";

export function combineFirstAndLastDigits(line: string) {
  const matches = [...line.matchAll(/[0-9]/g)];
  const firstDigit = matches.at(0)![0];
  const lastDigit = matches.at(-1)![0];
  return parseInt(firstDigit + lastDigit);
}

export async function parseLines(path: string, dirname: string) {
  const absolutePath = join(dirname, path);
  const content = await readFile(absolutePath, { encoding: "utf8" });
  return content.split("\n").filter(line => line.length > 0);
}

export async function resolve(filename: string) {
  const lines = await parseLines(filename, __dirname);
  return lines
    .map(combineFirstAndLastDigits)
    .reduce((sum, nb) => sum + nb);
}

export async function resolveDemo() {
  return resolve("day1.input.demo.txt");
}

export async function resolveFirst() {
  return resolve("day1.input.first.txt");
}

