import {parse} from './src/parsers'

export default (filepath1, filepath2) => {

  const file1 = parse(filepath1);
  const file2 = parse(filepath2);

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
  return `{\n${diff.join((''))}}`;
};
