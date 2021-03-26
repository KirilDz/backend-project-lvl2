import formatToPlain from './plain.js';
import formatToJson from './json.js';
import formatToStylish from './stylish.js';

const format = (data, name) => {
    switch (name) {
        case 'plain':
            return formatToPlain(data);
        case 'json':
            return formatToJson(data);
        default:
            return formatToStylish(data);
    }
};

export default format;
