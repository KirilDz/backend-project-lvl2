#!/usr/bin/env node
import commander from 'commander';
import diff from '../index.js';

const {Command} = commander;

const program = new Command();

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action(diff);


program.parse(process.argv);

// console.log(program.args);
