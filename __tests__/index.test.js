import diff from '../index'

test('Simple test', () => {
    expect(diff('../files/file1.json', '../files/file2.json')).toEqual('{\n' +
        ' - follow: false\n' +
        '   host: hexlet.io\n' +
        ' - proxy: 123.234.53.22\n' +
        ' - timeout: 50\n' +
        ' + timeout: 20\n' +
        ' + verbose: true\n' +
        '}\n');
})