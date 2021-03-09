#!/usr/bin/env node
import commander from 'commander';
import dfs from '../index.js';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.\n')
  .option('-f, --format <type>', 'output format')
  .arguments('<file1>, <file2>')
  .action(dfs);

commander.parse(process.argv);
