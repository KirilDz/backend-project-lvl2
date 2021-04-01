import _ from 'lodash';

const splitObject = (doc) => {
  const builder = (data, parent = null, level = 1) => Object.keys(data).map((el) => {
    if (_.isPlainObject(data[el])) {
      const nextLevel = level + 1;
      const subParent = `${el}`;
      const children = builder(data[el], subParent, nextLevel);

      return {
        name: `${el}`,
        value: 'obj',
        level,
        parent: subParent,
        children,
      };
    }
    return {
      name: `${el}`,
      value: `${data[el]}`,
      level,
      parent,
    };
  });

  return builder(doc);
};

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

const objectToString = (entity, level) => {
  const splitData = splitObject(entity);

  const builder = (data) => data.flatMap((el) => {
    if (el.value === 'obj') {
      const children = builder(el.children);
      return `\n${spaceMaker(el.level + level)}${el.name}: {${children}\n${spaceMaker(el.level + level)}}`;
    }
    return `\n${spaceMaker(el.level + level)}${el.name}: ${el.value}`;
  });

  return builder(splitData).join(' ');
};

const stylishStringCreator = (level, isWithSign, key, value, sign) => {
  const diffValue = _.isPlainObject(value) ? `{${objectToString(value, level)}\n${spaceMaker(level)}}` : value;

  return `\n${spaceMaker(level, isWithSign)}${sign}${key}:${diffValue === '' ? '' : ` ${diffValue}`}`;
};

const formatToStylish = (entity) => {
  const firstLevelElements = entity.map((el) => el.key);

  const builder = (data, level = 1) => data.flatMap((el) => {
    switch (el.type) {
      case 'children': {
        const nextLevel = firstLevelElements.includes(el.key) ? 2 : level + 1;
        const currentLevel = firstLevelElements.includes(el.key) ? 1 : level;
        const innerData = builder(el.children, nextLevel);

        return `\n${spaceMaker(currentLevel)}${el.key}: {${innerData}\n${spaceMaker(currentLevel)}}`;
      }
      case 'added':
        return stylishStringCreator(level, true, el.key, el.value, '+ ');
      case 'removed':
        return stylishStringCreator(level, true, el.key, el.value, '- ');
      case 'same':
        return stylishStringCreator(level, false, el.key, el.value, '');
      case 'updated':
        return `${stylishStringCreator(level, true, el.key, el.value1, '- ')}${stylishStringCreator(level, true, el.key, el.value2, '+ ')}`;
      default:
        throw new Error(`Unknown type ${el.type}`);
    }
  });

  return `{${builder(entity).join(' ')}\n}\n`;
};

export default formatToStylish;
