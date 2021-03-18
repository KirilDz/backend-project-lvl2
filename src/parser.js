import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const readFile = filepath => path.resolve(filepath);

const adsf = (filepath) => {
  const fullPath = readFile(filepath);
  const file = fs.readFileSync(fullPath);
  const data = JSON.parse(file, 'utf-8');
  console.log(data);
}

console.log(adsf('__fixtures__/file1.json'))

// export default (filepath1) => {
//   const extensions = {
//     json: (filePath) => JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8')),
//     yml: (filePath) => yaml.load(fs.readFileSync(path.resolve(filePath), 'utf-8')),
//     ini: (filePath) => ini.parse(fs.readFileSync(path.resolve(filePath), 'utf-8')),
//   };
//
//   const filesExtension = path.extname(filepath1).slice(1);
//
//   return Object.prototype.hasOwnProperty.call(extensions, filesExtension)
//       ? extensions[filesExtension](filepath1)
//       : null;
// };


