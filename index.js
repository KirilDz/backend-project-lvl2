import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import treeDifferenceBuilder from './src/treeBuilder.js';
import format from './src/formatters/index.js';

const readData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath);
  const fileFormat = path.extname(filepath).slice(1);
  return {
    data,
    fileFormat,
  };
};

export default (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = readData(filePath1);
  const data2 = readData(filePath2);

  const parseData1 = parse(data1.data, data1.fileFormat);
  const parseData2 = parse(data2.data, data2.fileFormat);

  const treeDifference = treeDifferenceBuilder(parseData1, parseData2);

  return format(treeDifference, formatter);
};
