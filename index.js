import parse from './src/parser.js';
import treeDifferenceBuilder from './src/treeBuilder.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import toJSON from './src/formatters/json.js';

export default (filePath1, filePath2) => {
  const parsedData = parse(filePath1, filePath2);
  const treeDifference = treeDifferenceBuilder(parsedData[0], parsedData[1]);
  // const style = stylish(treeDifference);
  //
  // return style;

  // const plainOutput = plain(treeDifference);
  // console.log(plainOutput);
  // return plainOutput;

  console.log(toJSON(treeDifference))

  return toJSON(treeDifference)
};
