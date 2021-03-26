import yaml from 'js-yaml';
import ini from 'ini';

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'ini':
      return ini.parse(data);
    default:
      return {};
  }
};

export default parser;
