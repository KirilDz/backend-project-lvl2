import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test } from '@jest/globals';
import dfs from '../src/compareFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const example = '{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '}\n';

test('JSON test', () => {
  expect(dfs(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(example);
});
