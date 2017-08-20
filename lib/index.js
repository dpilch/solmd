'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {
  build: _build2.default
};

function populateArguments(passed) {
  var modified = passed;
  modified._ = modified._.join(' ');

  var defaults = {
    dest: _constants.DEFAULT_DEST,
    'no-toc': _constants.DEFAULT_NO_TOC
  };

  return _extends({}, defaults, modified);
}

var wrappedMethods = {};
Object.keys(methods).forEach(function (key) {
  wrappedMethods[key] = function (args) {
    var newArgs = populateArguments(args);
    return methods[key](newArgs);
  };
});

exports.default = wrappedMethods;