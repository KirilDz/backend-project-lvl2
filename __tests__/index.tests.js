import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test } from '@jest/globals';
import fs from 'fs';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const plainExample = fs.readFileSync(getFixturePath('expected-plain-result.txt')).toString();
const stylishExample = fs.readFileSync(getFixturePath('expected-stylish-result.txt')).toString();
const jsonExample = JSON.stringify(JSON.parse(fs.readFileSync(getFixturePath('expected-json-result.json'))));

describe.each([
  ['json', plainExample, stylishExample, jsonExample],
  ['yml', plainExample, stylishExample, jsonExample],
])('Tests list', (format, plainExpected, stylishExpected, jsonExpected) => {
  test(`Test ${format} format.`, () => {
    const plainOutput = diff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'plain');
    expect(plainOutput).toEqual(plainExpected);

    const stylishOutput = diff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`));
    expect(stylishOutput).toEqual(stylishExpected);

    const jsonOutput = diff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'json');
    expect(jsonOutput).toEqual(jsonExpected);
  });
});
