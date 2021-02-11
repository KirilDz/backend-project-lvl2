import { spaceMaker, objectToString } from "./utils.js";
import { levels } from "./treeBuilder.js";

export const stylish = (data) => {

    return data.reduce((acc, el) => {

        const headElement = el.el;
        const headLevel = levels[headElement].level;

        const innerData = el.recursion.reduce((acc, el) => {
            // working with recursion data
            if (Object.keys(el).includes('el') && Object.keys(el).includes('recursion')) {

                const recursionData = stylish([el]);

                acc += `${ recursionData }`;

                return acc;
            }

            const value = Object.keys(el).join();
            const diffData = Object.values(el).flat();
            const innerValueLevel = levels[headElement].innerDataLevel;

// this is if objects has different data
            if (diffData.length === 2) {
                const firstElement = diffData[0];
                const secondElement = diffData[1];

// this is if value has been deleted or added
                if (firstElement === null || secondElement === null) {

                    const elementWithValue = firstElement || secondElement;

                    const renderElementWithValue = typeof elementWithValue === 'object' ? objectToString(elementWithValue, innerValueLevel) : elementWithValue;

                    const diffElementSign = firstElement === null ? '+' : '-';

                    acc += `\n${ spaceMaker(innerValueLevel, true) }${ diffElementSign } ${ value }: ${ renderElementWithValue }`;

                } else {
// this is if value has been modified
                    const renderFirstElement = typeof firstElement === 'object' ? objectToString(firstElement, innerValueLevel) : firstElement;
                    const renderSecondElement = typeof secondElement === 'object' ? objectToString(secondElement, innerValueLevel) : secondElement;

                    acc += `\n${ spaceMaker(innerValueLevel, true) }- ${ value }: ${ renderFirstElement }\n${ spaceMaker(innerValueLevel, true) }+ ${ value }: ${ renderSecondElement }`;
                }
            }

// this is if both object has the same value
            if (diffData.length === 1) {
                acc += `\n${ spaceMaker(innerValueLevel) }${ diffData[0] }`;
            }

            return acc;
        }, '');

        acc += `\n${ spaceMaker(headLevel) }${ headElement }: {${ innerData }\n${ spaceMaker(headLevel) }}`;

        return acc;
    }, '');
};


