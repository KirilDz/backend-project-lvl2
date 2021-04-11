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

const getFullPath = (parents, key) => `${parents.concat(key).join('.')}`;

const formatToPlain = (nodes) => {
  const builder = (data, paths = []) => data.flatMap((el) => {
    switch (el.type) {
      case 'children':
        return builder(el.children, paths.concat(el.key));
      case 'added':
        return `Property '${getFullPath(paths, el.key)}' was added with value: ${formatValue(el.value)}`;
      case 'removed':
        return `Property '${getFullPath(paths, el.key)}' was removed`;
      case 'updated':
        return `Property '${getFullPath(paths, el.key)}' was updated. From ${formatValue(el.value1)} to ${formatValue(el.value2)}`;
      case 'same':
        return [];
      default:
        throw new Error(`Unknown type ${el.type}!`);
    }
  });

  return builder(nodes).join('\n');
};

export default formatToPlain;
