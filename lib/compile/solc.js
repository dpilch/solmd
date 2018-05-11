"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _solc = _interopRequireDefault(require("solc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function findImports(path) {
  const output = _fs.default.readFileSync(path.replace('file://', ''));

  return {
    contents: output.toString()
  };
}

function _default(src) {
  return new Promise(resolve => {
    const sources = {};
    sources[src] = {
      urls: [`file://${src}`]
    };

    const output = _solc.default.compileStandardWrapper(JSON.stringify({
      language: 'Solidity',
      sources,
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'asm', 'ast', 'bin', 'bin-runtime', 'clone-bin', 'interface', 'opcodes', 'srcmap', 'srcmap-runtime', 'devdoc', 'userdoc']
          }
        }
      }
    }), findImports);

    const res = JSON.parse(output);
    resolve({
      contracts: Object.keys(res.contracts).reduce((o, k) => {
        const file = k.split(':')[0];
        const fileFragments = file.split('/');
        const contractName = fileFragments[fileFragments.length - 1].split('.sol')[0];
        const contract = res.contracts[k][contractName];
        const fileName = `${process.env.PWD}/${k.split(':')[0]}`;
        return _objectSpread({}, o, {
          [contractName]: _objectSpread({}, contract, {
            fileName,
            abi: contract.abi,
            devdoc: contract.devdoc,
            userdoc: contract.userdoc
          })
        });
      }, {})
    });
  });
}