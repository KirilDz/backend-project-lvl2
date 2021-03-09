const spacesAmountCalculator = (level, spaces = 0, start = 1) => {
  const spaceCoefficient = 4;

  if (level < start) return spaces;
  return spacesAmountCalculator(level, spaces + spaceCoefficient, start + 1);
};

const spaceMaker = (level, isWithSign = false) => {
  const minusSign = isWithSign ? 2 : 0;
  const spacesAmount = spacesAmountCalculator(level) - minusSign;

  return ' '.repeat(spacesAmount);
};

const isObject = (data) => typeof data === 'object' && data !== null && !Array.isArray(data);

export {
  isObject,
  spaceMaker,
};
