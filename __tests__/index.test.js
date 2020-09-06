import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import {test} from "@jest/globals";
import diff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('JSON test', () => {
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual('{\n'
        + ' - follow: false\n'
        + '   host: hexlet.io\n'
        + ' - proxy: 123.234.53.22\n'
        + ' - timeout: 50\n'
        + ' + timeout: 20\n'
        + ' + verbose: true\n'
        + '}');
});

test('YML test', () => {
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual('{\n'
      + ' - follow: false\n'
      + '   host: hexlet.io\n'
      + ' - proxy: 123.234.53.22\n'
      + ' - timeout: 50\n'
      + ' + timeout: 20\n'
      + ' + verbose: true\n'
      + '}');
});
