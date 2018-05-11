"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _compile = _interopRequireDefault(require("./compile"));

var _markdown = _interopRequireDefault(require("./markdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(args) {
  return (0, _compile.default)(args).then(data => (0, _markdown.default)({
    args,
    data
  }));
}