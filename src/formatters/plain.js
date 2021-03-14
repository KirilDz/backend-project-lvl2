import { stringCreator } from '../utils.js';

export default (entity) => {
  const builder = (data, parents = []) => data.reduce((acc, el) => {
    if (Object.prototype.hasOwnProperty.call(el, 'children')) {
      const newParents = parents.concat(el.key);
      const children = builder(el.children, newParents);
      acc += children;
    }
    if (Object.prototype.hasOwnProperty.call(el, 'added')) {
      acc += stringCreator(parents, el.key, el.added, 'added');
    }
    if (Object.prototype.hasOwnProperty.call(el, 'removed')) {
      acc += stringCreator(parents, el.key, el.removed, 'removed');
    }
    if (Object.prototype.hasOwnProperty.call(el, 'updated')) {
      acc += stringCreator(parents, el.key, el.updated, 'updated');
    }

    return acc;
  }, '');
  return builder(entity);
};
