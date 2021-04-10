import formatToPlain from './plain.js';
import formatToStylish from './stylish.js';

const format = (data, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return formatToPlain(data);
    case 'json':
      return JSON.stringify(data);
    case 'stylish':
      return formatToStylish(data);
    default:
      throw new Error(`Unknown formatter name ${formatterName}`);
  }
};

export default format;
