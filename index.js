import path from 'path';
import fs from 'fs';

export default (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2), 'utf-8'));

  const concatedKeys = [...Object.keys(file1).sort(), ...Object.keys(file2).sort()];

  const uniqKeys = [...new Set(concatedKeys)];

  const diff = uniqKeys.map((el) => {
    if (Object.prototype.hasOwnProperty.call(file1, el)
        && Object.prototype.hasOwnProperty.call(file2, el)) {
      return file1[el] === file2[el]
        ? `   ${el}: ${file1[el]}\n`
        : ` - ${el}: ${file1[el]}\n + ${el}: ${file2[el]}\n`;
    } if (!Object.prototype.hasOwnProperty.call(file1, el)) {
      return ` + ${el}: ${file2[el]}\n`;
    }
    return ` - ${el}: ${file1[el]}\n`;
  });

  console.log(`{\n${diff.join((''))}}`);
};
