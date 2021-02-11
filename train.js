

const obj = {
    "deep": {
        "id": {
            "number": 45
        },
        "routes": {
            "http": 'www.google.com',
            "status": false,
            "request": {
                "info": true
            }
        }
    },
    "fee": 100500
};

const temporary = {};

const objToString = (data, level = 1) => {
    const keys = Object.keys(data);
    for (const key of keys) {

        temporary[key] = level ;

    }
    return keys.reduce((acc, el) => {
        if (typeof data[el] === 'object') {
            const children = objToString(data[el], level += 1);
            acc += `\n${el}: ${children}`;
            return acc;
        }
        acc += `\n${el}: ${data[el]}`;
        return acc;
    }, '');
}



console.log(objToString(obj));

console.log(temporary)
