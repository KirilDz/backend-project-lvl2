import parse from './src/parser.js';
import treeDifferenceBuilder from './src/treeBuilder.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import toJSON from './src/formatters/json.js';

export default (filePath1, filePath2, formatter = 'stylish') => {
  const parsedData = parse(filePath1, filePath2);
  const treeDifference = treeDifferenceBuilder(parsedData[0], parsedData[1]);

  if (formatter === 'stylish') {
    console.log(stylish(treeDifference))
    return stylish(treeDifference);
  }

  if (formatter === 'plain') {
    console.log(plain(treeDifference))
    return plain(treeDifference);
  }

  if (formatter === 'toJSON') {
    console.log(toJSON(treeDifference))
    return toJSON(treeDifference);
  }

  return treeDifference;
};
