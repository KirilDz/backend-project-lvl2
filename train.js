import yaml from 'js-yaml';
import fs from 'fs';
import ini from 'ini';

import path from 'path';

const obj = yaml.load(fs.readFileSync('./__fixtures__/file1.yml'));

console.log(obj)

console.log(path.extname('./__fixtures__/file1.yml'))

console.log('#################################')

const obj1 = ini.parse(fs.readFileSync('./__fixtures__/file1.ini'));

console.log(obj1)

