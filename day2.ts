import { readFile } from './helpers';

const contents: string[] = readFile('day2_in.txt');

function both(part1: boolean): number {
  var total: number = 0;
  var part2Total: number = 0;

  contents.forEach((val, idx) => {
    var validGame: boolean = true;
    var max: number[] = [0, 0, 0];
    // split into all turns
    const turns: string[] = val.slice(val.indexOf(':') + 2, val.length).split('; ');

    for (const turn of turns) {
      const balls: string[] = turn.split(', ');
      for (const ball of balls) {
        const [am, color]: string[] = ball.split(' ');
        const amount: number = Number(am);
        switch (color) {
          case ('red'): {
            if (amount > max[0]) max[0] = amount;
            if (amount > 12) validGame = false;
            break;
          }
          case ('green'): {
            if (amount > max[1]) max[1] = amount;
            if (Number(amount) > 13) validGame = false;
            break;
          }
          case ('blue'): {
            if (amount > max[2]) max[2] = amount;
            if (Number(amount) > 14) validGame = false;
            break;
          }
        }

        if (!validGame && part1) break;

      }

      if (!validGame && part1) break;
    }

    if (validGame) total += idx + 1;
    part2Total += [...max].reduce((acc, cur) => acc * cur, 1);
  });
  if (part1) return total;
  else return part2Total;
}

console.log(`Part 1: ${both(true)}`);
console.log(`Part 2: ${both(false)}`);
