import {isObject, getChildren} from './src/utils.js'
import _ from 'lodash';

// const obj1 = {
//     "common": {
//         "setting1": "Value 1",
//         "setting2": 200,
//         "setting3": true,
//         "setting6": {
//             "key": "value",
//             "doge": {
//                 "wow": "too much"
//             }
//         }
//     },
//     "group1": {
//         "baz": "bas",
//         "foo": "bar",
//         "nest": {
//             "key": "value"
//         }
//     },
//     "group2": {
//         "abc": 12345,
//         "deep": {
//             "id": 45
//         }
//     }
// }
//
// const obj2 = {
//     "common": {
//         "follow": false,
//         "setting1": "Value 1",
//         "setting3": {
//             "key": "value"
//         },
//         "setting4": "blah blah",
//         "setting5": {
//             "key5": "value5"
//         },
//         "setting6": {
//             "key": "value",
//             "ops": "vops",
//             "doge": {
//                 "wow": "so much"
//             }
//         }
//     },
//
//     "group1": {
//         "foo": "bar",
//         "baz": "bars",
//         "nest": "str"
//     },
//
//     "group3": {
//         "fee": 100500,
//         "deep": {
//             "id": {
//                 "number": 45
//             }
//         }
//     }
// }


const obj1 = {
    "host":"hexlet.io",
    "timeout":50,
    "proxy":"123.234.53.22",
    "follow":false,
    "next": {
        "number": 5
    }
}


const obj2 = {
    "timeout":20,
    "verbose":true,
    "host":{
        name: 'hexlet.io'
    },
    "next": {
        "rating": 4
    }
}

const types = {
    sameValues: 0,
    changedValue: 1,
    treeValues: 2,
    added: 3,
    deleted: 4
}

const diffBuilder = (keyName, diff, value) => {
    return {
        keyName: keyName,
        difference: diff,
        value: value
    }
};

const dfs = (o1, o2) => {
    const allKeys = [...new Set([...Object.keys(o1), ...Object.keys(o2)])].sort();
    const data = allKeys.map(el => {
        if (Object.prototype.hasOwnProperty.call(o1, el) && Object.prototype.hasOwnProperty.call(o2, el)) {
            if (o1[el] === o2[el]) {
                return diffBuilder(el, types.sameValues, o1[el]);
            } else {
                if (isObject(o1[el]) && isObject(o2[el])) {
                    const recursion = dfs(o1[el], o2[el]);
                    return diffBuilder(el, types.treeValues, recursion);
                } else {
                    return diffBuilder(el, types.changedValue, [o1[el], o2[el]]);
                }
            }
        } else {
            if (Object.prototype.hasOwnProperty.call(o1, el)) {
                return diffBuilder(el, types.deleted, o1[el]);
            } else {
                return diffBuilder(el, types.added, o2[el]);
            }
        }
    });
    console.log(data)
    return data;
}

const data = dfs(obj1, obj2);

const transformObj = (obj) => {
    const entries = Object.entries(obj);
    const str = entries.reduce((acc, el) => {
        if (isObject(el[1])) {
            const recursion = transformObj(el[1]);
            acc += `  ${el[0]}: ${recursion}\n`;
        } else {
            acc += `  ${el[0]}: ${el[1]}\n`;
        }
        return acc;
    }, '');
    // console.log(`{\n${str}}`)
    return `{\n${str}}`;
};


const parser = (data) => {
    const string = data.reduce((acc, el) => {
        switch (el.difference) {
            case 0:
                acc += `\n   ${el.keyName}: ${isObject(el.value) ? transformObj(el.value) : el.value}`;
                break;
            case 1:
                acc += `\n - ${el.keyName}: ${isObject(el.value[0]) 
                    ? transformObj(el.value[0]) 
                    : el.value[0]}\n + ${el.keyName}: ${isObject(el.value[1]) ? transformObj(el.value[1]) : el.value[1] }`;
                break;
            case 2:
                const recursion = parser(el.value);
                acc += `\n   ${el.keyName}: {${recursion}\n}`;
                break;
            case 3:
                acc += `\n + ${el.keyName}: ${isObject(el.value) ? transformObj(el.value) : el.value}`;
                break;
            case 4:
                acc += `\n - ${el.keyName}: ${isObject(el.value) ? transformObj(el.value) : el.value}`;
                break;
        }
        return acc;
    }, '');
    // console.log(`{${string}\n}`)
    return `{${string}\n}`;
}


console.log(parser(data))



