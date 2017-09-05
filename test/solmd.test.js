/* eslint-env node, mocha */
const assert = require('assert');
const minimist = require('minimist');
const fs = require('fs');
const Solmd = require('../lib');
const expected = require('./expected');

describe('solmd', () => {
  it('GavCoin', () => {
    const args = minimist(['test/general/GavCoin.sol', '--dest', 'test/output.md']);
    return Solmd.default.build(args)
      .then(() => fs.readFileSync('./test/output.md', 'utf8'))
      .then((res) => {
        assert.equal(res, expected.general.GavCoin, 'did not produce the correct output');
      });
  });

  it('should have no ToC', () => {
    const args = minimist(['test/notoc/GavCoin.sol', '--dest', 'test/output.md', '--notoc']);
    return Solmd.default.build(args)
      .then(() => fs.readFileSync('./test/output.md', 'utf8'))
      .then((res) => {
        assert.equal(res, expected.notoc.GavCoin, 'did not produce the correct output');
      });
  });

  it('should have events', () => {
    const args = minimist(['test/events/GavCoin.sol', '--dest', 'test/output.md']);
    return Solmd.default.build(args)
      .then(() => fs.readFileSync('./test/output.md', 'utf8'))
      .then((res) => {
        assert.equal(res, expected.events.GavCoin, 'did not produce the correct output');
      });
  });
});
