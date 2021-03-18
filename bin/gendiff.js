#!/usr/bin/env node
import commander from 'commander';
import getDiff from '../index.js';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.\n')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1>, <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(getDiff(filepath1, filepath2, options.format));
  });

commander.parse(process.argv);
