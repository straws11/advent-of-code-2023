import { readFile } from './helpers';

const grid: string[][] = readFile('day3_in.txt').map((val) => val.split(''));

const NON_SYMBOLS: string = '0123456789.';

function detectValidity(num: string[], rowIndex: number, startColIndex: number): boolean {
  //Determine if the string num has at least one surrounding symbol
  var valid: boolean = false;
  console.log(num);
  for (let idx = 0; idx < num.length; idx++) {
    var [corner1, corner2, side, top, bot]: boolean[] = [false, false, false, false, false]; // false means no special char
    console.log(idx, num[idx]);
    var colIndex: number = startColIndex + idx;
    if (idx == 0) { // first element, have to check up to 3 extra spots
      // FIRST ELEMENT
      if (rowIndex != 0 && colIndex != 0) { //can check top left corner
        corner1 = !NON_SYMBOLS.includes(grid[rowIndex - 1][colIndex - 1]);
        console.log(`corner1: ${corner1}`);
      }
      if (rowIndex != grid.length - 1 && colIndex != 0) { //can check bottom left corner
        corner2 = !NON_SYMBOLS.includes(grid[rowIndex + 1][colIndex - 1]);
        console.log(`corner2: ${corner2}`);
      }
      if (colIndex != 0) side = !NON_SYMBOLS.includes(grid[rowIndex][colIndex - 1]);

      // check if this target makes it valid
      valid = corner1 || corner2 || side;
      console.log(`valid: ${valid}`);
      if (valid) return true;

    }

    if (idx == num.length - 1) { // last element, check up to 3 extra spots (not else because 1 element items exist)
      // LAST ELEMENT
      if (rowIndex != 0 && colIndex != grid[0].length - 1) { //can check top right corner
        corner1 = !NON_SYMBOLS.includes(grid[rowIndex - 1][colIndex + 1]);
        console.log(`again corner1: ${corner1}`);
      }
      if (rowIndex != grid.length - 1 && colIndex != grid[0].length - 1) {//can check bottom right corner
        corner2 = !NON_SYMBOLS.includes(grid[rowIndex + 1][colIndex + 1]);
        console.log(`again corner2: ${corner2}`);
      }
      if (colIndex != grid.length - 1) side = !NON_SYMBOLS.includes(grid[rowIndex][colIndex + 1]);

      // check if this target makes it valid
      valid = corner1 || corner2 || side;
      console.log(`end valid: ${valid}`);
      if (valid) return true;
    }

    // check below and above, this goes for all pieces
    if (rowIndex != 0) top = !NON_SYMBOLS.includes(grid[rowIndex - 1][colIndex]);
    if (rowIndex != grid[0].length - 1) bot = !NON_SYMBOLS.includes(grid[rowIndex + 1][colIndex]);
    valid = top || bot; // outside chars were already returned if true above, this won't override anything

    console.log(`full check this char valid: ${valid}`);
    if (valid) return true;

  }

  return false;
}

function part1(): number {
  var total: number = 0;

  grid.forEach((row, rowIdx) => {
    var onNum: boolean = false;
    var num: string[] = [];
    var validNum: boolean = false;
    row.forEach((val, idx) => {
      onNum = NON_SYMBOLS.slice(0, 10).includes(val);
      if (onNum) num.push(val);  // value is a number
      const numOnEnd: boolean = idx == row.length - 1 && onNum;
      if ((num.length > 0 && !onNum) || numOnEnd) {
        // if length > 0, means I have found a complete number, now process
        const startPos: number = idx - num.length;
        validNum = detectValidity(num, rowIdx, startPos);
        if (validNum) {
          console.log('this boi valid' + Number(num.join('')));
          total += Number(num.join(''));
          console.log("NEW TOTTTTTTTTTTAAAAAAAAAAAAAAL: " + total);
        }
        num = [];
      }
    });
  });

  return total;
}

console.log(`Part 1: ${part1()}`);
for (let i = 0; i < grid.length; i++) console.log(grid[i].length)
