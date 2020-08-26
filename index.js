import path from 'path';
import fs from "fs";


export default (filepath1, filepath2) => {

    const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf-8'));
    const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2), 'utf-8'));

    const concatedKeys = [...Object.keys(file1).sort(), ...Object.keys(file2).sort()];

    const uniqKeys = [...new Set(concatedKeys)];

    const diff = uniqKeys.map(el => {
        if (file1.hasOwnProperty(el) && file2.hasOwnProperty(el)) {
            return  file1[el] === file2[el]
                ? `   ${el}: ${file1[el]}\n`
                : ` - ${el}: ${file1[el]}\n + ${el}: ${file2[el]}\n`
        } else if (!file1.hasOwnProperty(el)) {
            return ` + ${el}: ${file2[el]}\n`
        } else {
            return ` - ${el}: ${file1[el]}\n`
        }
    })

    console.log(`{\n${diff.join((''))}}`)

}