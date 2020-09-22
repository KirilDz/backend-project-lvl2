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
    "host":"hexlet.io",
    "next": {
        "rating": 4
    }
}


export const dfs = (o1, o2) => {
    const uniqKeys = [...new Set([...Object.keys(o1), ...Object.keys(o2)])];
    console.log('This is the uniqKeys');
    console.log(uniqKeys)
    const data = uniqKeys.reduce((acc, el) => {
        if (isObject(o1[el]) && o2.hasOwnProperty(el)) {
            console.log(`this elements are: `)
            console.log(o1[el])
            console.log(o2[el])
            console.log('(=))))))))))))')
            const item = el;
            const recursion = dfs(o1[el], o2[el]);
            console.log(recursion)
            acc['equal']
                ? acc.equal.push({[item]: recursion})
                : acc['equal'] = [{[item]: recursion}];
        } else {
            if (o1[el] === o2[el]) {
                console.log('This elements are equal')
                const item = el;
                acc['equal']
                    ? acc.equal.push({[item]: o1[el]})
                    : acc['equal'] = [{[item]: o1[el]}];
                console.log(o1[el])
                console.log(o2[el])
            } else if (Object.prototype.hasOwnProperty.call(o1, el) && !Object.prototype.hasOwnProperty.call(o2, el)) {
                const item = el;
                acc['minus']
                    ? acc.minus.push({[item]: o1[el]})
                    : acc['minus'] = [{[item]: o1[el]}];
                console.log('First object has this prop but second doesn\'t');
                console.log(el)
            } else if (!Object.prototype.hasOwnProperty.call(o1, el) && Object.prototype.hasOwnProperty.call(o2, el)) {
                console.log('Second object has this prop but first doesn\'t');
                const item = el;
                acc['plus']
                    ? acc.minus.push({[item]: o2[el]})
                    : acc['plus'] = [{[item]: o2[el]}];
                console.log(el)
            }
        }
        return acc;
    }, {});

    return data;
}


console.log(dfs(obj1, obj2))

