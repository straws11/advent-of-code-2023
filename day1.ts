import { readFile } from './helpers';

const contents: string[] = readFile('day1_in.txt');

function part1(inputs: string[]): number {
  const vals: number[] = inputs.map((val) => {
    // all numerical chars in the word, in order
    const nums: string[] = [...val].filter((value) => !isNaN(parseInt(value)));
    return parseInt(nums[0] + nums[nums.length - 1]);
  });
  return vals.reduce((acc, curr) => acc + curr, 0);
}

function part2(inputs: string[]): number {
  const wordNums = new Map<string, string>([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9']
  ]);

  const transformed: string[] = inputs.map((val) => {
    var output: string = "";
    for (let i = 0; i < val.length; i++) {
      if (!isNaN(parseInt(val[i]))) {
        output += val[i];
      }
      wordNums.forEach((numerical, key) => {
        const wordLen: number = key.length;
        if (val.slice(i, i + wordLen) == key) {
          // then it's a match for a word num
          output += numerical;
        }
      });
      if (output.length == 1) break;
    }

    //from back
    for (let i = val.length - 1; i >= 0; i--) {
      if (!isNaN(parseInt(val[i]))) {
        output += val[i];
      }
      wordNums.forEach((numerical, key) => {
        const wordLen: number = key.length;
        if (val.slice(i, i + wordLen) == key) {
          output += numerical;
        }
      });
      if (output.length == 2) break;
    }

    return output;
  });
  console.log(transformed);
  return transformed.map(Number).reduce((acc, cur) => acc + cur, 0);

}

//console.log(`Part 1: ${part1(contents)}`);
console.log(`Part 2: ${part2(contents)}`);
