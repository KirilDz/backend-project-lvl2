const isObject = (el) => typeof el === 'object' && el !== null;
const getChildren = (el) => el;
const diffBuilder = (keyName, diff, value, level) => ({
  keyName,
  difference: diff,
  value,
  level,
});
const types = {
  sameValues: 0,
  changedValue: 1,
  treeValues: 2,
  added: 3,
  deleted: 4,
};

const transformObj = (obj, level) => {
  const entries = Object.entries(obj);
  const str = entries.reduce((acc, el) => {
    if (isObject(el[1])) {
      const recursion = transformObj(el[1], level + 1);
      acc += `  ${addSpaces(level)}${el[0]}: ${recursion}\n`;
    } else {
      acc += `  ${addSpaces(level)}${el[0]}: ${el[1]}\n`;
    }
    return acc;
  }, '');
    // console.log(`{\n${str}}`)
  return `{\n${str}${addSpaces(level - 1, true)}}`;
};

const spacesConfig = {
  1: 2,
  2: 6,
  3: 10,
  4: 14,
  5: 18,
};

const closedParenthesesConfig = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
};

const addSpaces = (level, isParentheses = false) => {
  const space = ' ';

  return isParentheses ? space.repeat(closedParenthesesConfig[level]) : space.repeat(spacesConfig[level]);
};

export {
  isObject,
  getChildren,
  diffBuilder,
  types,
  transformObj,
  addSpaces,
  spacesConfig,
  closedParenthesesConfig,
};
