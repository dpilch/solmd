'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (src) {
  return new Promise(function (resolve) {
    var exec = 'solc --allow-paths ./,../, --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc ' + src;
    var rawRes = _child_process2.default.execSync(exec);
    var res = JSON.parse(rawRes);
    resolve({
      contracts: Object.keys(res.contracts).reduce(function (o, k) {
        var _k$split = k.split(':'),
            _k$split2 = _slicedToArray(_k$split, 2),
            contractFile = _k$split2[0],
            contractName = _k$split2[1];

        if (_path2.default.resolve(contractFile) !== _path2.default.resolve(src)) {
          return o;
        }

        var contract = res.contracts[k];
        return _extends({}, o, _defineProperty({}, contractName, _extends({}, contract, {
          abi: JSON.parse(contract.abi),
          devdoc: JSON.parse(contract.devdoc),
          userdoc: JSON.parse(contract.userdoc)
        })));
      }, {})
    });
  });
};

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }