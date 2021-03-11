import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test } from '@jest/globals';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishExample = '{\n'
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
    + '        deep: {\n'
    + '            id: {\n'
    + '                number: 45\n'
    + '            }\n'
    + '        }\n'
    + '        fee: 100500\n'
    + '    }\n'
    + '}';
const plainExample = '\n'
    + 'Property \'common.follow\' was added with value: false\n'
    + 'Property \'common.setting2\' was removed\n'
    + 'Property \'common.setting3\' was updated. From true to null\n'
    + 'Property \'common.setting4\' was added with value: \'blah blah\'\n'
    + 'Property \'common.setting5\' was added with value: [complex value]\n'
    + 'Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'\n'
    + 'Property \'common.setting6.ops\' was added with value: \'vops\'\n'
    + 'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n'
    + 'Property \'group1.nest\' was updated. From [complex value] to \'str\'\n'
    + 'Property \'group2\' was removed\n'
    + 'Property \'group3\' was added with value: [complex value]';
const toJSONExample = '[{"key":"common","children":[{"key":"follow","added":false},{"key":"setting1","same":"Value 1"},' +
    '{"key":"setting2","removed":200},{"key":"setting3","updated":[true,null]},{"key":"setting4","added":"blah blah"},' +
    '{"key":"setting5","added":{"key5":"value5"}},{"key":"setting6","children":[' +
    '{"key":"doge","children":[{"key":"wow","updated":["","so much"]}]},{"key":"key",' +
    '"same":"value"},{"key":"ops","added":"vops"}]}]},{"key":"group1","children":[{"key":"baz","updated":' +
    '["bas","bars"]},{"key":"foo","same":"bar"},{"key":"nest","updated":[{"key":"value"},"str"]}]},{"key":"group2","removed":' +
    '{"abc":12345,"deep":{"id":45}}},{"key":"group3","added":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('JSON test Stylish', () => {
  expect(diff(getFixturePath('firstDoc.json'), getFixturePath('secondDoc.json'))).toEqual(stylishExample);
});

test('YML test Stylish', () => {
  expect(diff(getFixturePath('firstDoc.yml'), getFixturePath('secondDoc.yml'))).toEqual(stylishExample);
});

test('JSON test Plain', () => {
  expect(diff(getFixturePath('firstDoc.json'), getFixturePath('secondDoc.json'))).toEqual(plainExample);
});

test('YML test Plain', () => {
  expect(diff(getFixturePath('firstDoc.yml'), getFixturePath('secondDoc.yml'))).toEqual(plainExample);
});

test('ToJSON test', () => {
  expect(diff(getFixturePath('firstDoc.json'), getFixturePath('secondDoc.json'))).toEqual(toJSONExample);
});
