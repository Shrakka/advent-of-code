import _ from "lodash";
import { log } from "node:console";
import { parseLinesSync, range } from "../commons/utils";

function resolve1(filename: string) {
  const lines = parseLinesSync(filename, __dirname);
  const { seeds, allMappings } = parseSeedsAndMaps(lines);

  return Math.min(
    ...seeds.map(seed => allMappings.reduce((seed, maps) => computeMappingOutput(seed, maps), seed))
  );

  function computeMappingOutput(value: number, maps: Array<number[]>) {
    let res = value;
  
    maps.forEach(([destination, source, length]) => {
      if (value < source) { return; }
      if (value > source + length) { return; }
      res = value - source + destination;
    });
  
    return res;
  }
}

function parseSeedsAndMaps(lines: string[]) {
  const [seedsText, ...mapsText] = lines;

  const seeds = seedsText.split(": ")[1].split(" ").map(Number.parseFloat);
  // seeds = [ 79, 14, 55, 13 ]
  
  const allMappings = mapsText // Parsing immonde, on est bien d'accord, mais qui fait l'affaire !
    .map(text => text + "\n")
    .map(text => text.includes("map:\n") ? `|${text}`: text)
    .join("")
    .split("|")
    .slice(1)
    .map(mapText => mapText.split(" map:\n")[1].split("\n").slice(0, -1))
    .map(mapText => mapText.map(text => text.split(" ").map(Number.parseFloat)))
  ;

  /* allMappings = [
    [ [ 50, 98, 2 ], [ 52, 50, 48 ] ],            // seed-to-soil 
    [ [ 0, 15, 37 ], [ 37, 52, 2 ], [ 39, 0, 15 ] ], // soil-to-fertilizer
    [ [ 49, 53, 8 ], [ 0, 11, 42 ], [ 42, 0, 7 ], [ 57, 7, 4 ] ],
    [ [ 88, 18, 7 ], [ 18, 25, 70 ] ],
    [ [ 45, 77, 23 ], [ 81, 45, 19 ], [ 68, 64, 13 ] ]
    ...
  ] */

  return { seeds, allMappings };
}

function resolve2(filename: string) {
  const lines = parseLinesSync(filename, __dirname);
  const { seeds: seedsSettings, allMappings } = parseSeedsAndMaps(lines);
  
  const seedsRanges = range(seedsSettings.length / 2) 
    .map(i => ({
      min: seedsSettings[i * 2],
      max: seedsSettings[i * 2] + seedsSettings[i * 2 + 1]}
    ));
  // seedsRanges = [ { min: 79, max: 93 }, { min: 55, max: 68 } ]

  const allRanges = allMappings.map(mappings => mappings.map(([destination, source, length]) => ({
    minFrom: source,
    maxFrom: source + length - 1,
    minTo: destination,
    maxTo: destination + length - 1
  }))
    .sort((m1, m2) => m1.minFrom - m2.minFrom));

  console.log(allRanges);

  /* allRanges = [
  [
    { minFrom: 50, maxFrom: 97, minTo: 52, maxTo: 100 },
    { minFrom: 98, maxFrom: 99, minTo: 50, maxTo: 52 }
  ],
  [
    { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 54 },
    { minFrom: 15, maxFrom: 51, minTo: 0, maxTo: 37 },
    { minFrom: 52, maxFrom: 53, minTo: 37, maxTo: 39 }
  ],
  [
    { minFrom: 0, maxFrom: 6, minTo: 42, maxTo: 49 },
    { minFrom: 7, maxFrom: 10, minTo: 57, maxTo: 61 },
    { minFrom: 11, maxFrom: 52, minTo: 0, maxTo: 42 },
    { minFrom: 53, maxFrom: 60, minTo: 49, maxTo: 57 }
  ]
  */

  // log(mergeRanges(allRanges[0], allRanges[1]))

  const mergedRanges = allRanges.reduce((mergedRanges, currentRange) => mergeRanges(mergedRanges, currentRange));
  console.log(mergedRanges);
}

export function mergeRanges(ranges1: Range[], ranges2: Range[]) {
  /**
  ranges1 = [
    { minFrom: 50, maxFrom: 97, minTo: 52, maxTo: 100 },
    { minFrom: 98, maxFrom: 99, minTo: 50, maxTo: 52 }
  ]
  ranges2 = [
    { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 54 },
    { minFrom: 15, maxFrom: 51, minTo: 0, maxTo: 37 },
    { minFrom: 52, maxFrom: 53, minTo: 37, maxTo: 39 }
  ],
  */

  // log({ ranges1, ranges2 });

  const mergedRanges = _.unionBy([...ranges1, ...ranges2]
    .sort((r1, r2) => {
      if (r1.minFrom < r2.minFrom) { return -1; }
      if (r1.minFrom > r2.minFrom) { return 1; }
      return r1.maxFrom - r2.maxFrom;
    }), r => r.minFrom);
  
  /*
  mergedRanges = 
    [
      { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 54 },
      { minFrom: 15, maxFrom: 51, minTo: 0, maxTo: 37 },
      { minFrom: 50, maxFrom: 97, minTo: 52, maxTo: 100 },
      { minFrom: 52, maxFrom: 53, minTo: 37, maxTo: 39 },
      { minFrom: 98, maxFrom: 99, minTo: 50, maxTo: 52 }
    ]
  */

  const resultRanges: Range[] = [];

  for (let i = 0; i < mergedRanges.length; i++) {
    const currentRange = mergedRanges[i];
    const nextRange = mergedRanges[i + 1];

    if (!nextRange) {
      resultRanges.push({
        minFrom: currentRange.minFrom,
        maxFrom: currentRange.maxFrom,
        minTo: -1,
        maxTo: -1
      });
      continue;
    }

    if (currentRange.minFrom === nextRange.maxFrom) { continue; } // On prend le plus restreint

    resultRanges.push({
      minFrom: currentRange.minFrom,
      maxFrom: nextRange.minFrom - 1,
      minTo: -1,
      maxTo: -1
    });
  }

  resultRanges.forEach(ranges => {
    ranges.minTo = traverseBothRanges(ranges.minFrom);
    ranges.maxTo = traverseBothRanges(ranges.maxFrom);
  });
  /*
   resultRanges = [
    { minFrom: 0, maxFrom: 14, minTo: 39, maxTo: 53 },
    { minFrom: 15, maxFrom: 49, minTo: 0, maxTo: 34 },
    { minFrom: 50, maxFrom: 51, minTo: 37, maxTo: 38 },
    { minFrom: 52, maxFrom: 97, minTo: 54, maxTo: 99 },
    { minFrom: 98, maxFrom: 99, minTo: 35, maxTo: 36 }
  ]
  */
  return resultRanges;
  

  function traverseBothRanges(value: number) { // value = 0
    let firstRangeResult = value;

    for (const range of ranges1) {
      if (firstRangeResult < range.minFrom) { continue; }
      if (firstRangeResult > range.maxFrom) { continue; }
      firstRangeResult = firstRangeResult - range.minFrom + range.minTo; break;
    }

    let secondRangeResult = firstRangeResult;

    for (const range of ranges2) {
      if (secondRangeResult < range.minFrom) { continue; }
      if (secondRangeResult > range.maxFrom) { continue; }
      secondRangeResult = secondRangeResult - range.minFrom + range.minTo; break;
    }

    // console.log({ firstRangeResult, secondRangeResult });

    return secondRangeResult;
  }
}

interface Range {
  minFrom: number;
  maxFrom: number;
  minTo: number;
  maxTo: number;
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