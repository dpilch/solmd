"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseOutputs;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseOutputs({
  devDocs,
  method
}) {
  let outputs = [];

  try {
    if (typeof devDocs.return !== 'undefined') {
      const outputParams = JSON.parse(devDocs.return);
      outputs = method.outputs.map(param => _objectSpread({}, param, {
        description: outputParams[param.name]
      }));
    }
  } catch (e) {
    process.stderr.write(`warning: invalid @return for ${method.name} - output may be effected\n`);
    outputs = method.outputs; // eslint-disable-line prefer-destructuring
  }

  return outputs;
}