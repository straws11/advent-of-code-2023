import { readFile } from './helpers';

function createObject(line: string): { winNums: number[], otherNums: number[] } {
  const noCardName: string = line.slice(
    line.indexOf(':') + 2, line.length);
  const splits: string[] = noCardName.split(' | ');
  var win: number[] = [];
  var other: number[] = [];
  // win numbers
  for (let i = 0; i < splits[0].length; i += 3) {
    win.push(parseInt(splits[0].slice(i, i + 3).trim(), 10));
  }

  // card numbers
  for (let i = 0; i < splits[1].length; i += 3) {
    other.push(parseInt(splits[1].slice(i, i + 3).trim(), 10));
  }

  return { winNums: win, otherNums: other };

}


const contents: string[] = readFile('day4_in.txt');
const cards: { winNums: number[], otherNums: number[] }[] = [];

contents.forEach((val) => {
  cards.push(createObject(val));
});

function part1(): number {
  var score: number = 0;

  cards.forEach((card) => {
    var matchCount: number = 0;

    card.otherNums.forEach((num) => {
      if (card.winNums.includes(num)) matchCount++;
    });

    if (matchCount > 0) score += 2 ** (matchCount - 1);
  });
  return score;
}


function part2(): number {
  var cardCounts: number[] = Array.from({ length: cards.length }, () => 1);

  cards.forEach((card, idx) => {
    var matchCount: number = 0;
    card.otherNums.forEach((num) => {
      if (card.winNums.includes(num)) matchCount++;
    });
    for (let i = 0; i < matchCount; i++) {
      cardCounts[i + idx + 1] += cardCounts[idx];
    }

  });
  console.log(cardCounts);
  return cardCounts.reduce((acc, cur) => acc + cur, 0);

}
console.log(`Part1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
