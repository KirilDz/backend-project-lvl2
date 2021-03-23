import lodash from 'lodash';

const treeDifferenceBuilder = (firstEl, secondEl) => {
  const mergeKeys = lodash.sortBy(lodash.union(Object.keys(firstEl), Object.keys(secondEl)));

  if (!mergeKeys.length) {
    return null;
  }

  return mergeKeys.map((key) => {
    if (!lodash.has(firstEl, key)) {
      return { key, type: 'added', value: secondEl[key] };
    }

    if (!lodash.has(secondEl, key)) {
      return { key, type: 'removed', value: firstEl[key] };
    }

    if (lodash.isPlainObject(firstEl[key]) && lodash.isPlainObject(secondEl[key])) {
      const children = treeDifferenceBuilder(firstEl[key], secondEl[key]);

      return { key, children };
    }

    if (firstEl[key] !== secondEl[key]) {
      return { key, type: 'updated', value: [firstEl[key], secondEl[key]] };
    }

    return { key, type: 'same', value: firstEl[key] };
  });
};

export default treeDifferenceBuilder;
