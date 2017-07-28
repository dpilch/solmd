#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import * as Solmd from '../index';

const args = minimist(process.argv.slice(2));

// get json version

if (!args._[0]) {
  const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')).toString());
  process.stdout.write(`
solmd v${version}

Parameters:

--src      Folder that contains the contracts you want to compile
--dest     Destination of markdown output
  `);
  process.exit();
} else {
  Solmd.default[args._[0]](args);
}
