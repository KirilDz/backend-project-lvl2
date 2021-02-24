import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filepath1, filepath2) => {
  const extensions = {
    json: (filePath) => JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8')),
    yml: (filePath) => yaml.load(fs.readFileSync(path.resolve(filePath), 'utf-8')),
    ini: (filePath) => ini.parse(fs.readFileSync(path.resolve(filePath), 'utf-8')),
  };

  const filesExtensions = [path.extname(filepath1).slice(1), path.extname(filepath2).slice(1)];
  const filesPath = [filepath1, filepath2];

  return filesExtensions.map((el, index) => (Object.prototype.hasOwnProperty.call(extensions, el)
    ? extensions[el](filesPath[index])
    : null));
};
