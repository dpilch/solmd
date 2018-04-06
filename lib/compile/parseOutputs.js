'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = parseOutputs;
function parseOutputs(_ref) {
  var devDocs = _ref.devDocs,
      method = _ref.method;

  var outputs = [];
  try {
    if (typeof devDocs.return !== 'undefined') {
      var outputParams = JSON.parse(devDocs.return);
      outputs = method.outputs.map(function (param) {
        return _extends({}, param, { description: outputParams[param.name] });
      });
    }
  } catch (e) {
    process.stderr.write('warning: invalid @return for ' + method.name + ' - output may be effected\n');
    outputs = method.outputs; // eslint-disable-line prefer-destructuring
  }

  return outputs;
}