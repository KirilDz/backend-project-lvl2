import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const mergeKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return mergeKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = buildDiff(obj1[key], obj2[key]);

      return { key, children, type: 'children' };
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, type: 'updated', value1: obj1[key], value2: obj2[key],
      };
    }

    return { key, type: 'same', value: obj1[key] };
  });
};

export default buildDiff;
