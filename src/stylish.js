import { spaceMaker, objectToString, isObject } from "./utils.js";

export const stylish = (data) => {

    // гемор в обжект опенед, с переносом на новую строку

    const firstLevelElements = data.map(el => el.key);

    const builder = (data, level = 1) => {

        return data.reduce((acc, el) => {

            if (el.hasOwnProperty('children')) {

                const nextLevel = firstLevelElements.includes(el.key) ? 2 : level + 1; // уровень с короторым будет вызываться рекурсия

                const currentLevel = firstLevelElements.includes(el.key) ? 1 : level; // текущий уровень для елемента с рекурсией

                const innerData = builder(el.children, nextLevel);

                acc += `\n${ spaceMaker(currentLevel) }${ el.key }: {${ innerData }\n${ spaceMaker(currentLevel) }}`;

                return acc;
            }

            if (el.hasOwnProperty('added')) {

                const diffValue = isObject(el.added) ? `{\n${objectToString(el.added, level)}\n${spaceMaker(level)}}` : el.added;

                acc += `\n${ spaceMaker(level, true) }+ ${ el.key }: ${ diffValue }`;

                return acc;
            }

            if (el.hasOwnProperty('removed')) {

                const diffValue = isObject(el.removed) ? `{\n${objectToString(el.removed, level)}\n${spaceMaker(level)}}` : el.removed;

                acc += `\n${ spaceMaker(level, true) }- ${ el.key }: ${ diffValue }`;

                return acc;
            }

            if (el.hasOwnProperty('same')) {

                const diffValue = isObject(el.same) ? `{\n${objectToString(el.same, level)}\n${spaceMaker(level)}}` : el.same;

                acc += `\n${spaceMaker(level)}${el.key}: ${diffValue}`;

                return acc;
            }

            if (el.hasOwnProperty('updated')) {

                const firstDiffValue = isObject(el.updated[0]) ? `{\n${objectToString(el.updated[0], level)}\n${spaceMaker(level)}}` : el.updated[0];
                const secondDiffValue = isObject(el.updated[1]) ? `{\n${objectToString(el.updated[1], level)}\n${spaceMaker(level)}}` : el.updated[1];

                acc += `\n${ spaceMaker(level, true) }- ${ el.key }: ${ firstDiffValue }\n${ spaceMaker(level, true) }+ ${ el.key }: ${ secondDiffValue } `;

            }

            return acc;
        }, '');
    };

    const result = builder(data);

    return `{${result}\n}`;
};


//     return diffData.reduce((acc, el) => {
//
//         const headElement = el.el;
//         const headLevel = levels[headElement];
//
//         const innerData = el.recursion.reduce((acc, el) => {
//             // working with recursion data
//             if (Object.keys(el).includes('el') && Object.keys(el).includes('recursion')) {
//
//                 const recursionData = stylish([el]);
//
//                 acc += `${ recursionData }`;
//
//                 return acc;
//             }
//
//             const value = Object.keys(el).join();
//             const diffData = Object.values(el).flat();
//             const innerValueLevel = levels[headElement];
//
// // this is if objects has different data
//             if (diffData.length === 2) {
//                 const firstElement = diffData[0];
//                 const secondElement = diffData[1];
//
// // this is if value has been deleted or added
//                 if (firstElement === null || secondElement === null) {
//
//                     const elementWithValue = firstElement || secondElement;
//
//                     const renderElementWithValue = typeof elementWithValue === 'object' ? objectToString(elementWithValue, innerValueLevel) : elementWithValue;
//
//                     const diffElementSign = firstElement === null ? '+' : '-';
//
//                     acc += `\n${ spaceMaker(innerValueLevel, true) }${ diffElementSign } ${ value }: ${ renderElementWithValue }`;
//
//                 } else {
// // this is if value has been modified
//                     const renderFirstElement = typeof firstElement === 'object' ? objectToString(firstElement, innerValueLevel) : firstElement;
//                     const renderSecondElement = typeof secondElement === 'object' ? objectToString(secondElement, innerValueLevel) : secondElement;
//
//                     acc += `\n${ spaceMaker(innerValueLevel, true) }- ${ value }: ${ renderFirstElement }\n${ spaceMaker(innerValueLevel, true) }+ ${ value }: ${ renderSecondElement }`;
//                 }
//             }
//
// // this is if both object has the same value
//             if (diffData.length === 1) {
//                 acc += `\n${ spaceMaker(innerValueLevel) }${ diffData[0] }`;
//             }
//
//             return acc;
//         }, '');
//
//         acc += `\n${ spaceMaker(headLevel) }${ headElement }: {${ innerData }\n${ spaceMaker(headLevel) }}`;
//
//         return acc;
//     }, '');
