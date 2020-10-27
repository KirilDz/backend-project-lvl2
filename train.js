import yaml from 'js-yaml';
import fs from 'fs';
import ini from 'ini';
import { addSpaces, isObject, spacesConfig } from './src/utils.js';

const obj = ini.parse(fs.readFileSync('./__fixtures__/file2.ini', 'utf-8'));
console.log(obj);
