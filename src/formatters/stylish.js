import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(4 * depth - 2);

const formatValue = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }

  const result = Object.entries(data).flatMap(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${formatValue(value, depth + 1)}`);

  return `{\n${result.join('\n')}\n${getIndent(depth)}  }`;
};

const formatToStylish = (diffs) => {
  const builder = (nodes, depth = 1) => nodes.flatMap((node) => {
    switch (node.type) {
      case 'children': {
        const innerData = builder(node.children, depth + 1).join('\n');

        return `${getIndent(depth)}  ${node.key}: {\n${innerData}\n${getIndent(depth)}  }`;
      }
      case 'added': {
        return `${getIndent(depth)}+ ${node.key}: ${formatValue(node.value, depth)}`;
      }
      case 'removed': {
        return `${getIndent(depth)}- ${node.key}: ${formatValue(node.value, depth)}`;
      }
      case 'same': {
        return `${getIndent(depth)}  ${node.key}: ${formatValue(node.value, depth)}`;
      }
      case 'updated': {
        const removed = `${getIndent(depth)}- ${node.key}: ${formatValue(node.value1, depth)}`;
        const added = `${getIndent(depth)}+ ${node.key}: ${formatValue(node.value2, depth)}`;
        return [removed, added];
      }
      default:
        throw new Error(`Unknown type ${node.type}`);
    }
  });

  return `{\n${builder(diffs).join('\n')}\n}`;
};

export default formatToStylish;