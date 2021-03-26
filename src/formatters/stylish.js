import _ from 'lodash';
import {
  spaceMaker, stylishStringCreator,
} from '../utils.js';

const formatToStylish = (entity) => {
  const firstLevelElements = entity.map((el) => el.key);

  const builder = (data, level = 1) => data.reduce((acc, el) => {
    if (_.has(el, 'children')) {
      const nextLevel = firstLevelElements.includes(el.key) ? 2 : level + 1;

      const currentLevel = firstLevelElements.includes(el.key) ? 1 : level;

      const innerData = builder(el.children, nextLevel);

      acc += `\n${spaceMaker(currentLevel)}${el.key}: {${innerData}\n${spaceMaker(currentLevel)}}`;
    }

    if (el.type === 'added') {
      acc += stylishStringCreator(level, true, el.key, el.value, '+ ');
    }

    if (el.type === 'removed') {
      acc += stylishStringCreator(level, true, el.key, el.value, '- ');
    }

    if (el.type === 'same') {
      acc += stylishStringCreator(level, false, el.key, el.value, '');
    }

    if (el.type === 'updated') {
      acc += `${stylishStringCreator(level, true, el.key, el.value1, '- ')}${stylishStringCreator(level, true, el.key, el.value2, '+ ')}`;
    }

    return acc;
  }, '');

  return `{${builder(entity)}\n}\n`;
};

export default formatToStylish;
