import {
  spaceMaker, objectToString, isObject, stylishStringCreator,
} from '../utils.js';

export default (entity) => {
  const firstLevelElements = entity.map((el) => el.key);

  const builder = (data, level = 1) => data.reduce((acc, el) => {
    if (Object.prototype.hasOwnProperty.call(el, 'children')) {
      const nextLevel = firstLevelElements.includes(el.key) ? 2 : level + 1;

      const currentLevel = firstLevelElements.includes(el.key) ? 1 : level;

      const innerData = builder(el.children, nextLevel);

      acc += `\n${spaceMaker(currentLevel)}${el.key}: {${innerData}\n${spaceMaker(currentLevel)}}`;
    }

    if (Object.prototype.hasOwnProperty.call(el, 'added')) {
      const diffValue = isObject(el.added) ? `{${objectToString(el.added, level)}\n${spaceMaker(level)}}` : el.added;

      acc += stylishStringCreator(level, true, el.key, diffValue, '+ ');
    }

    if (Object.prototype.hasOwnProperty.call(el, 'removed')) {
      const diffValue = isObject(el.removed) ? `{${objectToString(el.removed, level)}\n${spaceMaker(level)}}` : el.removed;

      acc += stylishStringCreator(level, true, el.key, diffValue, '- ');
    }

    if (Object.prototype.hasOwnProperty.call(el, 'same')) {
      const diffValue = isObject(el.same) ? `{${objectToString(el.same, level)}\n${spaceMaker(level)}}` : el.same;

      acc += stylishStringCreator(level, false, el.key, diffValue, '');
    }

    if (Object.prototype.hasOwnProperty.call(el, 'updated')) {
      const firstDiffValue = isObject(el.updated[0]) ? `{${objectToString(el.updated[0], level)}\n${spaceMaker(level)}}` : el.updated[0];
      const secondDiffValue = isObject(el.updated[1]) ? `{${objectToString(el.updated[1], level)}\n${spaceMaker(level)}}` : el.updated[1];

      acc += `${stylishStringCreator(level, true, el.key, firstDiffValue, '- ')}${stylishStringCreator(level, true, el.key, secondDiffValue, '+ ')}`;
    }

    return acc;
  }, '');

  return `{${builder(entity)}\n}`;
};
