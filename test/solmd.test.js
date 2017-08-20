/* eslint-env node, mocha */
const assert = require('assert');
const minimist = require('minimist');
const fs = require('fs');
const Solmd = require('../lib');
const expected = require('./expected');

describe('solmd', () => {
  it('GavCoin', () => {
    const args = minimist(['test/contracts/GavCoin.sol', '--dest', 'test/output.md']);
    return Solmd.default.build(args)
      .then(() => fs.readFileSync('./test/output.md', 'utf8'))
      .then((res) => {
        console.log(res);
        assert.equal(res, expected.GavCoin, 'did not produce the correct output');
      });
  });
});
