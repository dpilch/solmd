#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import * as Solmd from '../index';

const args = minimist(process.argv.slice(2));

if (typeof args.help !== 'undefined') {
  const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')).toString());
  process.stdout.write(`solmd v${version}

usage: solmd [--src <solidity>] [--dest <target>]

parameters:

--src      Folder that contains the contracts you want to compile
--dest     Destination of markdown output

  `);
  process.exit();
} else {
  Solmd.default.build(args);
}
