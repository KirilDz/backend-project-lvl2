export default (data1, data2) => {
  const mergeKeys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const reducer = mergeKeys.reduce((acc, el) => {
    if (Object.prototype.hasOwnProperty.call(data1, el)
        && Object.prototype.hasOwnProperty.call(data2, el)) {
      if (data1[el] === data2[el]) {
        acc[el] = `    ${el}: ${data1[el]}\n`;
      } else {
        acc[el] = `  - ${el}: ${data1[el]}\n  + ${el}: ${data2[el]}\n`;
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(data1, el)
          && !Object.prototype.hasOwnProperty.call(data2, el)) {
        acc[el] = `  - ${el}: ${data1[el]}\n`;
      }
      if (!Object.prototype.hasOwnProperty.call(data1, el)
          && Object.prototype.hasOwnProperty.call(data2, el)) {
        acc[el] = `  + ${el}: ${data2[el]}\n`;
      }
    }

    return acc;
  }, {});
  const prop = Object.values(reducer);
  const output = prop.reduce((acc, el) => acc += el, '');
  console.log(`{\n${output}}`);
  return `{\n${output}}`;
};
