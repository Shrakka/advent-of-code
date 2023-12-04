import { parseLinesSync, sum } from "../commons/utils";

function resolve1(filename: string) {
  const lines = parseLinesSync(filename, __dirname);
  const games = lines.map(parseLine);
  return sum(games.map(computeGameScore));

  function computeGameScore(game: { winningNumbers: number[]; cardNumbers: number[] }) {
    const nbOfMatchingPoints = game.cardNumbers.filter(cardNumber => game.winningNumbers.includes(cardNumber)).length;
    if (nbOfMatchingPoints === 0) { return 0; }
    return Math.pow(2, nbOfMatchingPoints - 1);
  }
}

function resolve2(filename: string) {
  const lines = parseLinesSync(filename, __dirname);
  const games = lines.map(parseLine);
  const gameScoreMap = Object.fromEntries(games.map((game, index) => ([index+1, computeGameScore(game)])));
  // { '1': 4, '2': 2, '3': 2, '4': 1, '5': 0, '6': 0 }  ==> Game 1 worths 4 points // Game 2 worths 2 points

  const nbOfCardsByIndex = Object.fromEntries(Array.from(Array(games.length).keys()).map(i => [i+1, 1]));
  // { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1 } ==> Player has 1 "Game 1" card // Player has 1 "Game 2" card.

  for (const [cardIndex, cardWorth] of Object.entries(gameScoreMap)) {
    Array.from(Array(cardWorth).keys()).forEach(i => {
      const nextCardIndex = parseInt(cardIndex) + 1 + i;
      nbOfCardsByIndex[nextCardIndex] += nbOfCardsByIndex[cardIndex];
    });
  }

  return sum(Object.values(nbOfCardsByIndex));

  function computeGameScore(game: { winningNumbers: number[]; cardNumbers: number[] }) {
    const nbOfMatchingPoints = game.cardNumbers.filter(cardNumber => game.winningNumbers.includes(cardNumber)).length;
    return nbOfMatchingPoints;
  }
}


function parseLine(line: string) {
  const [, cardContent] = line.split(": "); // 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  const [winningNumbersString, cardNumbersString] = cardContent.split(" | "); // winningNumbersString = " 7 48  3 86 17";
  return {
    winningNumbers: arrayify(winningNumbersString),
    cardNumbers: arrayify(cardNumbersString)
  };

  function arrayify(s: string) { // " 7 48  3 86 17" ===> [7, 48, 3, 86, 17]
    return s.trim().replaceAll("  ", " ").split(" ").map(n => parseInt(n));
  }
}

export function resolveDemo1() {
  return resolve1("input.demo.txt");
}

export function resolvePart1() {
  return resolve1("input.txt");
}

export function resolveDemo2() {
  return resolve2("input.demo.txt");
}

export function resolvePart2() {
  return resolve2("input.txt");
}