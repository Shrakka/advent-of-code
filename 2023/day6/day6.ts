import { parseLinesSync, zip } from "../commons/utils";

function resolve1(filename: string) {
  const [timeString, distanceString] = parseLinesSync(filename, __dirname);

  const [, timesString] = timeString.split("Time:");
  const times = timesString.trim().split(/\s+/).map(parseFloat); // [7, 15, 30]
  
  const [, distancesString] = distanceString.split("Distance:");
  const distances = distancesString.trim().split(/\s+/).map(parseFloat); //
  
  //                                        [ time, distance ]
  const inputs = zip(times, distances); //  [ 7, 9 ], [ 15, 40 ], [ 30, 200 ] ]
  
  return inputs.map(solveQuadraticInequality).reduce((acc, val) => val * acc);
}

function resolve2(filename: string) {
  const [timeString, distanceString] = parseLinesSync(filename, __dirname);

  const [, timesString] = timeString.split("Time:");
  const time = parseFloat(timesString.trim().replaceAll(/\s+/g, ""));
  
  const [, distancesString] = distanceString.split("Distance:");
  const distance = parseFloat(distancesString.trim().replaceAll(/\s+/g, ""));
  
  
  return solveQuadraticInequality([time, distance]);
}

function solveQuadraticInequality([time, distance]: number[]): number {
  // ie, -X^2 + TIME * X - DISTANCE > 0
  // a = -1
  // b = time
  // c = - distance

  const [a, b, c] = [-1, time, -distance];

  // Calculate the discriminant
  const discriminant = b * b - 4 * a * c;

  // Calculate the square root of the discriminant (assuming it's positive)
  const sqrtDiscriminant = Math.sqrt(discriminant);

  // Calculate the two solutions using the quadratic formula
  const solution1 = (-b + sqrtDiscriminant) / 2 * a;
  const solution2 = (-b - sqrtDiscriminant) / 2 * a;


  const smallestSolution = Number.isInteger(solution1) ? solution1 + 1 : Math.ceil(solution1);
  const largestSolution = Number.isInteger(solution2) ? solution2 - 1 : Math.floor(solution2);
  
  return largestSolution - smallestSolution + 1;
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