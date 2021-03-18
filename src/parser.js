import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const extractData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  const format = path.extname(filepath).slice(1);
  return {
    data,
    format,
  };
};

export default (filepath) => {
  const { data, format } = extractData(filepath);
  switch (format) {
    case 'json':
      return JSON.parse(data, 'utf-8');
    case 'yml':
      return yaml.load(data, 'utf-8');
    default:
      return ini.parse(data, 'utf-8');
  }
};
