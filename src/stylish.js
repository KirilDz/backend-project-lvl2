import { isObject, transformObj, addSpaces } from './utils.js';

export const formatter = (data) => {
  const string = data.reduce((acc, el) => {
    switch (el.difference) {
      case 0:
        acc += `\n${addSpaces(el.level)}  ${el.keyName}: ${isObject(el.value) ? transformObj(el.value, el.level += 1) : el.value}`;
        break;
      case 1:
        acc += `\n${addSpaces(el.level)}- ${el.keyName}: ${isObject(el.value[0])
          ? transformObj(el.value[0], el.level + 1)
          : el.value[0]}\n${addSpaces(el.level)}+ ${el.keyName}: ${isObject(el.value[1]) ? transformObj(el.value[1], el.level + 1) : el.value[1]}`;
        break;
      case 2:
        const recursion = formatter(el.value);
        acc += `\n${addSpaces(el.level)}  ${el.keyName}: ${recursion}${addSpaces(el.level, true)}}`;
        break;
      case 3:
        acc += `\n${addSpaces(el.level)}+ ${el.keyName}: ${isObject(el.value) ? transformObj(el.value, el.level += 1) : el.value}`;
        break;
      case 4:
        acc += `\n${addSpaces(el.level)}- ${el.keyName}: ${isObject(el.value) ? transformObj(el.value, el.level += 1) : el.value}`;
        break;
      default:
        return null;
    }
    return acc;
  }, '');
    // console.log(`{${string}\n}`)
  return `{${string}\n`;
};
