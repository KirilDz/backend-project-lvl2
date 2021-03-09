import { spaceMaker, objectToString, isObject } from "./utils.js";

export const stylish = (data) => {

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

                const diffValue = isObject(el.added) ? `{${objectToString(el.added, level)}\n${spaceMaker(level)}}` : el.added;

                acc += `\n${ spaceMaker(level, true) }+ ${ el.key }: ${ diffValue }`;

                return acc;
            }

            if (el.hasOwnProperty('removed')) {

                const diffValue = isObject(el.removed) ? `{${objectToString(el.removed, level)}\n${spaceMaker(level)}}` : el.removed;

                acc += `\n${ spaceMaker(level, true) }- ${ el.key }: ${ diffValue }`;

                return acc;
            }

            if (el.hasOwnProperty('same')) {

                const diffValue = isObject(el.same) ? `{${objectToString(el.same, level)}\n${spaceMaker(level)}}` : el.same;

                acc += `\n${spaceMaker(level)}${el.key}: ${diffValue}`;

                return acc;
            }

            if (el.hasOwnProperty('updated')) {

                const firstDiffValue = isObject(el.updated[0]) ? `{${objectToString(el.updated[0], level)}\n${spaceMaker(level)}}` : el.updated[0];
                const secondDiffValue = isObject(el.updated[1]) ? `{${objectToString(el.updated[1], level)}\n${spaceMaker(level)}}` : el.updated[1];

                acc += `\n${ spaceMaker(level, true) }- ${ el.key }: ${ firstDiffValue }\n${ spaceMaker(level, true) }+ ${ el.key }: ${ secondDiffValue } `;

            }

            return acc;
        }, '');
    };

    const result = builder(data);

    return `{${result}\n}`;
};
