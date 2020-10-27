import { isObject, diffBuilder, types } from './utils.js';

export const dfs = (data1, data2, level = 1) => {
  const allKeys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const data = allKeys.map((el) => {
    if (Object.prototype.hasOwnProperty.call(data1, el) && Object.prototype.hasOwnProperty.call(data2, el)) {
      if (data1[el] === data2[el]) {
        return diffBuilder(el, types.sameValues, data1[el], level);
      } if (isObject(data1[el]) && isObject(data2[el])) {
        const recursion = dfs(data1[el], data2[el], level += 1);
        level -= 1;
        return diffBuilder(el, types.treeValues, recursion, level);
      }
      return diffBuilder(el, types.changedValue, [data1[el], data2[el]], level);
    } if (Object.prototype.hasOwnProperty.call(data1, el)) {
      return diffBuilder(el, types.deleted, data1[el], level);
    }
    return diffBuilder(el, types.added, data2[el], level);
  });
  console.log(data);
  return data;
};
