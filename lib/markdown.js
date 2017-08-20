'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var args = _ref.args,
      data = _ref.data;

  return new Promise(function (resolve, reject) {
    // write to dest stream
    var writeStream = void 0;
    try {
      writeStream = _fs2.default.createWriteStream(args.dest, { flags: 'w' });
    } catch (err) {
      reject(err);
    }
    writeStream.on('error', function (err) {
      reject(err);
    });
    writeStream.on('finish', function () {
      resolve();
    });
    // build the table of contents
    if (args.notoc) {
      data.forEach(function (contract) {
        // contract name
        writeStream.write('* [' + contract.name + '](#' + contract.name.toLowerCase() + ')\n');
        // methods (sub-bullets)
        contract.abiDocs.forEach(function (docItem) {
          if (typeof docItem.name !== 'undefined') {
            writeStream.write('  * [' + docItem.name + '](#' + docItem.type + '-' + docItem.name.toLowerCase() + ')\n');
          }
        });
      });
    }

    // create docs for each contract from template
    data.forEach(function (contract) {
      var md = (0, _template2.default)(contract);
      writeStream.write(md);
    });

    writeStream.end();
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }