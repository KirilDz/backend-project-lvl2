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

const objectToString = (entity, level) => {
  const splitData = splitObject(entity);

  const builder = (data) => data.reduce((acc, el) => {
    if (_.has(el, 'children')) {
      const children = builder(el.children);
      acc += `\n${spaceMaker(el.level + level)}${el.name}: {${children}\n${spaceMaker(el.level + level)}}`;
      return acc;
    }
    acc += `\n${spaceMaker(el.level + level)}${el.name}: ${el.value}`;
    return acc;
  }, '');
  return builder(splitData);
};

const valueDefinition = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
};

const stringCreator = (values, key, value, prop) => {
  const valuesString = values.length > 0 ? `${values.join('.')}.${key}` : `${key}`;

  switch (prop) {
    case 'added':
      return `\nProperty '${valuesString}' was added with value: ${valueDefinition(value)}`;
    case 'removed':
      return `\nProperty '${valuesString}' was removed`;
    case 'updated':
      return `\nProperty '${valuesString}' was updated. From ${valueDefinition(value[0])} to ${valueDefinition(value[1])}`;
    default:
      break;
  }
  return '';
};

const stylishStringCreator = (level, isWithSign, key, value, sign) => {
  const diffValue = _.isPlainObject(value) ? `{${objectToString(value, level)}\n${spaceMaker(level)}}` : value;

  return `\n${spaceMaker(level, isWithSign)}${sign}${key}:${diffValue === '' ? '' : ` ${diffValue}`}`;
};

export {
  spaceMaker,
  objectToString,
  stringCreator,
  stylishStringCreator,
};
