import parse from './src/parse.js';
import { treeDifferenceBuilder, levels } from './src/treeBuilder.js';
import { stylish } from "./src/stylish.js";

export default (filePath1, filePath2) => {
    const parsedData = parse(filePath1, filePath2);
    const treeDifference = treeDifferenceBuilder(parsedData[0], parsedData[1]);
    console.log(levels)
    console.log(treeDifference)
    // const stylishData = stylish(treeDifference);
    // console.log(stylishData)
};
