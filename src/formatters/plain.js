const formatValue = (value) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const parentsToString = (parents, key) => `${parents.concat(key).join('.')}`;

const formatToPlain = (entity) => {
  const builder = (data, parents = []) => data.flatMap((el) => {
    switch (el.type) {
      case 'children': {
        const newParents = parents.concat(el.key);
        return builder(el.children, newParents);
      }
      case 'added':
        return `Property '${parentsToString(parents, el.key)}' was added with value: ${formatValue(el.value)}`;
      case 'removed':
        return `Property '${parentsToString(parents, el.key)}' was removed`;
      case 'updated':
        return `Property '${parentsToString(parents, el.key)}' was updated. From ${formatValue(el.value1)} to ${formatValue(el.value2)}`;
      case 'same':
        return [];
      default:
        throw new Error(`Unknown type ${el.type}!`);
    }
  });

  return `${builder(entity).join('\n')}\n`;
};

export default formatToPlain;
