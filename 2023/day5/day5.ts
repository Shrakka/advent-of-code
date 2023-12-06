import { parseLinesSync, range, sum } from "../commons/utils";

function resolve1(filename: string) {
  const [seedsText, ...mapsText] = parseLinesSync(filename, __dirname);

  const seeds = seedsText.split(": ")[1].split(" ").map(Number.parseFloat);
  // seeds = [ 79, 14, 55, 13 ]
  
  
  const allMappings = mapsText
    .map(text => text + "\n")
    .map(text => text.includes("map:\n") ? `|${text}`: text)
    .join("")
    .split("|")
    .slice(1)
    .map(mapText => mapText.split(" map:\n")[1].split("\n").slice(0, -1))
    .map(mapText => mapText.map(text => text.split(" ").map(Number.parseFloat)))
  ;

  console.log(allMappings);


  
  // allMappings.reduce((acc, maps) => )
  /* maps = [
    [ [ 50, 98, 2 ], [ 52, 50, 48 ] ],            // seed-to-soil 
    [ [ 0, 15, 37 ], [ 37, 52, 2 ], [ 39, 0, 15 ] ], // soil-to-fertilizer
    ...
  ]
  */
  console.log("hi");
  
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

// console.log(map(79, [ [ 50, 98, 2 ], [ 52, 50, 48 ] ]));
// console.log(map(14, [ [ 50, 98, 2 ], [ 52, 50, 48 ] ]));
// console.log(map(55, [ [ 50, 98, 2 ], [ 52, 50, 48 ] ]));
// console.log(map(13, [ [ 50, 98, 2 ], [ 52, 50, 48 ] ]));






function resolve2(filename: string) {

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