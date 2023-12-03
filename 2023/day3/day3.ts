import { parseLines } from "../commons/utils";

const DIGITS = "01234565789";

export async function resolveFirstDemo() {
  return resolvePart1("day3.input.demo.txt");
}

export async function resolvePart1(filename: string) {
  const lines = await parseLines(filename, __dirname);
  
  const partNumbers: Array<number> = [];
  let currentNumberString = "";
  let isPartNumber = false;
  
  for (const rowIndex in lines) {
    const line = lines[rowIndex];
    
    for (const columnIndex in [...line]) {
      const element = line[columnIndex];

      if (isDigit(element)) {
        currentNumberString += element;
        if (!isPartNumber && isPartDigit()) {
          isPartNumber = true;
        }
      } else {
        if (isPartNumber) {
          partNumbers.push(parseInt(currentNumberString));
          isPartNumber = false;
        }
        currentNumberString = "";
      }

      function isPartDigit() {
        const previousLine = lines[parseInt(rowIndex) - 1];
        const currentLine = line;
        const nextLine = lines[parseInt(rowIndex) + 1];

        if (isSymbol(previousLine?.[parseInt(columnIndex) - 1]))  { return true; }
        if (isSymbol(previousLine?.[parseInt(columnIndex) + 0]))  { return true; }
        if (isSymbol(previousLine?.[parseInt(columnIndex) + 1]))  { return true; }

        if (isSymbol(currentLine[parseInt(columnIndex) - 1]))  { return true; }
        if (isSymbol(currentLine[parseInt(columnIndex) + 0]))  { return true; }
        if (isSymbol(currentLine[parseInt(columnIndex) + 1]))  { return true; }

        if (isSymbol(nextLine?.[parseInt(columnIndex) - 1]))  { return true; }
        if (isSymbol(nextLine?.[parseInt(columnIndex) + 0]))  { return true; }
        if (isSymbol(nextLine?.[parseInt(columnIndex) + 1]))  { return true; }
        return false;
      }
    }
  }

  return partNumbers.reduce((sum, nb) => sum + nb);
}


function isDigit(element: string) {
  return DIGITS.includes(element);
}

function isSymbol(element?: string) {
  if (!element) { return false; }

  return !DIGITS.includes(element) && element !== ".";
}


export async function resolvePart2(filename: string) {
  const lines = await parseLines(filename, __dirname);
  
  let currentNumberString = "";
  let currentStarIndex = null;

  const gearMap: Record<string, number[]> = {}; // { X42Y67: [gearNumber, gearNumber] }}
  
  for (const rowIndex in lines) {
    const line = lines[rowIndex];
    
    for (const columnIndex in [...line]) {
      const element = line[columnIndex];

      if (isDigit(element)) {
        currentNumberString += element;
        
        if (!currentStarIndex) {
          currentStarIndex = getNearbyStarIndex();
        }

      } else { // We've finished parsing the whole number
        if (currentStarIndex) {
          if (! gearMap[currentStarIndex]) { gearMap[currentStarIndex] = []; }

          gearMap[currentStarIndex].push(parseInt(currentNumberString));
        }
        currentNumberString = ""; // Then reset the currentNumberString
        currentStarIndex = null;
      }

      function getNearbyStarIndex() {
        const _rowIndex = parseInt(rowIndex);
        const _columnIndex = parseInt(columnIndex);
        const previousLine = lines[_rowIndex - 1];
        const currentLine = line;
        const nextLine = lines[_rowIndex + 1];

        if (isStar(previousLine?.[_columnIndex - 1]))  {return `X${_rowIndex-1}Y${_columnIndex-1}`; }
        if (isStar(previousLine?.[_columnIndex + 0]))  {return `X${_rowIndex-1}Y${_columnIndex+0}`; }
        if (isStar(previousLine?.[_columnIndex + 1]))  {return `X${_rowIndex-1}Y${_columnIndex+1}`; }

        if (isStar(currentLine[_columnIndex - 1]))  {return `X${_rowIndex-0}Y${_columnIndex-1}`; }
        if (isStar(currentLine[_columnIndex + 0]))  {return `X${_rowIndex-0}Y${_columnIndex+0}`; }
        if (isStar(currentLine[_columnIndex + 1]))  {return `X${_rowIndex-0}Y${_columnIndex+1}`; }

        if (isStar(nextLine?.[_columnIndex - 1]))  {return `X${_rowIndex+1}Y${_columnIndex-1}`; }
        if (isStar(nextLine?.[_columnIndex + 0]))  {return `X${_rowIndex+1}Y${_columnIndex+0}`; }
        if (isStar(nextLine?.[_columnIndex + 1]))  {return `X${_rowIndex+1}Y${_columnIndex+1}`; }
        
        return null;

        function isStar(s: string) {
          return s === "*";
        }
      }
    }
  }

  return Object
    .values(gearMap)
    .filter(gearNumbers => gearNumbers.length === 2)
    .map(gearNumbers => gearNumbers[0] * gearNumbers[1])
    .flat()
    .reduce((sum, val) => sum + val);
}
