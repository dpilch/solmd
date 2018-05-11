"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _build = _interopRequireDefault(require("./build"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const methods = {
  build: _build.default
};

function populateArguments(passed) {
  const defaults = {
    dest: _constants.DEFAULT_DEST,
    'no-toc': _constants.DEFAULT_NO_TOC
  };
  return _objectSpread({}, defaults, passed);
}

const wrappedMethods = {};
Object.keys(methods).forEach(key => {
  wrappedMethods[key] = args => {
    const newArgs = populateArguments(args);
    return methods[key](newArgs);
  };
});
var _default = wrappedMethods;
exports.default = _default;