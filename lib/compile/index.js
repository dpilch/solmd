"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _parseAbi = _interopRequireDefault(require("./parse-abi"));

var _solc = _interopRequireDefault(require("./solc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function compile({
  contracts
}) {
  const data = [];
  Object.keys(contracts).forEach(contractName => {
    const contract = contracts[contractName];
    const {
      fileName
    } = contract;
    const {
      devdoc
    } = contract;
    const {
      author,
      title
    } = devdoc;
    data.push({
      author,
      title,
      fileName: fileName.replace(process.env.PWD, ''),
      name: contractName,
      abiDocs: (0, _parseAbi.default)(contract)
    });
  });
  return data;
}

function _default(opts) {
  opts._.forEach(file => {
    if (!_fs.default.existsSync(file)) {
      process.stderr.write(`${file}: No such file or directory
`);
      process.exit(1);
    }
  });

  return (0, _solc.default)(opts._).then(({
    contracts
  }) => compile(_objectSpread({}, opts, {
    contracts
  }))).catch(() => {
    console.error(`solmd: Failed to compile contracts at ${opts._}`); // eslint-disable-line no-console

    process.exit(1);
  });
}