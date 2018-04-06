'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (src) {
  return new Promise(function (resolve) {
    var sources = {};
    sources[src] = {
      urls: ['file://' + src]
    };
    var output = _solc2.default.compileStandardWrapper(JSON.stringify({
      language: 'Solidity',
      sources: sources,
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'asm', 'ast', 'bin', 'bin-runtime', 'clone-bin', 'interface', 'opcodes', 'srcmap', 'srcmap-runtime', 'devdoc', 'userdoc']
          }
        }
      }
    }), findImports);
    var res = JSON.parse(output);
    resolve({
      contracts: Object.keys(res.contracts).reduce(function (o, k) {
        var file = k.split(':')[0];
        var fileFragments = file.split('/');
        var contractName = fileFragments[fileFragments.length - 1].split('.sol')[0];
        var contract = res.contracts[k][contractName];
        var fileName = process.env.PWD + '/' + k.split(':')[0];
        return _extends({}, o, _defineProperty({}, contractName, _extends({}, contract, {
          fileName: fileName,
          abi: contract.abi,
          devdoc: contract.devdoc,
          userdoc: contract.userdoc
        })));
      }, {})
    });
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _solc = require('solc');

var _solc2 = _interopRequireDefault(_solc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function findImports(path) {
  var output = _fs2.default.readFileSync(path.replace('file://', ''));
  return { contents: output.toString() };
}