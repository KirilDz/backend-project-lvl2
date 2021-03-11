import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const data1 = yaml.load(fs.readFileSync('__fixtures__/secondDoc.yml', 'utf-8'));
const data2 = JSON.parse(fs.readFileSync('__fixtures__/secondDoc.json', 'utf-8'));

console.log(data1);
console.log(data2);
