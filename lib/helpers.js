'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFunctionSignature = getFunctionSignature;
exports.getEventTopic = getEventTopic;

var _keccakjs = require('keccakjs');

var _keccakjs2 = _interopRequireDefault(_keccakjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFunctionSignature(signature) {
  return new _keccakjs2.default(256).update(signature).digest('hex').substr(0, 8);
}

function getEventTopic(signature) {
  return new _keccakjs2.default(256).update(signature).digest('hex');
}