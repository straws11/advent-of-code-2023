import * as fs from 'fs';

export function readFile(filePath: string) {
  let contents: string = fs.readFileSync(filePath, 'utf8');
  return contents.split('\r\n');
}
