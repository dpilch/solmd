"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseAbi;

var _helpers = _interopRequireDefault(require("../helpers"));

var _parseOutputs = _interopRequireDefault(require("./parseOutputs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseAbi(contract) {
  return contract.abi.map(method => {
    const inputParams = method.inputs || [];
    const signature = method.name && `${method.name}(${inputParams.map(i => i.type).join(',')})`;
    const devDocs = (contract.devdoc.methods || {})[signature] || {};
    const userDocs = (contract.userdoc.methods || {})[signature] || {}; // map abi inputs to devdoc inputs

    const params = devDocs.params || {};
    const inputs = inputParams.map(param => _objectSpread({}, param, {
      description: params[param.name]
    }));
    const argumentList = inputParams.reduce((inputString, param) => `${inputString}${param.name}, `, '').slice(0, -2); // don't write this

    delete devDocs.params;
    const outputs = (0, _parseOutputs.default)({
      devDocs,
      method
    });
    return _objectSpread({}, method, devDocs, userDocs, {
      inputs,
      argumentList,
      outputs,
      signature,
      signatureHash: signature && (0, _helpers.default)(signature)
    });
  });
}