import { log } from "node:console";
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

  console.log({ seedsSettings });
  
  console.log(
    range(seedsSettings.length / 2).map(i => ({ min: seedsSettings[i * 2], max: seedsSettings[i * 2] + seedsSettings[i * 2 + 1]}))
  )

  console.log("\n");
  

  log(

    allMappings.map(mappings => mappings.map(([destination, source, length]) => ({
      minFrom: source,
      maxFrom: source + length - 1,
      minTo: destination,
      maxTo: destination+ length
    })).sort((m1, m2) => m1.minFrom - m2.minFrom))
  );

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