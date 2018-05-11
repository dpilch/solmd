#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _minimist = _interopRequireDefault(require("minimist"));

var Solmd = _interopRequireWildcard(require("../index"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const args = (0, _minimist.default)(process.argv.slice(2));

if (typeof args.help !== 'undefined' || args._.length === 0) {
  const {
    version
  } = JSON.parse(_fs.default.readFileSync(_path.default.join(__dirname, '../../package.json')).toString());
  process.stdout.write(`solmd v${version}

usage: solmd <solidity> [--dest] <target>

parameters:

--dest     Destination of markdown output
--no-toc   Do not generate table of contents, defaults false

  `);
  process.exit();
} else {
  Solmd.default.build(args).catch(err => {
    console.error(err); // eslint-disable-line no-console

    process.exit(1);
  });
}