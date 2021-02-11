const objectToString = (obj, level) => {
    if (typeof obj !== 'object') {
        return obj;
    }
    const deeperLevel = level + 1;
    const keys = Object.keys(obj);
    const toStr = keys.reduce((acc, el) => {
        acc += `${ el }: ${ obj[el] }`;
        return acc;
    }, '');
    return `{\n${ spaceMaker(deeperLevel) }${ toStr }\n${ spaceMaker(level) }}`;
};

const spacesAmountCalculator = (level, spaces = 0, start = 0) => {
    const spaceCoefficient = 4;

    if (level === start) return spaces;
    return spacesAmountCalculator(level, spaces + spaceCoefficient, start + 1);
};

const spaceMaker = (level, isWithSign = false) => {
    const minusSign = isWithSign ? 2 : 0;
    const spacesAmount = spacesAmountCalculator(level) - minusSign;

    return ' '.repeat(spacesAmount);
};

export {
    objectToString,
    spaceMaker
};
