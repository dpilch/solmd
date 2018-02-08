'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (src) {
  return new Promise(function (resolve) {
    var exec = 'solc --allow-paths ./,../, --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc ' + src;
    var rawRes = _child_process2.default.execSync(exec);
    var res = JSON.parse(rawRes);
    resolve({
      contracts: Object.keys(res.contracts).reduce(function (o, k) {
        var contractName = k.split(':')[1];
        var contract = res.contracts[k];
        return _extends({}, o, _defineProperty({}, contractName, _extends({}, contract, {
          abi: JSON.parse(contract.abi),
          devdoc: JSON.parse(contract.devdoc),
          userdoc: JSON.parse(contract.userdoc)
        })));
      }, {})
    });
  });
};

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }