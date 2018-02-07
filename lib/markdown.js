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
    if (!args.notoc) {
      data.forEach(function (contract) {
        writeStream.write((0, _template.tableOfContents)(contract));
      });
      writeStream.write('\n');
    }

    // create docs for each contract from template
    data.forEach(function (contract) {
      var md = (0, _template.template)(contract);
      writeStream.write(md);
    });

    writeStream.end();
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _template = require('./template');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }