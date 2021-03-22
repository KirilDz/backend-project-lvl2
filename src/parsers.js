import yaml from 'js-yaml';
import ini from 'ini';

export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data, 'utf-8');
    case 'yml':
      return yaml.load(data, 'utf-8');
    default:
      return ini.parse(data, 'utf-8');
  }
};
