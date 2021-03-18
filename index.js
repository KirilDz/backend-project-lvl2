import parse from './src/parser.js';
import treeDifferenceBuilder from './src/treeBuilder.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';

export default (filePath1, filePath2, formatter = 'stylish') => {
  const treeDifference = treeDifferenceBuilder(parse(filePath1), parse(filePath2));

  if (formatter === 'plain') {
    return plain(treeDifference);
  }

  if (formatter === 'json') {
    return json(treeDifference);
  }

  return stylish(treeDifference);
};
