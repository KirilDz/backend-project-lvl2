import parse from './src/parser.js';
import treeDifferenceBuilder from './src/treeBuilder.js';
import { stylish } from './src/stylish.js';

export default (filePath1, filePath2) => {
  const parsedData = parse(filePath1, filePath2);
  const treeDifference = treeDifferenceBuilder(parsedData[0], parsedData[1]);
  const style = stylish(treeDifference);
  console.log(style)
};
