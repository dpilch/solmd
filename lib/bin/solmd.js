#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _index = require('../index');

var Solmd = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = (0, _minimist2.default)(process.argv.slice(2));

if (typeof args.help !== 'undefined') {
  var _JSON$parse = JSON.parse(_fs2.default.readFileSync(_path2.default.join(__dirname, '../../package.json')).toString()),
      version = _JSON$parse.version;

  process.stdout.write('solmd v' + version + '\n\nusage: solmd [--src <solidity>] [--dest <target>]\n\nparameters:\n\n--src      Folder that contains the contracts you want to compile\n--dest     Destination of markdown output\n--no-toc   Do not generate table of contents, defaults false\n\n  ');
  process.exit();
} else {
  Solmd.default.build(args).catch(function (err) {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
}