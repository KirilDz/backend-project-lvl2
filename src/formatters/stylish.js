import {
  spaceMaker, stylishStringCreator,
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
      acc += stylishStringCreator(level, true, el.key, el.added, '+ ');
    }

    if (Object.prototype.hasOwnProperty.call(el, 'removed')) {
      acc += stylishStringCreator(level, true, el.key, el.removed, '- ');
    }

    if (Object.prototype.hasOwnProperty.call(el, 'same')) {
      acc += stylishStringCreator(level, false, el.key, el.same, '');
    }

    if (Object.prototype.hasOwnProperty.call(el, 'updated')) {
      acc += `${stylishStringCreator(level, true, el.key, el.updated[0], '- ')}${stylishStringCreator(level, true, el.key, el.updated[1], '+ ')}`;
    }

    return acc;
  }, '');

  return `{${builder(entity)}\n}`;
};
