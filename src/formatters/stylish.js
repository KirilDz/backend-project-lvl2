import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(4 * depth - 2);

const formatValue = (value1, depth) => {
  if (!_.isPlainObject(value1)) {
    return `:${value1 === '' ? '' : ` ${value1}`}`;
  }

  return Object.entries(value1).flatMap(([key, value]) => {
      if (_.isPlainObject(value)) {
        const deepper = formatValue(value, depth + 1);
        return `\n${getIndent(depth + 1)}  ${key}: {${deepper}\n${getIndent(depth + 1)}  }`;
      }
      return `\n${getIndent(depth + 1)}  ${key}: ${value}`;
  }).join('\n');
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
        return `${getIndent(depth)}+ ${node.key}${formatValue(node.value, depth)}`;
      }
      case 'removed': {
        return `${getIndent(depth)}- ${node.key}${formatValue(node.value, depth)}`;
      }
      case 'same': {
        return `${getIndent(depth)}  ${node.key}${formatValue(node.value, depth)}`;
      }
      case 'updated': {
        const removed = `${getIndent(depth)}- ${node.key}${formatValue(node.value1, depth)}`;
        const added = `${getIndent(depth)}+ ${node.key}${formatValue(node.value2, depth)}`;
        return [removed, added];
      }
      default:
        throw new Error(`Unknown type ${node.type}`);
    }
  });

  return `{\n${builder(diffs).join('\n')}\n}`;
};

export default formatToStylish;
