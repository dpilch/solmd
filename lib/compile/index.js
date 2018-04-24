'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (opts) {
  opts._.forEach(function (file) {
    if (!_fs2.default.existsSync(file)) {
      process.stderr.write(file + ': No such file or directory\n');
      process.exit(1);
    }
  });
  return (0, _solc2.default)(opts._).then(function (_ref2) {
    var contracts = _ref2.contracts;
    return compile(_extends({}, opts, { contracts: contracts }));
  }).catch(function () {
    console.error('solmd: Failed to compile contracts at ' + opts._); // eslint-disable-line no-console
    process.exit(1);
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _parseAbi = require('./parse-abi');

var _parseAbi2 = _interopRequireDefault(_parseAbi);

var _solc = require('./solc');

var _solc2 = _interopRequireDefault(_solc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compile(_ref) {
  var contracts = _ref.contracts;

  var data = [];
  Object.keys(contracts).forEach(function (contractName) {
    var contract = contracts[contractName];
    var fileName = contract.fileName;
    var devdoc = contract.devdoc;
    var author = devdoc.author,
        title = devdoc.title;

    data.push({
      author: author,
      title: title,
      fileName: fileName.replace(process.env.PWD, ''),
      name: contractName,
      abiDocs: (0, _parseAbi2.default)(contract)
    });
  });

  return data;
}