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

const objectToString = (obj, level) => {
  const iter = (cur, depth) => Object.entries(cur).flatMap(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const deepper = iter(value, depth + 1).join('\n');
      return `${spaceMaker(depth + level)}${ key }: {\n${ deepper }\n${spaceMaker(depth + level)}}`;
    }
    const elem = `${spaceMaker(depth + level)}${ key }: ${ value }`;
    return elem;
  });

  const result = iter(obj, 1).join('\n');
  return result;
};

const stylishStringCreator = (level, isWithSign, key, value, sign) => {
  const diffValue = _.isPlainObject(value) ? `{\n${objectToString(value, level)}\n${spaceMaker(level)}}` : value;

  return `${spaceMaker(level, isWithSign)}${sign}${key}:${diffValue === '' ? '' : ` ${diffValue}`}`;
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
      case 'added':
        return stylishStringCreator(level, true, el.key, el.value, '+ ');
      case 'removed':
        return stylishStringCreator(level, true, el.key, el.value, '- ');
      case 'same':
        return stylishStringCreator(level, false, el.key, el.value, '');
      case 'updated':
        return `${stylishStringCreator(level, true, el.key, el.value1, '- ')}\n${stylishStringCreator(level, true, el.key, el.value2, '+ ')}`;
      default:
        throw new Error(`Unknown type ${el.type}`);
    }
  });

  return `{\n${builder(entity).join('\n')}\n}`;
};

export default formatToStylish;
