export default (data1, data2) => {
  const concatedKeys = [...Object.keys(data1).sort(), ...Object.keys(data2).sort()];
  const uniqKeys = [...new Set(concatedKeys)];

  return uniqKeys.map((el) => {
    if (Object.prototype.hasOwnProperty.call(data1, el)
            && Object.prototype.hasOwnProperty.call(data2, el)) {
      return data1[el] === data2[el]
        ? `   ${el}: ${data1[el]}\n`
        : ` - ${el}: ${data1[el]}\n + ${el}: ${data2[el]}\n`;
    } if (!Object.prototype.hasOwnProperty.call(data1, el)) {
      return ` + ${el}: ${data2[el]}\n`;
    }

    return ` - ${el}: ${data1[el]}\n`;
  });
};
