import { parseLines, sum } from "../commons/utils";

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const LIMITS = {
  red: 12,
  green: 13,
  blue: 14
};

function parseLine(line: string) {
  const [, game] = line.split(": "); // game = "2 green, 6 blue, 7 red; 12 green, 6 blue, 3 red; 5 red, 18 green, 4 blue"
  const sets = game.split("; "); // set = "2 green, 6 blue, 7 red"
  return sets.map(parseSet);
}

function parseSet(set: string) { // set = "2 green, 6 blue, 7 red"
  const draws = set.split(", "); // draw = "2 green";
  return Object.fromEntries(draws.map(draw => [draw.split(" ")[1], parseInt(draw.split(" ")[0])]));
}

async function resolve(filename: string) {
  const lines = await parseLines(filename, __dirname);
  const games = lines.map(parseLine);
  const indexesOfPossibleGames = games
    .map(isGamePossible)
    .map((isPossible, index) => isPossible ? index + 1 : 0);  // [ 1, 2, 0, 0, 5 ]

  return sum(indexesOfPossibleGames);
}

function isGamePossible(sets: Array<Record<string, number>>) {
  return ! sets.some(set => set.blue > LIMITS.blue || set.red > LIMITS.red || set.green > LIMITS.green);
}

export async function resolveDemo1() {
  return resolve("day2.input.demo.txt");
}

export async function resolvePart1() {
  return resolve("day2.input.txt");
}
