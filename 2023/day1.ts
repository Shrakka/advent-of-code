export function combineFirstAndLastDigits(line: string) {
  const matches = [...line.matchAll(/[0-9]/g)];
  const firstDigit = matches.at(0)![0];
  const lastDigit = matches.at(-1)![0];
  return parseInt(firstDigit + lastDigit);
}

