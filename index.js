import parse from './src/parse.js';
import { dfs } from './src/treeBuilder.js';
import { formatter } from './src/stylish.js';

export default (filePath1, filePath2) => {
  const parsedData = parse(filePath1, filePath2);
  const tree = dfs(parsedData[0], parsedData[1]);
  const output = formatter(tree);
  console.log(`${output}}`);
  return `${output}}`;
};
