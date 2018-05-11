"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFunctionSignature;

var _keccakjs = _interopRequireDefault(require("keccakjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFunctionSignature(signature) {
  return new _keccakjs.default(256).update(signature).digest('hex').substr(0, 8);
}