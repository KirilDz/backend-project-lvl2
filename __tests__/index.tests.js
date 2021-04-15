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

describe.each(['json', 'yml'])('getDiff tests for %s input format', (inputFormat) => {
  const fixturePath1 = getFixturePath(`file1.${inputFormat}`);
  const fixturePath2 = getFixturePath(`file2.${inputFormat}`);

  test('default output formatter', () => {
    expect(diff(fixturePath1, fixturePath2)).toEqual(expectedStylishResult);
  });

  test('stylish output formatter', () => {
    expect(diff(fixturePath1, fixturePath2, 'stylish')).toEqual(expectedStylishResult);
  });

  test('plain output formatter', () => {
    expect(diff(fixturePath1, fixturePath2, 'plain')).toEqual(expectedPlainResult);
  });

  test('JSON output formatter', () => {
    expect(diff(fixturePath1, fixturePath2, 'json')).toEqual(expectedJSONResult);
  });
  //
  // test('Valid output JSON', () => {
  //
  // })
});
