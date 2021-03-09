import { isObject } from './utils.js';

export default (firstDoc, secondDoc) => {
  const treeDifferenceBuilder = (firstEl, secondEl) => {
    const mergeKeys = [...new Set([...Object.keys(firstEl), ...Object.keys(secondEl)])].sort();

    return mergeKeys.map((key) => {
      if (isObject(firstEl[key]) && isObject(secondEl[key])) {
        const children = treeDifferenceBuilder(firstEl[key], secondEl[key]);

        return { key, children };
      }

      if (firstEl[key] === secondEl[key]) {
        return { key, same: firstEl[key] };
      }

      if (!Object.prototype.hasOwnProperty.call(firstEl, key)) {
        return { key, added: secondEl[key] };
      }

      if (!Object.prototype.hasOwnProperty.call(secondEl, key)) {
        return { key, removed: firstEl[key] };
      }

      return { key, updated: [firstEl[key], secondEl[key]] };
    });
  };

  return treeDifferenceBuilder(firstDoc, secondDoc);
};
