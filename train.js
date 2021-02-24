import { spaceMaker, objectToString, isObject } from "./src/utils.js";

const obj = {
    deep: {
        id: {
            number: 45,
            cucumber: {
                isVegatable: true
            }
        },
        next: {
            isTrue: false
        }
    },
    fee: 100500,
    mono: true,
    fixed: 'adfasdf',
    oneMore: {
        andOneMore: {
            last: 0
        }
    },
    stat: {
        info: false
    }
};

const obj2 = {
    abc: 12345,
    deep: {
        id: 45
    }
}

const splitObj = (obj, parent = null, level = 1) => {

    console.log(Object.keys(obj), level, parent);

    return Object.keys(obj).map(el => {

        const itemDescription = {};

        itemDescription['name'] = el;
        itemDescription['parent'] = parent;
        itemDescription['level'] = level;
        itemDescription['value'] = isObject(obj[el]) ? 'obj' : obj[el];

        if (isObject(obj[el])) {
            // трабла тут в том, что при переходе на второй уровень, я его считаю как первый, потому что стоит проверка на null нужно обойти это
            const children = splitObj(obj[el], el, parent ? level += 1 : 1);
            itemDescription['children'] = children;

            return itemDescription;
        }

        return itemDescription;

    });
}

console.log(splitObj(obj)[0].children[0])







