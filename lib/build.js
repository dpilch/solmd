'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (args) {
  return (0, _compile2.default)(args).then(function (data) {
    return (0, _markdown2.default)({ args: args, data: data });
  });
};

var _compile = require('./compile');

var _compile2 = _interopRequireDefault(_compile);

var _markdown = require('./markdown');

var _markdown2 = _interopRequireDefault(_markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }