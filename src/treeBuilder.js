import { isObject } from "./utils.js";

export const treeDifferenceBuilder = (firstEl, secondEl) => {

    const mergeKeys = [...new Set([...Object.keys(firstEl), ...Object.keys(secondEl)])].sort();

    return mergeKeys.map((key) => {

        if (isObject(firstEl[key]) && isObject(secondEl[key])) {

            const children = treeDifferenceBuilder(firstEl[key], secondEl[key]);

            return { key, children };
        }

        if (firstEl[key] === secondEl[key]) {

            return { key, same: firstEl[key] };
        } else {

            if (!firstEl.hasOwnProperty(key)) {

                return { key, added: secondEl[key] };
            }

            if (!secondEl.hasOwnProperty(key)) {

                return { key, removed: firstEl[key] };
            } else {

                return { key, updated: [firstEl[key], secondEl[key]] };
            }

        }
    });
};


