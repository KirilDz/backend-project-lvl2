import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test } from '@jest/globals';
import diff from '../index.js';
import stylishExample from '../__fixtures__/stylishExample.js';
import plainExample from '../__fixtures__/plainExample.js';
import jsonExample from '../__fixtures__/jsonExample.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  [diff(getFixturePath('file1.json'), getFixturePath('file2.json')), stylishExample],
  [diff(getFixturePath('file1.yml'), getFixturePath('file2.yml')), stylishExample],
  [diff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'), plainExample],
  [diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain'), plainExample],
  [diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json'), jsonExample],
])('All formatters tests', (func, expected) => {
  expect(func).toBe(expected);
});
