import lodash from 'lodash';
import { stringCreator } from '../utils.js';

export default (entity) => {
  const builder = (data, parents = []) => data.reduce((acc, el) => {
    if (lodash.has(el, 'children')) {
      const newParents = parents.concat(el.key);
      const children = builder(el.children, newParents);
      acc += children;
    }
    if (el.type === 'added') {
      acc += stringCreator(parents, el.key, el.value, el.type);
    }
    if (el.type === 'removed') {
      acc += stringCreator(parents, el.key, el.value, el.type);
    }
    if (el.type === 'updated') {
      acc += stringCreator(parents, el.key, el.value, el.type);
    }

    return acc;
  }, '');
  return `${builder(entity)}\n`;
};
