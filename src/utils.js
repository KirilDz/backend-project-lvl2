const objectToString = (data, level) => {

    const outsideLevel = level;

    const temporary = {};

    const reducer = (data, level = 1) => {

        const keys = Object.keys(data);

        for (const key of keys) {
            temporary[key] = level ;
        }

        return keys.reduce((acc, el) => {

            if (typeof data[el] === 'object') {

                const children = reducer(data[el], level += 1);

                acc += `\n${spaceMaker(temporary[el] + outsideLevel)}${el}: {\n${children}\n${spaceMaker(temporary[el] + outsideLevel)}}`;

                return acc;
            }

            if (keys.length === 1) {
                acc += `${spaceMaker(temporary[el] + outsideLevel)}${el}: ${data[el]}`;
            }

            if (keys.indexOf(el) === keys.length - 1 && keys.length !== 1) {
                acc += `\n${spaceMaker(temporary[el] + outsideLevel)}${el}: ${data[el]}`;
            }

            return acc;
        }, '');

    }

    console.log(reducer(data))

    return temporary;
}

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

const isObject = data => typeof data === 'object' && data !== null;

export {
    isObject,
    objectToString,
    spaceMaker
};
