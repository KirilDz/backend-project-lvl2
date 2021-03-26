import _ from 'lodash';
import { stringCreator } from '../utils.js';

const valueDefinition = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
};

// const formatToPlain = (entity) => {
//   const builder = (data, parents = []) => data.reduce((acc, el) => {
//
//     if (_.has(el, 'children')) {
//       const newParents = parents.concat(el.key);
//       const children = builder(el.children, newParents);
//       acc += children;
//     }
//     if (el.type === 'added') {
//       const valuesString = parents.length > 0 ? `${parents.join('.')}.${el.key}` : `${el.key}`;
//       acc += `\nProperty '${valuesString}' was added with value: ${valueDefinition(el.value)}`;
//     }
//     if (el.type === 'removed') {
//       const valuesString = parents.length > 0 ? `${parents.join('.')}.${el.key}` : `${el.key}`;
//       acc += `\nProperty '${valuesString}' was removed`;
//     }
//     if (el.type === 'updated') {
//       const valuesString = parents.length > 0 ? `${parents.join('.')}.${el.key}` : `${el.key}`;
//       acc += `\nProperty '${valuesString}' was updated. From ${valueDefinition(el.value1)} to ${valueDefinition(el.value2)}`;
//     }
//
//     return acc;
//   }, '');
//   return `${builder(entity)}\n`;
// };

const formatToPlain = (entity) => {
  const builder = (data, parents = []) => data.map((el) => {

    if (_.has(el, 'children')) {
      const newParents = parents.concat(el.key);
      return builder(el.children, newParents);
    }
    if (el.type === 'added') {
      const valuesString = parents.length > 0 ? `${parents.join('.')}.${el.key}` : `${el.key}`;
      return `\nProperty '${valuesString}' was added with value: ${valueDefinition(el.value)}`;
    }
    if (el.type === 'removed') {
      const valuesString = parents.length > 0 ? `${parents.join('.')}.${el.key}` : `${el.key}`;
      return`\nProperty '${valuesString}' was removed`;
    }
    if (el.type === 'updated') {
      const valuesString = parents.length > 0 ? `${parents.join('.')}.${el.key}` : `${el.key}`;
      return `\nProperty '${valuesString}' was updated. From ${valueDefinition(el.value1)} to ${valueDefinition(el.value2)}`;
    }

    return '+';
  });

  console.log(builder(entity))

  return builder(entity).join(' ');
};

export default formatToPlain;
