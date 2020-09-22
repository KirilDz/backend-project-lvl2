import { dfs } from '../train.js';
import {isObject} from "./utils.js";

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

const result = dfs(obj1, obj2);

console.log(result)

const output = (data) => {

    const { equal, minus, plus } = data;

    console.log(equal);
    console.log(minus);
    console.log(plus);

    return equal.map(el => {
        const item = Object.keys(el).sort();
        if (isObject(el[item])) {
            output(el[item]);
        } else {
            el[item];
        }
    });
}

// output(result)
console.log(output(result))
