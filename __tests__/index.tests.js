import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test } from '@jest/globals';
import fs from 'fs';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFixture = (fixtureName) => {
  return fs.readFileSync(getFixturePath(fixtureName), 'utf-8');
};

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedPlainResult = readFixture('expected-plain-result.txt');
const expectedStylishResult = readFixture('expected-stylish-result.txt');
const expectedJSONResult = readFixture('expected-json-result.json');

describe.each([
  ['json', expectedJSONResult, expectedStylishResult],
  ['yml', expectedJSONResult, expectedStylishResult],
])('Tests formatters with different formats', (format,jsonExpected, stylishExpected) => {

  const fixturePath1 = getFixturePath(`file1.${format}`);
  const fixturePath2 = getFixturePath(`file2.${format}`);

  test(`Test input ${format} format.`, () => {
    // const plainOutput = diff(fixturePath1, fixturePath2, 'plain');
    // expect(plainOutput).toEqual(plainExpected);

    const stylishOutputDefault = diff(fixturePath1, fixturePath2);
    expect(stylishOutputDefault).toEqual(stylishExpected);

    const stylishOutputClearly = diff(fixturePath1, fixturePath2, 'stylish');
    expect(stylishOutputClearly).toEqual(stylishExpected);

    const jsonOutput = diff(fixturePath1, fixturePath2, 'json');
    expect(jsonOutput).toEqual(jsonExpected);

  });
});

// describe.each([
//   ['json', plainExample, stylishExample, jsonExample],
//   ['yml', plainExample, stylishExample, jsonExample],
// ])('Tests list', (format, plainExpected, stylishExpected, jsonExpected) => {
//   test(`Test ${format} format.`, () => {
//     const plainOutput = diff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'plain');
//     expect(plainOutput).toEqual(plainExpected);
//
//     const stylishOutput = diff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`));
//     expect(stylishOutput).toEqual(stylishExpected);
//
//     const jsonOutput = diff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'json');
//     expect(jsonOutput).toEqual(jsonExpected);
//   });
// });
