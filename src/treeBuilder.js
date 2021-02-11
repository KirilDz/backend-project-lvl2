export const levels = {};

export const treeDifferenceBuilder = (obj1, obj2, level = 1) => {

    const mergeKeys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

    return mergeKeys.map((el) => {
        if (typeof obj1[el] === 'object' && typeof obj2[el] === 'object') {
            const nextLevelMergeKeys = [...new Set([...Object.keys(obj1[el]), ...Object.keys(obj2[el])])].sort();

            if (Object.keys(levels).length === 0) {
                levels[el] = {
                    keys: nextLevelMergeKeys,
                    parentLevelKeys: mergeKeys,
                    level,
                    innerDataLevel: level + 1,
                };
            }

            for (const item of Object.keys(levels)) {

                if (levels[item].keys.includes(el)) {
                    const parentlevel = levels[item].level + 1;
                    levels[el] = {
                        keys: nextLevelMergeKeys,
                        parentLevelKeys: mergeKeys,
                        level: parentlevel,
                        innerDataLevel: parentlevel + 1,
                    };
                }

                if (levels[item].parentLevelKeys.includes(el)) {
                    levels[el] = {
                        keys: nextLevelMergeKeys,
                        parentLevelKeys: mergeKeys,
                        level: levels[item].level,
                        innerDataLevel: level + 1,
                    };
                }
            }

            const recursion = treeDifferenceBuilder(obj1[el], obj2[el]);
            return { el, recursion };
        }

        if (obj1[el] === obj2[el]) {
            return { [el]: `${ [el] }: ${ obj1[el] }` };
        }

        if (obj1[el] !== obj2[el]) {
            if (typeof obj1[el] === 'undefined' || typeof obj2[el] === 'undefined') {
                const data1 = typeof obj1[el] === 'undefined'
                    ? null
                    : typeof obj1[el] === 'object' && obj2[el] !== null
                        ? obj1[el]
                        : `${ obj1[el] }`;

                const data2 = typeof obj2[el] === 'undefined'
                    ? null
                    : typeof obj2[el] === 'object' && obj2[el] !== null
                        ? obj2[el]
                        : `${ obj2[el] }`;

                return { [el]: [data1, data2] };
            }

            const data1 = typeof obj1[el] === 'object' && obj2[el] !== null ? obj1[el] : `${ obj1[el] }`;

            const data2 = typeof obj2[el] === 'object' && obj2[el] !== null ? obj2[el] : `${ obj2[el] }`;

            return { [el]: [data1, data2] };
        }
    });
};



