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
  
  const partNumbers: Array<number> = [];
  let currentNumberString = "";
  let currentNumberIsGear = false;
  
  for (const rowIndex in lines) {
    const line = lines[rowIndex];
    
    for (const columnIndex in [...line]) {
      const element = line[columnIndex];

      if (isDigit(element)) {
        currentNumberString += element;
        if (!currentNumberIsGear && isGearNumber()) {
          currentNumberIsGear = true;
        }
      } else {
        if (currentNumberIsGear) {
          partNumbers.push(parseInt(currentNumberString));
          currentNumberIsGear = false;
        }
        currentNumberString = "";
      }

      function isGearNumber() {
        const previousLine = lines[parseInt(rowIndex) - 1];
        const currentLine = line;
        const nextLine = lines[parseInt(rowIndex) + 1];

        if (isStar(previousLine?.[parseInt(columnIndex) - 1]))  { return true; }
        if (isStar(previousLine?.[parseInt(columnIndex) + 0]))  { return true; }
        if (isStar(previousLine?.[parseInt(columnIndex) + 1]))  { return true; }

        if (isStar(currentLine[parseInt(columnIndex) - 1]))  { return true; }
        if (isStar(currentLine[parseInt(columnIndex) + 0]))  { return true; }
        if (isStar(currentLine[parseInt(columnIndex) + 1]))  { return true; }

        if (isStar(nextLine?.[parseInt(columnIndex) - 1]))  { return true; }
        if (isStar(nextLine?.[parseInt(columnIndex) + 0]))  { return true; }
        if (isStar(nextLine?.[parseInt(columnIndex) + 1]))  { return true; }
        return false;

        function isStar(s: string) {
          return s === "*";
        }
      }
    }
  }

  return partNumbers.reduce((sum, nb) => sum + nb);
}