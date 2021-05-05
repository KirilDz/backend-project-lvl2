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

const getFullPath = (paths, key) => `${paths.concat(key).join('.')}`;

const formatToPlain = (nodes) => {
  const builder = (diffs, paths = []) => diffs.flatMap((node) => {
    switch (node.type) {
      case 'children':
        return builder(node.children, paths.concat(node.key));
      case 'added':
        return `Property '${getFullPath(paths, node.key)}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${getFullPath(paths, node.key)}' was removed`;
      case 'updated':
        return `Property '${getFullPath(paths, node.key)}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'same':
        return [];
      default:
        throw new Error(`Unknown type ${node.type}!`);
    }
  });

  return builder(nodes).join('\n');
};

export default formatToPlain;
