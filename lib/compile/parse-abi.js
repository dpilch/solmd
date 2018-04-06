'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = parseAbi;

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _parseOutputs = require('./parseOutputs');

var _parseOutputs2 = _interopRequireDefault(_parseOutputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseAbi(contract) {
  return contract.abi.map(function (method) {
    var inputParams = method.inputs || [];
    var signature = method.name && method.name + '(' + inputParams.map(function (i) {
      return i.type;
    }).join(',') + ')';
    var devDocs = (contract.devdoc.methods || {})[signature] || {};
    var userDocs = (contract.userdoc.methods || {})[signature] || {};
    // map abi inputs to devdoc inputs
    var params = devDocs.params || {};
    var inputs = inputParams.map(function (param) {
      return _extends({}, param, { description: params[param.name] });
    });
    var argumentList = inputParams.reduce(function (inputString, param) {
      return '' + inputString + param.name + ', ';
    }, '').slice(0, -2);
    // don't write this
    delete devDocs.params;

    var outputs = (0, _parseOutputs2.default)({ devDocs: devDocs, method: method });

    return _extends({}, method, devDocs, userDocs, {
      inputs: inputs,
      argumentList: argumentList,
      outputs: outputs,
      signature: signature,
      signatureHash: signature && (0, _helpers2.default)(signature)
    });
  });
}