import { parseLinesSync, range } from "../commons/utils";

function resolve1(filename: string) {
  const lines = parseLinesSync(filename, __dirname);
  const { seeds, allMappings } = parseSeedsAndMaps(lines);

  return Math.min(
    ...seeds.map(seed => allMappings.reduce((seed, maps) => computeMappingOutput(seed, maps), seed))
  );
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

  console.log(allMappings);
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


function computeMappingOutput(value: number, maps: Array<number[]>) {
  let res = value;

  maps.forEach(([destination, source, length]) => {
    if (value < source) { return; }
    if (value > source + length) { return; }
    res = value - source + destination;
  });

  return res;
}




function resolve2(filename: string) {
  const lines = parseLinesSync(filename, __dirname);
  const { seeds: seedsSettings, allMappings } = parseSeedsAndMaps(lines);

  for (let i = 0; i < seedsSettings.length; i += 2) {
    console.log(
      Math.min(
        ...range(seedsSettings[i+1], seedsSettings[i]).map(seed => allMappings.reduce((seed, maps) => computeMappingOutput(seed, maps), seed))
      )
    );
  }

  // return Math.min(
  //   ...seeds.map(seed => allMappings.reduce((seed, maps) => computeMappingOutput(seed, maps), seed))
  // );
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