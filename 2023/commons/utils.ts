import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function parseLines(path: string, dirname: string) {
  const absolutePath = join(dirname, path);
  const content = await readFile(absolutePath, { encoding: "utf8" });
  return content.split("\n").filter(line => line.length > 0);
}

export function parseLinesSync(path: string, dirname: string) {
  const absolutePath = join(dirname, path);
  const content = readFileSync(absolutePath, { encoding: "utf8" });
  return content.split("\n").filter(line => line.length > 0);
}

export function sum(array: number[]) {
  return array.reduce((acc, val) => acc + val);
}

export function range(n: number, from = 0) {
  return Array.from({ length: n }, (_, i) => i + from);
}

export function zip<T, U>(array1: T[], array2: U[]) {
  return array1.map((element, index) => ([element, array2[index]]));
}
