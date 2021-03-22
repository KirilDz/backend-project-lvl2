import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import buildDiffTree from './src/treeBuilder.js';
import formatToStylish from './src/formatters/stylish.js';
import formatToPlain from './src/formatters/plain.js';
import formatToJson from './src/formatters/json.js';

const extractData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  const format = path.extname(filepath).slice(1);
  return {
    data,
    format,
  };
};

const chooseFormatter = (data, name) => {
  switch (name) {
    case 'plain':
      return formatToPlain(data);
    case 'json':
      return formatToJson(data);
    default:
      return formatToStylish(data);
  }
};

export default (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = extractData(filePath1);
  const data2 = extractData(filePath2);

  const treeDifference = buildDiffTree(parse(data1.data, data1.format),
    parse(data2.data, data2.format));

  return chooseFormatter(treeDifference, formatter);
};
