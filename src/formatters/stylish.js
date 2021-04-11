import _ from 'lodash';

const spacesAmountCalculator = (level, spaces = 0, start = 1) => {
  const spaceCoefficient = 4;

  if (level < start) return spaces;
  return spacesAmountCalculator(level, spaces + spaceCoefficient, start + 1);
};

const spaceMaker = (level, isWithSign = false) => {
  const minusSign = isWithSign ? 2 : 0;
  const spacesAmount = spacesAmountCalculator(level) - minusSign;

  return ' '.repeat(spacesAmount);
};

const formatValue = (key1, value1, level, sign) => {
  const objectToString = (cur, depth) => Object.entries(cur).flatMap(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const deepper = objectToString(value, depth + 1).join('\n');
      return `${spaceMaker(depth + level)}${key}: {\n${deepper}\n${spaceMaker(depth + level)}}`;
    }
    return `${spaceMaker(depth + level)}${key}: ${value}`;
  });

  const valueToString = `${spaceMaker(level)}${sign}${key1}:${value1 === '' ? '' : ` ${value1}`}`;

  return _.isPlainObject(value1) ? `${spaceMaker(level)}${sign}${key1}: {\n${objectToString(value1, level).join('\n')}\n${spaceMaker(level)}}` : valueToString;
};

const formatToStylish = (entity) => {
  const firstLevelElements = entity.map((el) => el.key);

  const builder = (data, level = 1) => data.flatMap((el) => {
    switch (el.type) {
      case 'children': {
        const nextLevel = firstLevelElements.includes(el.key) ? 2 : level + 1;
        const currentLevel = firstLevelElements.includes(el.key) ? 1 : level;
        const innerData = builder(el.children, nextLevel).join('\n');

        return `${spaceMaker(currentLevel)}${el.key}: {\n${innerData}\n${spaceMaker(currentLevel)}}`;
      }
      case 'added': {
        return `${formatValue(el.key, el.value, level, '+ ')}`;
      }
      case 'removed': {
        return `${formatValue(el.key, el.value, level, '- ')}`;
      }
      case 'same':
        return `${formatValue(el.key, el.value, level, '- ')}`;
      case 'updated':
        return `${formatValue(el.key, el.value, level, '- ')}\n${formatValue(el.key, el.value2, level, '+ ')}`;
      default:
        throw new Error(`Unknown type ${el.type}`);
    }
  });

  return `{\n${builder(entity).join('\n')}\n}`;
};

export default formatToStylish;
