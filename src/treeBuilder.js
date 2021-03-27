import _ from 'lodash';

const treeDifferenceBuilder = (firstEl, secondEl) => {
  const mergeKeys = _.sortBy(_.union(Object.keys(firstEl), Object.keys(secondEl)));

  if (!mergeKeys.length) {
    return null;
  }

  return mergeKeys.map((key) => {
    if (!_.has(firstEl, key)) {
      return { key, type: 'added', value: secondEl[key] };
    }

    if (!_.has(secondEl, key)) {
      return { key, type: 'removed', value: firstEl[key] };
    }

    if (_.isPlainObject(firstEl[key]) && _.isPlainObject(secondEl[key])) {
      const children = treeDifferenceBuilder(firstEl[key], secondEl[key]);

      return { key, children };
    }

    if (!_.isEqual(firstEl[key], secondEl[key])) {
      return {
        key, type: 'updated', value1: firstEl[key], value2: secondEl[key],
      };
    }

    return { key, type: 'same', value: firstEl[key] };
  });
};

export default treeDifferenceBuilder;
