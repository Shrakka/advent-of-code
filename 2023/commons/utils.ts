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
