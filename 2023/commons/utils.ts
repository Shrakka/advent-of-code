import { readFile } from "node:fs/promises";
import { join } from "node:path";


export async function parseLines(path: string, dirname: string) {
  const absolutePath = join(dirname, path);
  const content = await readFile(absolutePath, { encoding: "utf8" });
  return content.split("\n").filter(line => line.length > 0);
}
