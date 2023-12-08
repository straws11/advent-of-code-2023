import { readFile } from './helpers';

const NON_VALID: string = '0123456789.';

interface Coord {
  x: number;
  y: number;
}

interface NumObj {
  val: number;
  length: number;
  startPos: Coord;
  endPos: Coord;
  valid: boolean;
  determineValid(grid: string[][]): boolean;
}

class CustomNumber implements NumObj {
  val: number;
  length: number;
  startPos: Coord;
  endPos: Coord;
  valid: boolean;

  constructor(val: number, start: Coord, end: Coord) {
    this.val = val;
    this.length = val.toString().length;
    this.startPos = start;
    this.endPos = end;
    this.valid = this.determineValid(grid);
  }

  determineValid(grid: string[][]): boolean {
    var neighbours: string[] = [];
    //top row
    if (this.startPos.y > 0) {
      let posY: number = this.startPos.y - 1;
      let startIdx: number = this.startPos.x > 0 ? -1 : 0;
      let endIdx: number = this.endPos.x > grid.length - 1 ? 1 : 0;
      for (let i = startIdx; i < this.length + 1 + endIdx; i++) {
        const posX: number = this.startPos.x + i;
        const char: string = grid[posY][posX];
        neighbours.push(char);
      }
    }

    //bottom row
    if (this.startPos.y < grid.length - 1) {
      let posY: number = this.startPos.y + 1;
      let startIdx: number = this.startPos.x > 0 ? -1 : 0;
      let endIdx: number = this.endPos.x > grid.length - 1 ? 1 : 0;
      for (let i = startIdx; i < this.length + 1 + endIdx; i++) {
        const posX: number = this.startPos.x + i;
        neighbours.push(grid[posY][posX]);
      }
    }
    //sides
    if (this.startPos.x > 0) {
      neighbours.push(
        grid[this.startPos.y][this.startPos.x - 1]
      );
    }
    if (this.endPos.x < grid.length - 1) {
      neighbours.push(
        grid[this.startPos.y][this.endPos.x + 1]
      );
    }

    const validNeighbours: string[] = neighbours.filter((val) => val != undefined);

    for (const neighbour of validNeighbours) {
      if (!NON_VALID.includes(neighbour)) return true;
    }
    return false;

  }

}



const contents: string[] = readFile('day3_in.txt');
const grid: string[][] = contents.map((val) => val.split(''));

function part1(): number {
  //console.log(grid);
  var allNums: CustomNumber[] = [];
  grid.forEach((line, lineIndex) => {
    var num: string = '';
    var onNum: boolean = false;
    line.forEach((char, idx) => {
      onNum = NON_VALID.slice(0, 10).includes(char);
      if (onNum) num += char;
      if (num.length > 0 && (!onNum || idx == line.length - 1)) {
        let startPos: Coord = { x: 0, y: 0 };
        let endPos: Coord = { x: 0, y: 0 };
        if (onNum) { // last char of the line, indexing a bit different
          startPos = { x: idx - num.length + 1, y: lineIndex };
          endPos = { x: idx, y: lineIndex };
        } else {
          startPos = { x: idx - num.length, y: lineIndex };
          endPos = { x: idx - 1, y: lineIndex }
        }

        const partNumber = new CustomNumber(Number(num), startPos, endPos);
        allNums.push(partNumber);
        num = '';
      }
    });
  });

  console.log(allNums);
  const total: number = allNums.filter((obj) => obj.valid).reduce((acc, cur) => acc + cur.val, 0);
  return total;
}

console.log(`Part1: ${part1()}`);
