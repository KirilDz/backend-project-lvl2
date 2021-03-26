import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import treeDifferenceBuilder from './src/treeBuilder.js';
import format from './src/formatters/index.js'

const extractData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  const format = path.extname(filepath).slice(1);
  return {
    data,
    format,
  };
};

export default (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = extractData(filePath1);
  const data2 = extractData(filePath2);

  const parseData1 = parse(data1.data, data1.format);
  const parseData2 = parse(data2.data, data2.format);

  const treeDifference = treeDifferenceBuilder(parseData1, parseData2);

  return format(treeDifference, formatter);
};
