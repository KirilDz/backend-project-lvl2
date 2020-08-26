import fs from 'fs';

const file1Read = fs.readFileSync('./file1.json', 'utf-8');
const file2Read = fs.readFileSync('./file2.json', 'utf-8');

const file1 = JSON.parse(file1Read);
const file2 = JSON.parse(file2Read);

console.log(file1, file2)

const diff = (file1, file2) => {

    const resultArr = [];

    const sortedOneKeys = Object.keys(file1).sort();
    console.log(sortedOneKeys)
    const sortedTwoKeys = Object.keys(file2).sort();
    console.log(sortedTwoKeys)
    const concatArrays = [...sortedOneKeys, ...sortedTwoKeys];
    const uniq = [...new Set(concatArrays)];
    console.log(concatArrays)
    console.log(uniq)

    for (const uniqEl of uniq) {
        if (file1.hasOwnProperty(uniqEl) && file2.hasOwnProperty(uniqEl)) {
            file1[uniqEl] === file2[uniqEl]
                ? resultArr.push(` ${uniqEl}: ${file1[uniqEl]}\n`)
                : resultArr.push(`- ${uniqEl}: ${file1[uniqEl]}\n + ${uniqEl}: ${file2[uniqEl]}\n`)
        } else if (!file1.hasOwnProperty(uniqEl)) {
            resultArr.push(`+ ${uniqEl}: ${file2[uniqEl]}\n`);
        } else {
            resultArr.push(`- ${uniqEl}: ${file1[uniqEl]}\n`);
        }
    }
    console.log(resultArr.join(('')))

}

diff(file1, file2);



