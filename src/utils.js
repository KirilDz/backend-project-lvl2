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

const splitObject = (doc) => {
    const builder = (data, parent = null, level = 1) => {
        return Object.keys(data).map(el => {
            if (isObject(data[el])) {
                const nextLevel = level + 1;
                const subParent = `${ el }`;
                const children = builder(data[el], subParent, nextLevel);

                return {
                    name: `${ el }`,
                    value: 'obj',
                    level,
                    parent: subParent,
                    children
                }
            } else {
                return {
                    name: `${ el }`,
                    value: `${ data[el] }`,
                    level: level,
                    parent
                }
            }
        });
    };

    return builder(doc);
};

const objectToString = (entity, level) => {

    const splitData = splitObject(entity);

    const builder = (data) => {
        return data.reduce((acc, el) => {
            if (Object.prototype.hasOwnProperty.call(el, 'children')) {
                const children = builder(el.children);
                acc += `\n${ spaceMaker(el.level + level) }${ el.name }: {${ children }\n${ spaceMaker(el.level + level) }}`;
                return acc;
            } else {
                acc += `\n${ spaceMaker(el.level + level) }${ el.name }: ${ el.value }`;
                return acc;
            }
        }, '');
    };
    return builder(splitData);
};

export {
    isObject,
    spaceMaker,
    objectToString
};
