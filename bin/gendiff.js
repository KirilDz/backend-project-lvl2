#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';
import dfs from '../src/compareFiles.js';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.\n')
  .option('-f, --format <type>', 'output format')
  .arguments('<file1>, <file2>')
  .action((file1, file2) => dfs(JSON.parse(fs.readFileSync(`${process.cwd()}/${file1}`)), JSON.parse(fs.readFileSync(`${process.cwd()}/${file2}`))));

commander.parse(process.argv);
