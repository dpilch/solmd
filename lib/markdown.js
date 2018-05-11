"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _template = _interopRequireDefault(require("./template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  args,
  data
}) {
  return new Promise((resolve, reject) => {
    // write to dest stream
    let writeStream;

    try {
      writeStream = _fs.default.createWriteStream(args.dest, {
        flags: 'w'
      });
    } catch (err) {
      reject(err);
    }

    writeStream.on('error', err => {
      reject(err);
    });
    writeStream.on('finish', () => {
      resolve();
    }); // build the table of contents

    if (!args.notoc) {
      data.forEach(contract => {
        // contract name
        writeStream.write(`* [${contract.name}](#${contract.name.toLowerCase()})\n`); // methods (sub-bullets)

        contract.abiDocs.forEach(docItem => {
          if (typeof docItem.name !== 'undefined') {
            writeStream.write(`  * [${docItem.name}](#${docItem.type}-${docItem.name.toLowerCase()})\n`);
          }
        });
      });
    } // create docs for each contract from template


    data.forEach(contract => {
      const md = (0, _template.default)(contract);
      writeStream.write(md);
    });
    writeStream.end();
  });
}