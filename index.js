import parse from './src/parse.js';
import treeBuilder from './src/treeBuilder.js';
import outputResult from './src/outputResult.js';

export default (filePath1, filePath2) => {
  const parsedData = parse(filePath1, filePath2);
  const tree = treeBuilder(parsedData[0], parsedData[1]);
  const output = outputResult(tree);
  console.log(output);
  return output;
};
