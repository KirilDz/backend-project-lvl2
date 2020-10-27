import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test } from '@jest/globals';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const example = '{\n'
    + '    common: {\n'
    + '      + follow: false\n'
    + '        setting1: Value 1\n'
    + '      - setting2: 200\n'
    + '      - setting3: true\n'
    + '      + setting3: null\n'
    + '      + setting4: blah blah\n'
    + '      + setting5: {\n'
    + '            key5: value5\n'
    + '        }\n'
    + '        setting6: {\n'
    + '            doge: {\n'
    + '              - wow: \n'
    + '              + wow: so much\n'
    + '            }\n'
    + '            key: value\n'
    + '          + ops: vops\n'
    + '        }\n'
    + '    }\n'
    + '    group1: {\n'
    + '      - baz: bas\n'
    + '      + baz: bars\n'
    + '        foo: bar\n'
    + '      - nest: {\n'
    + '            key: value\n'
    + '        }\n'
    + '      + nest: str\n'
    + '    }\n'
    + '  - group2: {\n'
    + '        abc: 12345\n'
    + '        deep: {\n'
    + '            id: 45\n'
    + '        }\n'
    + '    }\n'
    + '  + group3: {\n'
    + '        fee: 100500\n'
    + '        deep: {\n'
    + '            id: {\n'
    + '                number: 45\n'
    + '            }\n'
    + '        }\n'
    + '    }\n'
    + '}';

test('JSON test', () => {
  expect(diff(getFixturePath('file1Big.json'), getFixturePath('file2Big.json'))).toEqual(example);
});

test('YML test', () => {
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(example);
});
