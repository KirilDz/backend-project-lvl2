import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(4 * depth - 2);

const formatValue = (key1, value1, depth) => {
  if (!_.isPlainObject(value1)) {
    return `${key1}:${value1 === '' ? '' : ` ${value1}`}`;
  }

  const objectToString = (cur, objectDepth) => Object.entries(cur).flatMap(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const deepper = objectToString(value, objectDepth + 1).join('\n');
      return `${getIndent(depth + objectDepth)}  ${key}: {\n${deepper}\n${getIndent(depth + objectDepth)}  }`;
    }
    return `${getIndent(depth + objectDepth)}  ${key}: ${value}`;
  });

  return `${key1}: {\n${objectToString(value1, 1).join('\n')}\n${getIndent(depth)}  }`;
};

const formatToStylish = (diffs) => {
  const firstLevelElements = diffs.map((el) => el.key);

  const builder = (nodes, depth = 1) => nodes.flatMap((node) => {
    switch (node.type) {
      case 'children': {
        const nextLevel = firstLevelElements.includes(node.key) ? 2 : depth + 1;
        const currentLevel = firstLevelElements.includes(node.key) ? 1 : depth;
        const innerData = builder(node.children, nextLevel).join('\n');

        return `${getIndent(currentLevel)}  ${node.key}: {\n${innerData}\n${getIndent(currentLevel)}  }`;
      }
      case 'added': {
        return `${getIndent(depth)}+ ${formatValue(node.key, node.value, depth)}`;
      }
      case 'removed': {
        return `${getIndent(depth)}- ${formatValue(node.key, node.value, depth)}`;
      }
      case 'same': {
        return `${getIndent(depth)}  ${formatValue(node.key, node.value, depth)}`;
      }
      case 'updated': {
        const removed = `${getIndent(depth)}- ${formatValue(node.key, node.value1, depth)}`;
        const added = `${getIndent(depth)}+ ${formatValue(node.key, node.value2, depth)}`;
        return [removed, added];
      }
      default:
        throw new Error(`Unknown type ${node.type}`);
    }
  });

  return `{\n${builder(diffs).join('\n')}\n}`;
};

export default formatToStylish;
