import _ from 'lodash';

const valueDefinition = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
};

const parentsToString = (parents, key) => (parents.length > 0 ? `${parents.join('.')}.${key}` : `${key}`);

const formatToPlain = (entity) => {
  const builder = (data, parents = []) => data.flatMap((el) => {
    if (_.has(el, 'children')) {
      const newParents = parents.concat(el.key);
      return builder(el.children, newParents);
    }
    if (el.type === 'added') {
      return `\nProperty '${parentsToString(parents, el.key)}' was added with value: ${valueDefinition(el.value)}`;
    }
    if (el.type === 'removed') {
      return `\nProperty '${parentsToString(parents, el.key)}' was removed`;
    }
    if (el.type === 'updated') {
      return `\nProperty '${parentsToString(parents, el.key)}' was updated. From ${valueDefinition(el.value1)} to ${valueDefinition(el.value2)}`;
    }

    return '';
  });

  return builder(entity).join('');
};

export default formatToPlain;
