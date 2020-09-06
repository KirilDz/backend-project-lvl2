import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export const parse = (filePath) => {
    if (path.extname(filePath) === '.json') {
        return JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));
    }

    if (path.extname(filePath) === '.yml') {
        console.log(yaml.load(fs.readFileSync(filePath)))
        return yaml.load(fs.readFileSync(filePath));
    }
}

